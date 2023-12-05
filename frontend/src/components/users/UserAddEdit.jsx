import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Menu,
  MenuItem,
  MenuHandler,
  MenuList,
  Select,
  Option,
  Radio,
  Textarea,
} from "@material-tailwind/react";
import {useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {codes} from 'country-calling-code';
import UserService from "../../services/UserService";
import { toast } from "react-toastify";
import RoleService from "../../services/RoleService";
import {validator, setValidationErrors} from '../../common/Validator';
import Error from "../../common/Error";
import { encryptData } from "../../common/cryptoHelpers";
import AuthService from "../../services/AuthService";
import { setuserState } from "../../redux/Action/UserAction";
import { useDispatch } from "react-redux";
 
function UserAddEdit() {

  const currentUser = AuthService.getCurrentUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const maxFiles = 5;
  const [selectedFiles, setSelectedFiles] = useState([]);

  const hobbies = [
    { value: 'cricket', label: 'Cricket' },
    { value: 'reading', label: 'Reading' },
    { value: 'coding', label: 'Coding' },
    { value: 'singing', label: 'Singing'},
  ];
  const gender = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const countries = {codes};
  const [countryCode, setCountryCode] = React.useState(0);
  const { country, countryCodes } = countries.codes;

  const [roles, setRoles] = useState([]);
  const [formTitle, setFormTitle] = useState("Add User");

  const [formData, setFormData] = useState({
    role_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country_code: "",
    mobile: "",
    address: "",
    dob: "",
    gender: "",
    image: "",
    doc: "",
    hobbies: [],
  });

  const [formErrors, setFormErrors] = useState({
    role_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country_code: "",
    mobile: "",
    address: "",
    dob: "",
    gender: "",
    image: "",
    doc: "",
    hobbies: "",
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    if(files && files.length + selectedFiles.length > maxFiles)
    {
      toast.error(`You can only select up to ${maxFiles} files!`)
      return;
    }
    const newValue = type === 'file' ? files : value;
    
    if(name == "hobbies")
    {
      if(checked)
      {
        // If the checkbox is not selected, add it to the array
        setSelectedOptions([...selectedOptions, newValue]);
      }
      else{
        // If the checkbox is already selected, remove it from the array
        setSelectedOptions(selectedOptions.filter((option) => option !== newValue));
      }
    }
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleRoleDropdown = (value) => 
  {
    const nextFormState = {
      ...formData,
      role_id: value,
    };
    setFormData(nextFormState);
  }

  const getUser = useCallback(async () => {
    try {
      const { data } = await UserService.getUser(userId)
      if (data.status) {
        setFormData({
          role_id: data.data.user.role_id.toString(),
          first_name: data.data.user.first_name,
          last_name: data.data.user.last_name,
          email: data.data.user.email,
          password: data.data.user.password,
          mobile: data.data.user.mobile,
          address: data.data.user.address,
          dob: data.data.user.dob,
          gender: data.data.user.gender,
          image: data.data.user.profile,
          doc: data.data.user.doc_files,
          hobbies: data.data.user.hobbies ? data.data.user.hobbies?.split(',') : [],
        });
        setCountryCode(data.data.user.country_code)
        setSelectedOptions(data.data.user.hobbies?.split(','))
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.log("error", err);
    }
  }, [setFormData, toast])

  const showSelectedHobbies = (value) => {
    if(formData.hobbies.includes(value)){
      return true;
    }
  }

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

  const findRole = (id) => {
    const foundItem = roles.find((item) => item.id === id);
    return foundItem ? foundItem.role_name : '';
  }
  useEffect(() => {
    if (userId) {
      setFormTitle('Edit User')
      getUser()
    }
  }, [getUser])

  const handleSubmit = async () => {
    setIsLoading(true);
    let rules = {
      role_id: "required",
      first_name: "required",
      last_name: "required",
      email: "required",
      mobile: `required|number|mobile:${countryCode}`,
      address: "required",
      dob: "required",
      gender: "required",
      hobbies: "required",
      image: `file:10`,
      doc: 'file',
    };

    if(!userId)
    {
      rules['password'] = "required";
    }

    let errors = validator(formData, rules);
    if(errors){
      setIsLoading(false);
    }

    setValidationErrors(formErrors, setFormErrors, errors);

    if (Object.keys(errors).length == 0) {
      try {
        const Data = new FormData();
        Data.append("first_name", formData.first_name)
        Data.append("last_name", formData.last_name)
        Data.append("email", formData.email)
        if(formData.password){
          Data.append("password", formData.password)
        }
        Data.append("role_id", 1)
        Data.append("country_code", countryCode)
        Data.append("mobile", formData.mobile)
        Data.append("address", formData.address)
        Data.append("dob", formData.dob)
        Data.append("gender", formData.gender)
        Data.append("hobbies", selectedOptions)
        Data.append("image", formData.image[0])
        if(formData.doc && formData.doc.length > 0)
        {
          Array.from(formData.doc).forEach((pdfFile, index) => {
            Data.append(`doc_${index + 1}`, pdfFile);
          });
        }

        if (userId) {
          var { data } = await UserService.updateUser(userId, Data);
        } else {
          var { data } = await UserService.createUser(Data);
        }
        if (data.status) {
          toast.success(data.message)
          navigate('/users')
          if(currentUser.id == data.data.user.id)
          {
            dispatch(setuserState(data.data.user));
          }
        } else if (data.code === 422) {
          setValidationErrors(formErrors, setFormErrors, data.data.errors);
        } else {
          toast.error(data.message)
        }
      } catch (err) {
        console.log("error", err);
      } finally {
        setIsLoading(false); // Reset isLoading, regardless of success or failure
      }
    }
  };

  return (
      <div className="container mx-auto p-4">
          <Card className="w-96 mt-4 w-full">
            <CardHeader
              variant="gradient"
              color="gray"
              className="mb-4 grid h-28 place-items-center"
              style={{ height:'5rem' }}
              >
              <Typography variant="h3" color="white">
                {formTitle}
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                <div>
                  <Input type="text" name="first_name" label="First Name" value={formData.first_name} onChange={handleInputChange} size="lg" />
                  <Error error={formErrors.first_name} />
                </div>

                <div>
                  <Input type="text" name="last_name" label="Last Name" value={formData.last_name} onChange={handleInputChange} size="lg" />
                  <Error error={formErrors.last_name} />
                </div>

                <div>
                  <div className="relative flex w-full">
                    <Menu placement="bottom-start">
                      <MenuHandler>
                        <Button
                          ripple={false}
                          variant="text"
                          color="blue-gray"
                          className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                          +{countryCode}
                        </Button>
                      </MenuHandler>
                      <MenuList className="max-h-[20rem] max-w-[18rem]">
                        {codes.map(({ country, countryCodes }, index) => {
                          return (
                            <MenuItem
                              name="country_code"
                              key={country}
                              value={countryCodes[0]}
                              className="flex items-center gap-2"
                              onChange={handleInputChange}
                              onClick={() => setCountryCode(countryCodes[0])}
                            >
                              {country} <span className="ml-auto">{countryCodes}</span>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                    <Input
                      type="tel"
                      placeholder="Mobile Number"
                      className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                      name="mobile"
                      value={formData.mobile} 
                      onChange={handleInputChange}
                    />
                  </div>
                    <Error error={formErrors.country_code} />
                    <Error error={formErrors.mobile} />
                </div>

                <div>
                  <Input type="email" name="email" label="Email" value={formData.email} onChange={handleInputChange} size="lg" />
                  <Error error={formErrors.email} />
                </div>

                <div>
                  <Input type="password" name="password" label="Password"  onChange={handleInputChange}   size="lg" />
                  <Error error={formErrors.password} />
                </div>

                <div>
                  <Select
                    size="lg"
                    label="Assign Role"
                    onChange={handleRoleDropdown}
                    selected={(element) =>
                      element &&
                      React.cloneElement(element, {
                        disabled: true,
                        className:
                          "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                      })
                    }
                  >
                    {roles.map(({ id, role_name }) => (
                      <Option key={id} name="role_id" value={''+id} className="flex items-center gap-2">
                      {role_name}
                      </Option>
                    ))}
                  </Select>
                    <Error error={formErrors.role_id} />
                </div>

                <div>
                  <Input type="date" name="dob" label="date of Birth" value={formData.dob} onChange={handleInputChange} size="lg" />
                  <Error error={formErrors.dob} />
                </div>

                <div>
                  <Textarea type="textarea" name="address" label="Address" value={formData.address} onChange={handleInputChange} size="lg" />
                  <Error error={formErrors.address} />
                </div>
              </div>

              <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
                <div className="flex flext-col gap-1">
                    <label>Gender</label>
                    {/* <Radio name="gender" label="Male" value="male" checked={formData.gender == 'male'} onChange={handleInputChange} />
                    <Radio name="gender" label="Female" value="female" checked={formData.gender == 'female'} onChange={handleInputChange} />
                    <Radio name="gender" label="Other" value="other" checked={formData.gender == 'other'} onChange={handleInputChange} /> */}

                    {gender.map((option) => (
                      <div key={option.value}>
                        <Radio name="gender" value={option.value} label={option.label} checked={formData.gender.includes(option.value)} onChange={handleInputChange} />
                      </div>
                    ))}
                    <Typography
                      variant="h6"
                      color={"blue-gray"}
                      className="mt-5"
                    >
                      <Error error={formErrors.gender} />
                        
                    </Typography>
                </div>

                <div className="flex flext-col gap-1">
                  <div className="flex w-max gap-4">
                    <label>Hobbies</label>

                  {hobbies.map((option) => (
                      <div key={option.value}>
                        <Checkbox name="hobbies" value={option.value} label={option.label} defaultChecked={showSelectedHobbies(option.value)} onClick={handleInputChange} />
                      </div>
                    ))}
                  </div>
                  <Error error={formErrors.hobbies} />
                </div>
                    
              </div>

              <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <Input type="file" name="image" accept="image/*" label="Profile Picture" onChange={handleInputChange} size="lg" />
                    <Error error={formErrors.image} />
                  </div>
                <div>
                <div>
                    <Input type="file" name="doc" accept=".pdf" label="ID proofs" onChange={handleInputChange} size="lg" multiple />
                    <Error error={formErrors.doc} />
                  </div>
                </div>
              </div>
              
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth onClick={() => handleSubmit()}>
                {isLoading ? 'Loading...' : formTitle}
              </Button>
            </CardFooter>
          </Card>
      </div>
  );
}

export default UserAddEdit;