import '../../styles/header.css'
import useAuth from '../../hooks/useAuth';
function Header(){
    const today=new Date().toLocaleDateString();
    const {user,login,logout}=useAuth()
    const handleLogin=()=>{
        login(
            {
                id:1,
                name: "Ambika",
                email: "ambika@gmail.com",
            }
        );
    }
    const handleLogout=()=>{
        logout();
    }
    return(
        <header className="header">
            <h3>
                {user ? `Welcome, ${user.name}` : "Welcome, Guest"}
            </h3>
            <p>{today}</p>
            {user ? 
             <button onClick={handleLogout}>Logout</button> : 
             <button onClick={handleLogin}>Login</button> 
             }
           
        </header>
    );
}

export default Header;