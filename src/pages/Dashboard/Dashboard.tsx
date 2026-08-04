import { useState,useMemo, useCallback} from "react";
import StatCard from "../../components/StatCard/StatCard";
import {projects as initialProjects} from "../../services/projects";
import type {Project, ProjectStatus} from "../../types/project";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import useLocalStorage from "../../hooks/useLocalStorage";
import './dashboard.css';
function Dashboard(){
     const [projectName, setProjectName] = useState("");
     const [projects,setProjects]=useLocalStorage("projects",initialProjects)
     const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
     const [searchName, setSearchName] = useState("");
     const [statusFilter,setStatusFilter]=useState("All")
     const [sortOption,setSortOption]=useState("A-Z");
     const [error,setError]=useState("");
      
      const handleSubmit=(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddProject();
      };
     const handleAddProject=()=>{
        // if(!projectName.trim()){
        //     return;
        // }
        if(projectName.trim()===""){
            setError("Project name is required");
            return;
        }
        console.log(projectName)
        const normalizedProjectName=projectName.trim().toLowerCase();
        const isDuplicate=projects.some(project=>project.name.trim().toLowerCase()===normalizedProjectName&&project.id!==editingProjectId);
        if(isDuplicate){
            setError("Project name already exists");
            return;
        }
            if(editingProjectId===null){
            const newProject: Project={
            id: Date.now(),
            name: projectName,
            status:"Pending"
        }     
        
        setProjects([...projects,newProject]);
        setProjectName("");
        setError("");
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
            setError("");
        }
     console.log(projects);
     }
     const handleDeleteProject=useCallback((id:number)=>{
        const updatedProjects=projects.filter(project=>project.id!==id);
        setProjects(updatedProjects)
     }, [projects]);
     const handleStatusProject=useCallback((id:number, status: ProjectStatus)=>{
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
     }, [projects]);
     const handleEditProject=useCallback((id:number,name:string)=>{
        {
            setEditingProjectId(id);
            setProjectName(name);
        }
        
        }, []);
        const handleProjectNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
            const value=e.target.value;
            setProjectName(value);
            if(value.trim()!==""){
                setError("");
            }
        }
        const totalProjects=projects.length;
        const pendingTasks=useMemo(()=>{
            return projects.filter(project=>project.status==="Pending").length;
        }, [projects]);
        const completedTasks=useMemo(()=>{
            return projects.filter(project=>project.status==="Completed").length;
        }, [projects]);
            
        const filteredProjects=useMemo(()=>{
            return projects.filter(project=>project.name.toLowerCase().includes(searchName.toLowerCase()));
        }, [projects, searchName]);
            
        const statusFilteredProjects= useMemo(()=>{
            if(statusFilter==="All"){
                return filteredProjects;
            }
            return filteredProjects.filter(project=>project.status===statusFilter);
        }, [filteredProjects, statusFilter]);
        
        console.log(filteredProjects);
        console.log("status"+statusFilteredProjects);
        const sortedProjects=useMemo(()=>{
            const sorted=[...statusFilteredProjects];
            sorted.sort((a,b)=>{
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
       return sorted;
        }, [statusFilteredProjects, sortOption]);
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
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Project Name" value={projectName} onChange={handleProjectNameChange}/>
            <button type="submit">{editingProjectId===null?"Add Project":"Save Changes"}</button>
            </form>
            {error && <p className="error">{error}</p>}
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