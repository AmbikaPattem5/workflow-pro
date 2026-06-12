import { NavLink } from "react-router-dom";
import '../../styles/sidebar.css'
function Sidebar() {
    return(
        <aside className="sidebar">
            <h2>WorkFlow Pro</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;