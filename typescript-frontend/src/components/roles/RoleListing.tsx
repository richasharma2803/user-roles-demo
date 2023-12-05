import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import RoleService from "../../services/RoleService";
import { toast } from "react-toastify";
import {createRole, editRole, updateRole, roleDelete} from '../../config.json';
import Swal from "sweetalert2";
import { Role } from "../../Types";

export function RoleListing(){

    const currentUser = AuthService.getCurrentUser() || null;
    
    const [roles, setRoles] = useState<Role[]>([]);

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
    }, [getRoles, toast]);

    const changeStatus = async (roleId: number, isActive: number) => {
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
      
          const { data } = await RoleService.changeRoleStatus(roleId);
          if (data.status) {
            
            let rolesData = [...roles];

            const targetObject = rolesData.find(role => role.id === roleId);
            if (targetObject) {
              status == 'Active' ? targetObject.is_active = 1 : targetObject.is_active = 0
            }
    
            setRoles(rolesData)
            
            toast.success(data.message)  
          } else {
                toast.error(data.messsage)
          }
        } catch (err) {
            console.log("error", err)
        }
    }
    
    const deleteRole = async (roleId: number) => {

        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete this role?`,
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
        
            const { data } = await RoleService.deleteRole(roleId);
            if (data.status) {
                const rolesData = roles.filter(role => role.id !== roleId);
                setRoles(rolesData)
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
            {currentUser?.rolePermission && currentUser.rolePermission.includes(createRole)
            ?
            <Link to="add-role">
              <Button className="flex items-center gap-1" color="blue" size="sm">
                <PlusIcon className="w-6 h-6" />
                New Role
              </Button>
            </Link>
            : ""}
          </div>
          <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
              <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                <Typography variant="h6" color="white">
                  Roles Table
                </Typography>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["#", "Role Name", "status", "Action"].map((el) => (
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
                    {roles && roles.length > 0 ?  roles.map(
                      ({ id, role_name, is_active }, key) => {
                        const className = `py-3 px-5 ${
                          key === roles.length - 1
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
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-semibold"
                                  >
                                    {role_name}
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
                              {currentUser?.rolePermission && currentUser.rolePermission.includes(updateRole)
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
                              className="py-1 px-2 text-[11px] font-medium"
                            />}
                            </td>
                            <td className={className}>
                              <Typography
                                className="text-xs font-semibold text-blue-gray-600"
                              >
                                {currentUser?.rolePermission && currentUser.rolePermission.includes(editRole)
                                ?
                                <Link to={`edit-role/${id}`}>
                                  <IconButton
                                      variant="text"
                                      color="blue"
                                  >
                                    <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                                  </IconButton>
                                </Link>
                                : ""}
                                {currentUser?.rolePermission && currentUser.rolePermission.includes(roleDelete)
                                ?
                                <IconButton
                                    variant="text"
                                    color="red"
                                    onClick={() => deleteRole(id)}
                                >
                                  <TrashIcon className="h-5 w-5 text-red-500" />
                                </IconButton>
                                : "" }
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    ): (
                      <tr>
                        <td className="p-5 text-center" colSpan={4}>
                          No Roles Found.
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