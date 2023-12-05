import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidenav from "./components/widget/layout/sidenav";
import DashboardNavbar from "./components/widget/layout/dashboard-navbar";
import AuthService from "./services/AuthService";
import { useDispatch } from "react-redux";
import { setuserState } from "./redux/Action/UserAction";

type ComponentProps = {
    Component: React.ComponentType
}

function Protected({Component}: ComponentProps)
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        dispatch(setuserState(user));
        if(!localStorage.getItem('token')) {
            navigate("/");
        }
    },[])

    return(
        <>
            <div className="min-h-screen bg-blue-gray-50/50" style={{ width:'1370px' }}>
                <Sidenav />
                <div className="p-4 xl:ml-40">
                    <DashboardNavbar />
                    <Component />
                </div>
            </div>
        </>
    )
}

export default Protected;