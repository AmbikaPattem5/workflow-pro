import {ReactNode} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import "../styles/layout.css";
type MainLayoutProps={
    children : ReactNode;
};

function MainLayout({children}: MainLayoutProps){
    return(
        <div className="layout">
            <Sidebar/>
            <div className="content">
                <Header/>
                {children}
            </div>
        </div>
    );
}

export default MainLayout;