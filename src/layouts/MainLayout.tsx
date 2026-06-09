import {ReactNode} from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

type MainLayoutProps={
    children : ReactNode;
};

function MainLayout({children}: MainLayoutProps){
    return(
        <div>
            <Sidebar/>
            <div>
                <Header/>
                {children}
            </div>
        </div>
    );
}

export default MainLayout;