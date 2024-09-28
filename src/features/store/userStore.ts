import {create} from "zustand";
import {
    APICheckTask,
    APIGetFields,
    APIGetInventory,
    APIGetReferrals,
    APIGetTasks,
    APIGetUpgrades,
    APILogin
} from "../api";
import {User, UserField, UserReferral, UserUpgrades} from "../../entities/dto/user.ts";
import {testQuery} from "../tests/testQuery.ts";
import axios from "axios";
import {InventoryInfo} from "../../entities/plant.tsx";
import {plants} from "../../entities/plants.tsx";
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import {InventoryItem} from "../../entities/dto/inventory.ts";
import {TaskInfo} from "../../entities/task.tsx";
import {TaskResponse} from "../../entities/dto/task.ts";

export type StoreSet =
    (partial:
         UserStore |
         Partial<UserStore> |
         ((state: UserStore) => UserStore |
             Partial<UserStore>),
     replace?:
         boolean | undefined) => void

export type UserStore = {
    user: User | null,
    userFields: Array<UserField> | null,
    userUpgrades: UserUpgrades | null,
    userReferrals: Array<UserReferral> | null,
    userInventory: Array<InventoryInfo> | null,
    tasks: Array<TaskInfo> | null,
    apiLogin: () => Promise<void>,
    apiGetInventory: () => Promise<void>,
    apiGetUpgrades: () => Promise<void>,
    apiGetFields: () => Promise<void>,
    apiGetReferrals: () => Promise<void>,
    apiGetTasks: () => Promise<void>,
    apiCheckTask: ({taskId, claim}: { taskId: string, claim: boolean }) => Promise<void>
}

function getInitData() {
    if (import.meta.env.DEV) {
        return testQuery;
    } else {
        const {initDataRaw} = retrieveLaunchParams();
        if (initDataRaw === null || initDataRaw === undefined) {
            return "";
        }
        return initDataRaw;
    }
}


export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    userUpgrades: null,
    userReferrals: null,
    userFields: null,
    userInventory: null,
    tasks: null,
    apiLogin: async () => {
        try {
            const initData = getInitData()
            const {user, token} = await APILogin(initData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            set(state => ({...state, user, token}));
        } catch (error) {
            console.error('Login failed:', error);
        }
    },
    apiGetInventory: async () => {
        try {
            const inventoryResponse = await APIGetInventory();
            const userInventory = inventoryResponse.items.map((item: InventoryItem) => ({
                plant: plants[item.Plant],
                quantity: item.Quantity,
            }));
            set(state => ({...state, userInventory: userInventory}));
        } catch (error) {
            console.error('Login failed:', error);
        }
    },
    apiGetUpgrades: async () => {
        try {
            const userUpgrades = await APIGetUpgrades();
            set(state => ({...state, userUpgrades}));
        } catch (error) {
            console.error('Login failed:', error);
        }
    },
    apiGetFields: async () => {
        try {
            const userFields = await APIGetFields();
            set(state => ({...state, userFields}));
        } catch (error) {
            console.error('Login failed:', error);
        }
    },
    apiGetReferrals: async () => {
        try {
            const userReferrals = await APIGetReferrals();
            set(state => ({...state, userReferrals}));
        } catch (error) {
            console.error('Login failed:', error);
        }
    },
    apiGetTasks: async () => {
        try {
            const tasksResponse = await APIGetTasks();
            const tasks = tasksResponse.map((item: TaskResponse) => (
                {
                    task: {
                        ID: item.ID,
                        Name: item.Name,
                        Icon: item.Icon,
                        Reward: plants[item.Reward],
                        RewardAmount: item.RewardAmount,
                        Type: item.Type,
                        Data: item.Data,
                        Status: item.Status
                    },
                    progress: {
                        done_times: 0,
                        need_done_times: item.NeedDoneTimes
                    }
                }
            ));
            set(state => ({...state, tasks}));
        } catch (error) {
            console.error('Login failed:', error);
        }
    },
    apiCheckTask: async ({taskId, claim}: { taskId: string, claim: boolean }) => {
        try {
            const task = await APICheckTask({taskId, claim});
            const taskModel = {
                task: {
                    ID: task.ID,
                    Name: task.Name,
                    Icon: task.Icon,
                    Reward: plants[task.Reward],
                    RewardAmount: task.RewardAmount,
                    Type: task.Type,
                    Data: task.Data,
                    Status: task.Status
                },
                progress: {
                    done_times: 0,
                    need_done_times: task.NeedDoneTimes
                }
            }
            set(state => ({
                ...state,
                tasks: state.tasks.map(t =>
                    t.task.ID === taskId ? {...t, ...taskModel} : t
                )

            }));
        } catch (error) {
            console.error('Task check failed:', error);
        }
    },
}));