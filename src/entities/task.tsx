import {Plant} from "./plant.tsx";
import {TaskComplete, TaskType} from "./dto/task.ts";

export interface Task {
    ID: string;
    Name: string;
    Icon: string | null;
    Reward: Plant;
    RewardAmount: number;
    Type: TaskType;
    Status: TaskComplete;
    Data: string | null;
}

export interface TaskProgress {
    done_times: number;
    need_done_times: number;
}

export interface TaskInfo {
    task: Task;
    progress: TaskProgress;
}
