import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Error from "../../common/Error";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import RoleService from "../../services/RoleService";
import { toast } from "react-toastify";
import { setValidationErrors, validator } from "../../common/Validator";
import { FormErrorsType } from "../../Types";

export function RoleAddEdit(){

    const navigate = useNavigate();
    const { roleId } = useParams();

    const [formTitle, setFormTitle] = useState("Add Role")
    const [formData, setFormData] = useState({
        role_name: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrorsType>({
        role_name: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextFormState = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(nextFormState);
    };

    const getRoles = useCallback(async () => {
        try {
        const { data } = await RoleService.getRole(roleId || 0)

        if (data.status) {
            setFormData({
            role_name: data.data.role.role_name,
            });
        } else {
            toast.error(data.message)
        }
        } catch (err) {
            console.log("error", err);
        }
    }, [setFormData, toast])

    useEffect(() => {
        if (roleId) {
          setFormTitle('Edit Role')
    
          getRoles()
        }
    }, [getRoles])

    const handleSubmit = async () => {
        let rules = {
          role_name: "required"
        };
    
        let errors = validator(formData, rules);
    
        setValidationErrors(formErrors, setFormErrors, errors);
    
        if (Object.keys(errors).length == 0) {
          try {
            const Data = new FormData();
            Data.append("role_name", formData.role_name)
    
            if (roleId) {
              var { data } = await RoleService.updateRole(roleId, Data);
            } else {
              var { data } = await RoleService.createRole(Data);
            }
    
            if (data.status) {
              toast.success(data.message)
              navigate('/roles')
            } else if (data.code === 422) {
              setValidationErrors(formErrors, setFormErrors, data.data.errors);
            } else {
              toast.error(data.message)
            }
          } catch (err) {
            console.log("error", err);
          }
        }
    };

    return (
        <>
          <div className="container mx-auto p-4">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
                  {formTitle}
                </Typography>
                <div className="flex flex-col gap-1">
                  <Input type="text" crossOrigin={undefined} name="role_name" label="Role Name" value={formData.role_name} onChange={handleInputChange} size="lg" />
                  <Error error={formErrors.role_name} />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth onClick={() => handleSubmit()}>
                  {formTitle}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
    );
}