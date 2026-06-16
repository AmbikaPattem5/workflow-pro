import StatCard from "../../components/StatCard/StatCard";
import './dashboard.css';
function Dashboard(){
    return (
        
        <div>
            <h1>Dashboard</h1>
            <div className="stats-container">
                <StatCard title="Total Projects" value={12}/>
                <StatCard title="Completed Tasks" value={84}/>
                <StatCard title="Pending Tasks" value={16}/>
            </div>
        </div>
    );
}
export default Dashboard;