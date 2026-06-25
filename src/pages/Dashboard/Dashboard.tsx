import { useState } from "react";
import StatCard from "../../components/StatCard/StatCard";
import {projects as initialProjects} from "../../services/projects";
import type {Project} from "../../types/project";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import './dashboard.css';
function Dashboard(){
     const [projectName, setProjectName] = useState("");
     const [projects,setProjects]=useState<Project[]>(initialProjects);
     const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
     
     const handleAddProject=()=>{
        if(!projectName.trim()){
            return;
        }
        console.log(projectName)
        if(editingProjectId===null){
        const newProject: Project={
        id: Date.now(),
        name: projectName,
        status:"Pending"
        }     
        setProjects([...projects,newProject]);
        setProjectName("");
        }
        else{
            const updatedProjects=projects.map(project=>{
                if(project.id===editingProjectId){
                    return {...project, name: projectName};
                }
                else{
                    return project;
                }
            })
            setProjects(updatedProjects);
            setEditingProjectId(null);  
            setProjectName("");
        }
     console.log(projects);
     }
     const handleDeleteProject=(id:number)=>{
        const updatedProjects=projects.filter(project=>project.id!==id);
        setProjects(updatedProjects)
     }
     const handleEditProject=(id:number,name:string)=>{
        {
            setEditingProjectId(id);
            setProjectName(name);
        }
        
        }
        const totalProjects=projects.length;
        const pendingTasks=projects.filter(project=>project.status==="Pending").length;
        const completedTasks=projects.filter(project=>project.status==="Completed").length;
    return (
        
        <div>
            <h1>Dashboard</h1>
            <input type="text" placeholder="Project Name" value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
            <button onClick={handleAddProject}>{editingProjectId===null?"Add Project":"Save Changes"}</button>
            <div className="stats-container">
                <StatCard title="Total Projects" value={totalProjects}/>
                <StatCard title="Completed Tasks" value={completedTasks}/>
                <StatCard title="Pending Tasks" value={pendingTasks}/>
                
            </div>
            <div className="projects-container">
                {totalProjects>0?
                projects.map(project=>(
                    <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} onEdit={handleEditProject}/>
                ))
                : <h1>No Projects Found</h1>
                }
            </div>
        </div>
    );
}
export default Dashboard;