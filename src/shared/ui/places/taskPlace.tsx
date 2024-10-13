import { TaskInfo } from "../../../entities/task.tsx";
import { useUserStore } from "../../../features/store/userStore.ts";
import { navTypeMap, TaskComplete, TaskType } from "../../../entities/dto/task.ts";

export function TaskPlace({ taskInfo, doneTimes }: { taskInfo: TaskInfo; doneTimes: number }) {
    const { apiCheckTask, apiGetInventory } = useUserStore();
    const { task, progress } = taskInfo;
    const taskDone = (doneTimes >= progress.need_done_times && progress.need_done_times > 0) || task.Status !== TaskComplete.NULL;
    const taskClaimed = task.Status === TaskComplete.FINISHED;
    const taskIcon = task.Icon || task.Reward.icon;
    const isIcon = Boolean(task.Icon);
    const navIcon = taskDone ? "/svgs/check_icon.svg" : navTypeMap[task.Type as TaskType] || "";

    const checkTask = async () => {
        const claim = !taskClaimed && taskDone;

        if (task.Type === 'SUBSCRIBE' && !claim) {
            const link = task.Data?.link || "https://google.com";
            if (link) {
                // @ts-ignore
                window.open(link, '_blank');
                const handleVisibilityChange = async () => {
                    if (document.visibilityState === 'visible') {
                        await apiCheckTask({ taskId: task.ID, claim });
                        document.removeEventListener('visibilitychange', handleVisibilityChange);
                    }
                };
                document.addEventListener('visibilitychange', handleVisibilityChange);
            }
        }

        if (claim || (!taskClaimed && !taskDone)) {
            await apiCheckTask({ taskId: task.ID, claim });
            if (claim) await apiGetInventory();
        }
    };

    return (
        <div onClick={checkTask} className="w-full border-t border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px] mb-1">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="relative p-2">
                        <div className="w-[6vh] aspect-square rounded-[10px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: task.Reward?.place_color, border: `0.753px solid ${task.Reward.border}` }}>
                            <img src={taskIcon} className="object-contain w-full h-full" style={{ height: isIcon ? "100%" : "70%" }} alt={task.Name} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <p className="font-NeueHaas font-semibold text-black">{task.Name}</p>
                            {progress.need_done_times > 0 && (
                                <p className="font-NeueHaas font-semibold ml-2 text-textGray">({doneTimes} / {progress.need_done_times})</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <img src={task.Reward.preview_icon} className="w-4 h-4 mr-1" alt="Reward Icon" />
                            <p className="font-NeueHaas text-black text-xs">+{task.RewardAmount}</p>
                        </div>
                    </div>
                </div>
                <div className="pr-5">
                    <div className="h-6 aspect-square rounded-[6px] flex items-center justify-center" style={{ backgroundColor: taskDone ? "#00B54A" : "#DCE1DE" }}>
                        {(!taskClaimed && taskDone) ? (
                            <p className="font-NeueHaas font-semibold ml-1.5 mr-1.5 text-white text-center">Claim</p>
                        ) : (
                            <img src={navIcon} className="h-[80%]" alt="Navigation arrow" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
