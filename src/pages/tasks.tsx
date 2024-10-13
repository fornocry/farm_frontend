import {useEffect, useMemo} from "react";
import NavBar from "../shared/ui/navbar.tsx";
import {TopBarTasks} from "../shared/ui/topbars.tsx";
import {TaskPlace} from "../shared/ui/places/taskPlace.tsx";
import {useUserStore} from "../features/store/userStore.ts";
import {Loading} from "./loading.tsx";
import {Task} from "../entities/task.tsx";

export default function TasksPage() {
    const {
        user,
        userInventory,
        userReferrals,
        tasks,
        apiLogin,
        apiGetInventory,
        apiGetReferrals,
        apiGetTasks
    } = useUserStore();

    useEffect(() => {
        if (!user) {
            apiLogin();
        }
    }, [user, apiLogin]);

    useEffect(() => {
        if (user && !userInventory) {
            apiGetInventory();
        }
    }, [user, userInventory, apiGetInventory]);

    useEffect(() => {
        if (user && !userReferrals) {
            apiGetReferrals();
        }
    }, [user, userReferrals, apiGetReferrals]);

    useEffect(() => {
        if (user && !tasks) {
            apiGetTasks();
        }
    }, [user, tasks, apiGetTasks]);

    const isLoading = useMemo(() => !user, [user]);

    if (isLoading) {
        return <Loading/>;
    }

    const countDoneTimes = (task: Task): number => {
        switch (task.Type) {
            case "FRIENDS":
                return userReferrals?.length || 0;
            case "INVENTORY":
                const itemKey = task.Data;
                // @ts-ignore
                return itemKey ? userInventory?.find(item => item.plant.key === itemKey.item)?.quantity || 0 : 0;
            case "SUBSCRIBE":
                return 0;
            default:
                return 1;
        }
    };

    return (
        <>
            <TopBarTasks total={tasks?.length || 0}/>
            <div className="relative h-20 z-30"/>
            <div className="relative w-full flex flex-col items-center h-[100vh] sm:h-fit">
                <div className="w-[90%] flex-1 overflow-y-auto">
                    <div className="relative h-4 w-full"/>
                    {tasks?.map((item) => (
                        <TaskPlace
                            key={item.task.ID}
                            taskInfo={item}
                            doneTimes={countDoneTimes(item.task)}
                        />
                    ))}
                </div>
                <div className="relative h-44 -z-20"/>
            </div>
            <NavBar/>
        </>
    );
}
