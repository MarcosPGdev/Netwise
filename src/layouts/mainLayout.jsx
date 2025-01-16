
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

function Main_Screen (){
    return(
        <div className="screen">
            <Header/>
            <Outlet/>
        </div>
    )
}

export default Main_Screen;