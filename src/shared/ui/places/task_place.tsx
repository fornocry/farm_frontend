import {TaskInfo} from "../../../entities/task.tsx";
import {useUserStore} from "../../../features/store/userStore.ts";
import {initHapticFeedback} from "@telegram-apps/sdk-react";
import {navTypeMap, TaskComplete, TaskType} from "../../../entities/dto/task.ts";


export function TaskPlace({taskInfo, doneTimes}: { taskInfo: TaskInfo, doneTimes: number }) {

    const {
        apiCheckTask,
        apiGetInventory
    } = useUserStore();

    const taskDone = (doneTimes >= taskInfo.progress.need_done_times && taskInfo.progress.need_done_times > 0) || taskInfo.task.Status !== TaskComplete.NULL;
    const taskClaimed = taskInfo.task.Status === TaskComplete.FINISHED;
    const taskIcon = taskInfo.task.Icon || taskInfo.task.Reward.icon;
    const isIcon = Boolean(taskInfo.task.Icon);
    const navDependsOnType = taskDone
        ? "/svgs/check_icon.svg"
        : navTypeMap[taskInfo.task.Type as TaskType] || "";


    const checkTask = async () => {
        const claim = !taskClaimed && taskDone;

        if (taskInfo.task.Type === 'SUBSCRIBE' && !claim) {
            const link = taskInfo.task.Data?.link || "https://google.com"; // Use your parsing function

            if (link) {
                window.open(link, '_blank');

                const handleVisibilityChange = async () => {
                    if (document.visibilityState === 'visible') {
                        await apiCheckTask({taskId: taskInfo.task.ID, claim});
                        document.removeEventListener('visibilitychange', handleVisibilityChange);
                    }
                };

                document.addEventListener('visibilitychange', handleVisibilityChange);
            }
        }

        if (claim || (!taskClaimed && !taskDone)) {
            await apiCheckTask({taskId: taskInfo.task.ID, claim});
            if (claim) {
                await apiGetInventory();
            }
        }
    };


    return (
        <div onClick={() => {
            checkTask()
        }}
             className="w-full border-t border-b border-l border-[#6EA0AF] border-[0.75px] bg-white z-20 rounded-[10px] mb-1">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center">
                    <div className="relative p-2">
                        <div
                            className="w-[6vh] aspect-square rounded-[10px] flex items-center justify-center overflow-hidden"
                            style={{
                                backgroundColor: taskInfo?.task.Reward?.place_color,
                                border: `0.753px solid ${taskInfo?.task.Reward.border}`
                            }}
                        >
                            <img
                                src={taskIcon}
                                className="object-contain w-full h-full"
                                style={{height: isIcon ? "100%" : "70%"}}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <p className="font-NeueHaas font-semibold text-black">
                                {taskInfo?.task.Name}
                            </p>
                            <p className="font-NeueHaas font-semibold ml-2 text-textGray">
                                {taskInfo.progress.need_done_times > 0 ? `(${doneTimes} / ${taskInfo.progress.need_done_times})` : <></>}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <img
                                src={taskInfo.task.Reward.preview_icon}
                                className="w-4 h-4 mr-1"
                                alt="Reward Icon"
                            />
                            <p className="font-NeueHaas text-black text-xs">+{taskInfo.task.RewardAmount}</p>
                        </div>
                    </div>

                </div>
                <div className="pr-5">
                    <div className="h-6 aspect-square rounded-[6px] flex items-center justify-center"
                         style={{backgroundColor: taskDone ? "#00B54A" : "#DCE1DE"}}>
                        {(!taskClaimed && taskDone) ?
                            <p className="font-NeueHaas font-semibold ml-1.5 mr-1.5 text-white text-center">Claim</p> :
                            <img
                                src={navDependsOnType}
                                className="h-[80%]"
                                alt="Navigation arrow"
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}
