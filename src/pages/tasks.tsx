import NavBar from "../shared/ui/navbar.tsx";
import {TopBarTasks} from "../shared/ui/topbars.tsx";
import {TaskPlace} from "../shared/ui/places/task_place.tsx";
import {useUserStore} from "../features/store/userStore.ts";
import {useEffect, useMemo} from "react";
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
        if (user === null) {
            apiLogin();
        }
    }, []);

    useEffect(() => {
        if (userInventory === null && user !== null) {
            apiGetInventory();
        }
    }, [user, apiGetInventory]);


    useEffect(() => {
        if (userReferrals === null && user !== null) {
            apiGetReferrals();
        }
    }, [user, apiGetReferrals]);

    useEffect(() => {
        if (tasks === null && user !== null) {
            apiGetTasks();
        }
    }, [user, apiGetTasks]);

    const isLoading = useMemo(() => {
        return user === null || userReferrals === null;
    }, [user, userReferrals, userReferrals]);


    if (isLoading) {
        return <Loading/>
    }

    const countDoneTimes = ({task}: { task: Task }): number => {
        switch (task.Type) {
            case "FRIENDS":
                return userReferrals?.length || 0;
            case "INVENTORY":
                const needItem = userInventory?.find(item => item.plant.key === task.Data.item);
                return needItem?.quantity || 0;
            case "SUBSCRIBE":
                return 0;
        }
        return 1
    }

    return (
        <>
            <TopBarTasks total={tasks?.length || 0}/>
            <div className="relative h-20 z-30"/>
            <div
                className="relative w-full flex flex-col items-center h-[100vh] sm:h-fit">
                {/*<div className="absolute h-4 w-[100%] z-30 backdrop-blur-sm"/>*/}
                <div className="w-[90%] flex-1 overflow-y-auto">
                    <div className="relative h-4 w-full"/>
                    {tasks?.map((item) => <TaskPlace key={item.task.ID} taskInfo={item}
                                                     doneTimes={countDoneTimes({task: item.task})}/>)}
                </div>
                <div className="relative h-44 -z-20"/>
            </div>
            <NavBar/>
        </>
    )
}