import { tasksData } from "./tasks.interface";
export interface apiResponse {
    requestURL: string;
    evUniqueID: string;
    requestTS: string;
    elapsedTimeInMS: number;
    apiServer: string;
    apiBuildVersion: string;
    errCode: Number;
    errMsg: string;
    errName: string;
    timestamp: string;
    tasks: Array<tasksData>;
}