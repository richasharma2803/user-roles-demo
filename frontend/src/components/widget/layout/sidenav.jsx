import {setOpenSidenav, useMaterialTailwindController} from '../../../context/index';
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, IconButton, Typography } from '@material-tailwind/react';
import {HomeIcon, UserCircleIcon, UserGroupIcon, UserPlusIcon, XMarkIcon} from "@heroicons/react/24/solid";
import AuthService from '../../../services/AuthService';
import {manageUsers, manageRoles, assignRolePermission} from '../../../config.json';
import { useSelector } from 'react-redux';

function Sidenav()
{
  // const user = AuthService.getCurrentUser();
  const user = useSelector((state) => state.user);
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return(
      <aside
        className={`${sidenavTypes[sidenavType]} ${
          openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
      >
        <div
          className={`relative border-b ${
            sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
        >
          <Link to="/" className="flex items-center gap-4 py-6 px-8">
            {user && user.profile 
                ? 
                <Avatar src={`http://127.0.0.1:8000/users/images/${user.profile}`} size="sm" />
                :
                <Avatar src={'https://www.gravatar.com/avatar/404?d=mp'} size="sm" />
            }
            <Typography
              variant="h6"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
            >
              {user.first_name} {user.last_name}
            </Typography>
          </Link>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
          </IconButton>
        </div>
        <div className="m-4">
            <ul className="mb-4 flex flex-col gap-1">
                <li>
                  <NavLink to="/dashboard">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <HomeIcon width={'1.5rem'} />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Dashboard
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/profile/${user.id}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <UserCircleIcon width={'1.5rem'} />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Profile
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
                {user.rolePermission.includes(manageUsers)
                ?
                <li>
                  <NavLink to="/users">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <UserGroupIcon width={'1.5rem'} />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Manage Users
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li> : ""}
                {user.rolePermission.includes(manageRoles)
                ?
                <li>
                  <NavLink to="/roles">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <UserGroupIcon width={'1.5rem'} />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Manage Roles
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li> : ""}
                {user.rolePermission.includes(assignRolePermission)
                ?
                <li>
                  <NavLink to="/assign-role-permission">
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        <UserPlusIcon width={'1.5rem'} />
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          Assign Role Permission
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li> : "" }
            </ul>
        </div>
        
      </aside>
  )
}

export default Sidenav;