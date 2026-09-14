import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";

function RootLayout() {
    return <>
        <MainHeader />
        {/* Outlet placeholder to take space for the nested children*/}
        <Outlet/>
    </>
}

export default RootLayout;