//import {projects} from "../../services/projects";
import type { Project } from "../../types/project";

type ProjectCardProps={
    project: Project;
    onDelete :(id:number)=>void,
}
function ProjectCard({project, onDelete}: ProjectCardProps){
    return(
        <div className="project-card">
            <h3>{project.name}</h3>
            <p>Status: {project.status}</p>
            <button onClick={()=>onDelete(project.id)}>Delete</button>
        </div>
    )
}

export default ProjectCard;