import {
    UserIcon,
    UserGroupIcon,
    UsersIcon,
  } from "@heroicons/react/24/solid";
  
  const totalUsers = localStorage.getItem('totalUsers');
  const totalActiveUsers = localStorage.getItem('totalActiveUsers');
  const totalRoles = localStorage.getItem('totalRoles');
  const totalActiveRoles = localStorage.getItem('totalActiveRoles');

  export const dashboardCardsData = [
    {
      color: "blue",
      icon: UserGroupIcon,
      title: "Total Users",
      value: totalUsers,
      footer: {
        color: "text-green-500",
        value: "",
        label: "",
      },
    },
    {
      color: "pink",
      icon: UsersIcon,
      title: "Active Users",
      value: totalActiveUsers,
      footer: {
        color: "text-green-500",
        value: "",
        label: "",
      },
    },
    {
      color: "green",
      icon: UserGroupIcon,
      title: "Total Roles",
      value: totalRoles,
      footer: {
        color: "text-red-500",
        value: "",
        label: "",
      },
    },
    {
      color: "orange",
      icon: UserIcon,
      title: "Active Roles",
      value: totalActiveRoles,
      footer: {
        color: "text-green-500",
        value: "",
        label: "",
      },
    },
  ];
  
  export default dashboardCardsData;
  