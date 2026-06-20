//import {projects} from "../../services/projects";
import type { Project } from "../../types/project";

type ProjectCardProps={
    project: Project;
}
function ProjectCard({project}: ProjectCardProps){
    return(
        <div className="project-card">
            <h3>{project.name}</h3>
            <p>Status: {project.status}</p>
        </div>
    )
}

export default ProjectCard;