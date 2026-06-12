import '../../styles/header.css'
function Header(){
    const today=new Date().toLocaleDateString();
    return(
        <header className="header">
            <h3>Welcome User</h3>
            <p>{today}</p>
        </header>
    );
}

export default Header;