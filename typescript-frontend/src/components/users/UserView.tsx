import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { EyeIcon } from "@heroicons/react/24/outline";
 
export function UserView(props: { [key: string]: any }) {

  const user = props.user;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
      <IconButton
            variant="text"
            color="green"
            onClick={handleOpen}
        >
        <EyeIcon className="h-5 w-5 text-green-500" />
        </IconButton>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="w-96 w-full">
        <div className="ml-auto">
        <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
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
            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-">
              <div>
                <div className="">
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
          <div className="ml-auto">
          <CardFooter className="pt-0 ">
            <Button
                variant="gradient"
                color="red"
                size="sm"
                onClick={handleOpen}
            >
                <span>Close</span>
            </Button>
          </CardFooter>
          </div>
        </Card>
      </Dialog>
    </>
  );
}