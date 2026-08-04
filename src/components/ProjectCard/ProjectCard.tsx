//import {projects} from "../../services/projects";
import type { Project, ProjectStatus } from "../../types/project";
import {memo} from "react";
type ProjectCardProps={
    project: Project;
    onDelete :(id:number)=>void,
    onEdit:(id:number,name:string)=>void,
    onStatus:(id:number,status:ProjectStatus)=>void
}
function ProjectCard({project, onDelete, onEdit,onStatus}: ProjectCardProps){
    console.log("ProjectCard Rendered:", project.name);
    return(
        <div className="project-card">
            <h3>{project.name}</h3>
            <p>Status: {project.status}</p>
            <button onClick={()=>onDelete(project.id)}>Delete</button>
            <button onClick={()=>onEdit(project.id, project.name)}>Edit</button>
            <button onClick={()=>onStatus(project.id,project.status)}>{project.status=="Completed"?"Mark as Pending":"Mark as Completed"}</button>
        </div>
    )
}

export default memo(ProjectCard);