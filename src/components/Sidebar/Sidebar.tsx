import { NavLink } from "react-router-dom";
function Sidebar() {
    return(
        <aside>
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