import { use, useState } from "react";
import StatCard from "../../components/StatCard/StatCard";
import {projects as initialProjects} from "../../services/projects";
import type {Project, ProjectStatus} from "../../types/project";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import './dashboard.css';
function Dashboard(){
     const [projectName, setProjectName] = useState("");
     const [projects,setProjects]=useState<Project[]>(initialProjects);
     const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
     const [searchName, setSearchName] = useState("");
     const [statusFilter,setStatusFilter]=useState("All")
     const [sortOption,setSortOption]=useState("A-Z")
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
     const handleStatusProject=(id:number, status: ProjectStatus)=>{
        const updatedStatusProject=projects.map(project=>
            {
                if(project.id===id){
                    return{...project,status:status==="Completed"?"Pending":"Completed"}
                }
                else{
                    return project;
                }
                
        })
        setProjects(updatedStatusProject);
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
        const filteredProjects=projects.filter(project=>project.name.toLowerCase().includes(searchName.toLowerCase()));
        const statusFilteredProjects= 
        statusFilter==="All"?filteredProjects :
        filteredProjects.filter(project=>project.status===statusFilter);
        console.log(filteredProjects);
        console.log("status"+statusFilteredProjects);
        const sortedProjects=[...statusFilteredProjects];
        sortedProjects.sort((a,b)=>{
            if(sortOption==='A-Z'){
            return a.name.localeCompare(b.name);
            }
            else if(sortOption==='Z-A')
            {
                return b.name.localeCompare(a.name);
            }
            else if(sortOption==='Newest')
            {
                return b.id-a.id;
            }
            else if(sortOption==='Oldest')
            {
                return a.id-b.id;
            }
            else {
                return 0;
            }
        });
    return (
        
        <div>
            <h1>Dashboard</h1>
            <input type="text" placeholder="Search Project" value={searchName} onChange={(e)=>setSearchName(e.target.value)}/>
            <select name="status" value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
            <select name="sort" value={sortOption} onChange={(e)=>setSortOption(e.target.value)}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
            </select>
            <input type="text" placeholder="Project Name" value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
            <button onClick={handleAddProject}>{editingProjectId===null?"Add Project":"Save Changes"}</button>
            <div className="stats-container">
                <StatCard title="Total Projects" value={totalProjects}/>
                <StatCard title="Completed Tasks" value={completedTasks}/>
                <StatCard title="Pending Tasks" value={pendingTasks}/>
                
            </div>
            <div className="projects-container">
                {statusFilteredProjects.length!==0?
                sortedProjects.map(project=>(
                    <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} onEdit={handleEditProject} onStatus={handleStatusProject}/>
                ))
                : <h1>No Matching Projects Found</h1>
                }
            </div>
        </div>
    );
}
export default Dashboard;