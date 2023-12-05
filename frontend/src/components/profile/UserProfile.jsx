import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  IconButton,
  Avatar,
  DialogFooter,
} from "@material-tailwind/react";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

function UserProfile() {
  // const user = AuthService.getCurrentUser();
  const user = useSelector((state) => state.user);
    return (
        <div className="container mx-auto p-4">
        <Card className="w-96 w-full">
          <CardBody className="flex flex-col gap-4 mt-4">
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-4">
              <div>
              {user && user.profile 
                  ? 
                  <Avatar src={`http://127.0.0.1:8000/users/images/${user.profile}`} size="xl" />
                  :
                  <Avatar src={'https://www.gravatar.com/avatar/404?d=mp'} size="xl" />
              }
              </div>
              <div>
              <Typography
                variant="h6"
                color={"blue-gray"}
                className="mt-5"
              >
                {user.first_name} {user.last_name}
                  
              </Typography>
              </div>
              <div>
                  <Link to={`/users/edit-user/${user.id}`}>
                    <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                  </Link>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              <div>
                <div className="mt-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold capitalize"
                    >
                    Email:
                  </Typography>
                    {typeof user.email === "string" ? (
                    <Typography
                        variant="small"
                        className="font-normal text-blue-gray"
                    >
                        {user.email}
                    </Typography>
                    ) : (
                    user.email
                    )}
                </div>

                <div className="mt-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold capitalize"
                    >
                    Mobile:
                    </Typography>
                    {typeof user.mobile === "string" ? (
                    <Typography
                        variant="small"
                        className="font-normal text-blue-gray"
                    >
                        +{user.country_code}{user.mobile}
                    </Typography>
                    ) : (
                      +user.country_code + user.mobile
                    )}
                </div>

                <div className="mt-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold capitalize"
                    >
                    Hobbies:
                    </Typography>
                    {typeof user.hobbies === "string" ? (
                    <Typography
                        variant="small"
                        className="font-normal text-blue-gray"
                    >
                        {user.hobbies}
                    </Typography>
                    ) : (
                    user.hobbies
                    )}
                </div>

                <div className="mt-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold capitalize"
                    >
                    Date of Birth:
                    </Typography>
                    {typeof user.dob === "string" ? (
                    <Typography
                        variant="small"
                        className="font-normal text-blue-gray"
                    >
                        {user.dob}
                    </Typography>
                    ) : (
                    user.dob
                    )}
                </div>
              </div>
              <div>
                  <div className="mt-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                      >
                      Gender:
                      </Typography>
                      {typeof user.gender === "string" ? (
                      <Typography
                          variant="small"
                          className="font-normal text-blue-gray"
                      >
                          {user.gender}
                      </Typography>
                      ) : (
                      user.gender
                      )}
                  </div>

                  <div className="mt-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                      >
                      Address:
                      </Typography>
                      {typeof user.address === "string" ? (
                      <Typography
                          variant="small"
                          className="font-normal text-blue-gray"
                      >
                          {user.address}
                      </Typography>
                      ) : (
                      user.address
                      )}
                  </div>

                  <div className="mt-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold capitalize"
                      >
                      status:
                      </Typography>
                      {typeof user.is_active === "string" ? (
                      <Typography
                          variant="small"
                          className="font-normal text-blue-gray"
                      >
                          {user.is_active == 1 ? 'Active' : 'In Active' }
                      </Typography>
                      ) : (
                      user.is_active == 1 ? 'Active' : 'In Active'
                      )}
                  </div>
              </div>
            </div>
          </CardBody>
        </Card>
        </div>
    );
}
  
export default UserProfile;