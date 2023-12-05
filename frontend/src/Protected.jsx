import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "./components/widget/layout/sidenav";
import DashboardNavbar from "./components/widget/layout/dashboard-navbar";

function Protected(props)
{
    const {Component} = props

    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate("/");
        }
    },[])

    return(
        <>
            <div className="min-h-screen bg-blue-gray-50/50">
                <Sidenav />
                <div className="p-4 xl:ml-80">
                    <DashboardNavbar />
                    <Component />
                </div>
            </div>
        </>
    )
}

export default Protected;