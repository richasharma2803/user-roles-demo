import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react";
import { ChangeEvent, useState } from "react";
import {validator, setValidationErrors} from '../../common/Validator';
import AuthService from '../../services/AuthService';
import Error from "../../common/Error";
import { useNavigate } from "react-router-dom";
import {encryptData} from '../../common/cryptoHelpers';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setuserState } from "../../redux/Action/UserAction";
import { FormErrorsType } from "../../Types";

function Login()
{
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [formErrors, setFormErrors] = useState<FormErrorsType>({
		email: "",
    	password: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextFormState = {
            ...formData,
            [e.target.name]: e.target.value,
        };
        setFormData(nextFormState);
    };

	const handleSubmit = async() => {
		let rules = {
            email: "required|email",
            password: "required|min:8",
        };

        let errors = validator(formData, rules);

		setValidationErrors(formErrors, setFormErrors, errors);

		if (Object.keys(errors).length == 0) {
            try {
                const Data = new FormData();

                Data.append("email", formData.email);
                Data.append("password", formData.password);

                const { data } = await AuthService.login(Data);

                if (data.status) {
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', encryptData(JSON.stringify(data.data.user)));
                    dispatch(setuserState(data.data.user));
                    navigate("/dashboard");
                } else if (data.code === 422) {
                    setValidationErrors(formErrors, setFormErrors, data.data.errors);
                    toast.error(data.message)
                } else {
                    toast.error(data.message)
                }
            } catch (err) {
                console.log("error", err);
            }
        }
    };

	return(
			<>
				<div className="absolute inset-0 z-0 h-full w-full bg-black/10" />
					<div className="container mx-auto p-4">
					<Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
						<CardBody className="flex flex-col gap-4">
							<Typography variant="h4" color="blue-gray" className="mb-2 text-center">
								Sign In
							</Typography>
							<div className="flex flex-col gap-1">
								<Input crossOrigin={undefined} type="email" name="email" label="Email" value={formData.email} onChange={handleInputChange} size="lg" />
								<Error error={formErrors.email} />
							</div>
							<div className="flex flex-col gap-1">
								<Input crossOrigin={undefined} type="password" name="password" label="Password" value={formData.password} onChange={handleInputChange}   size="lg" />
								<Error error={formErrors.password} />
							</div>
						</CardBody>
						<CardFooter className="pt-0">
							<Button variant="gradient" fullWidth onClick={() => handleSubmit()}>
								Sign In
							</Button>
						</CardFooter>
					</Card>
				</div>
			</>
	)
}

export default Login;