import { chartsConfig } from "../configs/chartsConfig";

const chartData = JSON.parse(localStorage.getItem('chartData'));
const countArray = [0,0,0,0,0,0,0];
const daysArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const websiteViewsChart = {
//   type: "bar",
//   height: 220,
//   series: [
//     {
//       name: "Views",
//       data: chartData.count,
//     },
//   ],
//   options: {
//     ...chartsConfig,
//     colors: "#fff",
//     plotOptions: {
//       bar: {
//         columnWidth: "16%",
//         borderRadius: 5,
//       },
//     },
//     xaxis: {
//       ...chartsConfig.xaxis,
//       categories: chartData.days,
//     },
//   },
// };

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Total User",
      data: chartData ? chartData.count : countArray,
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: chartData ? chartData.days : daysArray
    },
  },
};

// const completedTasksChart = {
//   ...dailySalesChart,
//   series: [
//     {
//       name: "Tasks",
//       data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
//     },
//   ],
// };

export const DashboardChartsData = [
  // {
  //   color: "blue",
  //   title: "Website View",
  //   description: "Last Campaign Performance",
  //   footer: "campaign sent 2 days ago",
  //   chart: websiteViewsChart,
  // },
  {
    color: "pink",
    title: "Total Added Users",
    description: "User added day wise",
    footer: "updated 4 min ago",
    chart: dailySalesChart,
  },
  // {
  //   color: "green",
  //   title: "Completed Tasks",
  //   description: "Last Campaign Performance",
  //   footer: "just updated",
  //   chart: completedTasksChart,
  // },
];

export default DashboardChartsData;
