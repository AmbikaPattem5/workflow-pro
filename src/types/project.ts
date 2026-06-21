export type ProjectStatus = "Pending" | "InProgress" | "Completed";
export type Project={
    id:number;
    name:string;
    status: ProjectStatus;
}

