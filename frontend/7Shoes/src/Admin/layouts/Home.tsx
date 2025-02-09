import SideBar from "./SideBar"
import NavBar from "./NavBar"
import { Outlet } from "react-router-dom";

export default function Home(){
    return(
        <div className="wrapper">
        <>
            <SideBar/>
            <NavBar/>
            <main>
                <Outlet/> {/*Hiển thị nội dung của Route con*/}
            </main>
        </>
      </div>
    );
}