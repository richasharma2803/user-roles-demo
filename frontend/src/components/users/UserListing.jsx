import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, PencilIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import UserService from "../../services/UserService";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import RoleService from "../../services/RoleService";
import UserView from "./UserView";
import {userPermissions, createUser, editUser, updateUser, userDelete, showUser} from '../../config.json';
import AuthService from "../../services/AuthService";

function UserListing() {

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  const getUsers = useCallback(async () => {
    try {
      const { data } = await UserService.getUsers();
      if (data.status) {
        setUsers(data.data.users);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, [setUsers]);

  useEffect(() => {
    getUsers();
  }, [getUsers, toast]);

  const getRoles = useCallback(async () => {
    try {
      const { data } = await RoleService.getRoles();
      if (data.status) {
        setRoles(data.data.roles);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, [setRoles]);

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  function findRole(id) {
    const foundItem = roles.find((item) => item.id === id);
    return foundItem ? foundItem.role_name : '';
  }

  const changeStatus = async (userId, isActive) => {
    let status = isActive == 1 ? 'In Active' : 'Active'

    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to change status to ${status}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      return result.isConfirmed
    });

    if(!isConfirm){
        return;
    }

    try {
  
      const { data } = await UserService.changeUserStatus(userId);
      if (data.status) {
        let usersData = [...users];
        const targetObject = usersData.find(user => user.id === userId);
        if (targetObject) {
          status == 'Active' ? targetObject.is_active = 1 : targetObject.is_active = 0
        }

        setUsers(usersData)
        
        toast.success(data.message)  
      } else {
        toast.error(data.messsage)
      }
    } catch (err) {
      console.log("error", err)
    }
  }

  const getUser = (userId) => {
    const user = users.find((item) => item.id === userId);
    return user;
  }

  const deleteUser = async (userId) => {

    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed
    });

    if(!isConfirm){
        return;
    }

    try {
  
      const { data } = await UserService.deleteUser(userId);
      if (data.status) {
        const usersData = users.filter(user => user.id !== userId);
        
        setUsers(usersData)

        toast.success(data.message)  
      }else{
        toast.error(data.messsage)
      }
    } catch (err) {
      console.log("error", err)
    }
  }

  return (
    <>
      <div className="flex justify-end mt-3">
        {currentUser.rolePermission.includes(createUser)
        ?
        <Link to="add-user">
            <Button className="flex items-center gap-1" color="blue" size="sm">
              <PlusIcon className="w-6 h-6" />
              New User
            </Button>
          </Link>
        : ""
        }
          
      </div>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Users Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["#", "Name", "Email",  "Gender", "Occupation", "status", "Action"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ?  users.map(
                  ({ id, first_name, last_name, email, profile, dob, gender, country_code, mobile, hobbies, role_id, is_active }, key) => {
                    const className = `py-3 px-5 ${
                      key === users.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={id}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {key+1}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {
                              profile 
                              ? <Avatar src={`http://127.0.0.1:8000/users/images/${profile}`} alt={first_name} size="sm" /> 
                              : <Avatar src={'https://www.gravatar.com/avatar/404?d=mp'} alt={first_name} size="sm" />
                            }
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {first_name} {last_name} 
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {email} 
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {gender} 
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {findRole(role_id)}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          {/* <Chip
                            variant="gradient"
                            color={is_active ? "green" : "red"}
                            value={is_active ? "Active" : "Inactive"}
                            className="py-1 px-2 text-[11px] font-medium"
                          /> */}
                          {currentUser.rolePermission.includes(updateUser)
                          ?
                          <Button 
                          variant="gradient"
                          color={is_active ? "green" : "red"}
                          className="py-1 px-2 text-[11px] font-medium"
                          onClick={() => changeStatus(id, is_active ? 1 : 0)}>
                            {is_active ? 'Active' : 'In Active'}
                          </Button>
                          : <Chip
                          variant="gradient"
                          color={is_active ? "green" : "red"}
                          value={is_active ? "Active" : "Inactive"}
                          className="text-[10px] font-medium"
                          style={{ width: 'fit-content' }}
                        /> }
                        </td>
                        <td className={className}>
                          <Typography
                            className="text-xs font-semibold text-blue-gray-600"
                          >
                            {currentUser.rolePermission.includes(editUser)
                        ?
                            <Link to={`edit-user/${id}`}>
                            <IconButton
                                variant="text"
                                color="blue"
                            >
                              <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                            </IconButton>
                            </Link>
                            : ""}
                            {currentUser.rolePermission.includes(showUser)
                              ?
                            <UserView user={getUser(id)} />
                            : "" }
                            {currentUser.rolePermission.includes(userDelete)
                            ?
                            <IconButton
                                variant="text"
                                color="red"
                                onClick={() => deleteUser(id)}
                            >
                              <TrashIcon className="h-5 w-5 text-red-500" />
                            </IconButton>
                            : ""}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                ): (
                  <tr>
                    <td className="p-5 text-center" colSpan={4}>
                      No users Found.
                    </td>
                  </tr>
                ) 
              }
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default UserListing;