import axios from 'axios';
import {User, UserField, UserReferral, UserUpgrades} from "../../entities/dto/user.ts";
import {InventoryResponse} from "../../entities/dto/inventory.ts";
import {TaskResponse} from "../../entities/dto/task.ts";


export async function APILogin(telegramQuery: string): Promise<{ user: User; token: string }> {
    const params = {
        method: "telegram",
        data: telegramQuery,
    }
    const response = await axios.get('/api/v1/user/auth', {
        params: params,
    });
    const data = response.data;
    return {user: data.user, token: data.token};
}

export async function APIGetInventory(): Promise<InventoryResponse> {
    const response = await axios.get('/api/v1/inventory/all');
    return response.data;
}

export async function APIGetTasks(): Promise<Array<TaskResponse>> {
    const response = await axios.get('/api/v1/tasks/all');
    return response.data;
}

export async function APIGetUpgrades(): Promise<UserUpgrades> {
    const response = await axios.get('/api/v1/user/upgrade');
    return response.data;
}

export async function APIGetFields(): Promise<Array<UserField>> {
    const response = await axios.get('/api/v1/user/fields');
    return response.data;
}

export async function APIGetReferrals(): Promise<Array<UserReferral>> {
    const response = await axios.get('/api/v1/user/referrals');
    return response.data;
}

export async function APICheckTask({taskId, claim}: { taskId: string, claim: boolean }): Promise<TaskResponse> {
    const link = claim ? "/api/v1/tasks/claim" : "/api/v1/tasks/check"
    const params = {
        taskId: taskId,
    }
    const response = await axios.get(link, {
        params: params
    });
    return response.data;
}