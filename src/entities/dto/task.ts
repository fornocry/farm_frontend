import {PlantKey} from "../plants.tsx";

export interface TaskResponse {
    ID: string;
    Name: string;
    Icon: string;
    Reward: PlantKey;
    RewardAmount: number;
    NeedDoneTimes: number;
    Type: TaskType;
    Status: TaskComplete;
    Data: string | null;
}

export enum TaskComplete {
    NULL = 'TASK_COMPLETE_NULL', // Use a string representation for NULL
    DONE = 'TASK_COMPLETE_DONE',
    FINISHED = 'TASK_COMPLETE_FINISHED'
}

export enum TaskType {
    FRIENDS = 'FRIENDS', // Use a string representation for NULL
    SUBSCRIBE = 'SUBSCRIBE',
    INVENTORY = 'INVENTORY'
}

export const navTypeMap = {
    [TaskType.FRIENDS]: "/svgs/check_icon.svg",
    [TaskType.SUBSCRIBE]: "/svgs/navarrow.svg",
    [TaskType.INVENTORY]: "/svgs/check_icon.svg"
};

export enum TaskType {

}