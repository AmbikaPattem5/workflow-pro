//import {projects} from "../../services/projects";
import type { Project } from "../../types/project";

type ProjectCardProps={
    project: Project;
    onDelete :(id:number)=>void,
    onEdit:(id:number,name:string)=>void
}
function ProjectCard({project, onDelete, onEdit}: ProjectCardProps){
    return(
        <div className="project-card">
            <h3>{project.name}</h3>
            <p>Status: {project.status}</p>
            <button onClick={()=>onDelete(project.id)}>Delete</button>
            <button onClick={()=>onEdit(project.id, project.name)}>Edit</button>
        </div>
    )
}

export default ProjectCard;