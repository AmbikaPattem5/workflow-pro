import {projects} from "../../services/projects.ts";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import './Projects.css'

function Projects(){
    console.log(projects);
    return (
        <div>
            <h1>Projects</h1>
            <div className="projects-container">
                {
                    projects.map(project=>
                        <ProjectCard key={project.id} project={project}/>
                    )
                }
            </div>
        </div>
    )
}   

export default Projects;