import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Typography } from "@material-tailwind/react";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import RoleService from "../../services/RoleService";
import { toast } from "react-toastify";
import {userPermissions} from '../../config.json';

function AssignRolePermission() {
  
    const [roles, setRoles] = useState([]);
    const permissions = userPermissions;
    const [selectedPermission, setSelectedPermission] = useState([]);

    const handlePermissionChange = async(roleId, permission) => {
      console.log(roleId, permission);

      try {
        const Data = new FormData();
        Data.append('permission', permission); 
        const { data } = await RoleService.assignRolePermission(roleId, Data);
        if (data.status) {
          toast.success(data.message)  
        } else {
          toast.error(data.messsage)
        }
      } catch (err) {
        console.log("error", err)
      }
    };

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

    const getRolePermission = useCallback(async () => {
      try {
        const { data } = await RoleService.getRolePermissions();
        if (data.status) {
          const role_permissions = data.data.role_permissions;
          let newData = [];
          {role_permissions.map(
            (role_permission, key) => {
              newData[key] = {
                roleId: role_permission.role_id,
                permissions: role_permission.permission
              };
            }
          )}
          setSelectedPermission(newData);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        console.log("error", err);
      }
    }, [setSelectedPermission]);

    useEffect(() => {
      getRoles();
    }, [getRoles]);

    useEffect(() => {
      getRolePermission();
    }, [getRolePermission]);

    const showSelectedPermissions = (id, value) => {
      const selected = selectedPermission.filter(permission => permission.roleId == id)
      if(selected.length > 0 && selected[0].permissions.includes(value)){
        return true;
      }
    }

    return (
      <>
        <div className="container mx-auto p-4">
          <Card className="w-96 mt-4 w-full">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-28 place-items-center"
              style={{ height:'5rem' }}
              >
              <Typography variant="h3" color="white">
                Assign Role permission
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                  {roles && roles.length > 0 ?
                    <th
                      key={0}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        Permission
                      </Typography>
                    </th>
                    : null
                  }
                  {roles && roles.length > 0 ?
                    roles.map(({ id, role_name }, key) => (
                      <th
                        key={id}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {role_name}
                        </Typography>
                      </th>
                    ))
                    :
                    null
                  }
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(
                    (permission, key) => {
                      const className = `py-3 px-5 ${
                        key === permission.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={key}>
                          <td className={className}>
                            <Typography>
                              {permission}
                            </Typography>
                          </td>
                          {roles.map(({id, role_name}) => (
                            <td key={id} className={className}>
                            <div >
                              <Checkbox 
                                name="permission" 
                                value={permission}
                                defaultChecked={showSelectedPermissions(id, permission)}
                                onChange={() => handlePermissionChange(id, permission)} 
                              />
                            </div>
                          </td>
                          ))}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            {/* <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth>
                Submit
              </Button>
            </CardFooter> */}
          </Card>
      </div>
      </>
    );
  }
  
  export default AssignRolePermission;