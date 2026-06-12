import StatCard from "../../components/StatCard/StatCard";
function Dashboard(){
    return (
        <div>
            <h1>Dashboard</h1>
            <StatCard title="Total Projects" value={12}/>
            <StatCard title="Completed Tasks" value={84}/>
            <StatCard title="Pending Tasks" value={16}/>
        </div>
    );
}
export default Dashboard;