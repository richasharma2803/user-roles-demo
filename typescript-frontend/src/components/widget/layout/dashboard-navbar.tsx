import {setOpenConfigurator, setOpenSidenav, useMaterialTailwindController} from '../../../context/index';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Typography, IconButton, Input, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react";
import { Bars3Icon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import AuthService from '../../../services/AuthService';
import { useSelector } from 'react-redux';

function DashboardNavbar()
{
    const navigate = useNavigate()
    // const user = AuthService.getCurrentUser();
    const user = useSelector((state: any) => state.user);
    
    const [controller, dispatch] = useMaterialTailwindController();
    const { fixedNavbar, openSidenav } = controller;
    const { pathname } = useLocation();
    const [layout, page] = pathname.split("/").filter((el) => el !== "");

    const logOut = async () => {

        let { data, status } = await AuthService.logout()

        if(status == 200) {
            localStorage.clear();
                navigate("/")
        } else {
            console.log('Erros', data)
        }
    }

    return(
        <Navbar
            color={fixedNavbar ? "white" : "transparent"}
            className={`rounded-xl transition-all w-50 ${
                fixedNavbar
                ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
                : "px-0 py-1"
            }`}
            fullWidth
            blurred={fixedNavbar}
            >
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
                <div className="capitalize">
                    </div>
                    <div className="flex items-center">
                    <div className="mr-auto md:mr-4 md:w-56">
                        <Input label="Type here" crossOrigin={undefined} />
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                    <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => setOpenConfigurator(dispatch, true)}
                    >
                    <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
                    </IconButton>
                    <Menu>
                    <MenuHandler>
                    {user && user.profile 
                        ? 
                        <Avatar
                        src={`http://127.0.0.1:8000/users/images/${user.profile}`}
                        alt="item-1"
                        size="sm"
                        variant="circular"
                        />
                        :
                        <Avatar
                        src={'https://www.gravatar.com/avatar/404?d=mp'}
                        alt="item-1"
                        size="sm"
                        variant="circular"
                        />
                    }
                    </MenuHandler>
                    <MenuList className="w-max border-0">
                    <Link to={`/profile/${user?.id}`}>
                    <MenuItem className="flex items-center gap-3">
                        <div>
                            
                            <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-normal">
                                <strong>Profile</strong>
                            </Typography>
                        </div>
                    </MenuItem>
                    </Link>
                    <MenuItem className="flex items-center gap-4" onClick={logOut}>
                        <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-1 font-normal"
                        >
                            <strong>Logout</strong>
                        </Typography>
                        </div>
                    </MenuItem>
                    </MenuList>
                </Menu>
                </div>
            </div>
        </Navbar>
    )
}

export default DashboardNavbar;