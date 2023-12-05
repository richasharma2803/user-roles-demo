import React, { useCallback, useEffect, useState } from "react";
import dashboardCardsData from "../../data/dashboard-card-data";
import DashboardCard from "../widget/cards/DashboardCard";
import { Typography } from "@material-tailwind/react";
import DashboardChartsData from "../../data/dahboard-chart";
import DashboardChart from "../widget/charts/DashboardChart";
import { ClockIcon } from "@heroicons/react/24/solid";
import DashboardService from "../../services/DashboardService";
import { toast } from "react-toastify";

function Dashboard()
{
  const [CardData, setCardData] = useState({});
  const [ChartData, setChartData] = useState([]);

  const getCardData = useCallback(async () => {
    try {
      const { data } = await DashboardService.getdashboardCardData();
      if (data.status) {
        setCardData(data.data);
        localStorage.setItem('totalUsers', data.data.totalUsers);
        localStorage.setItem('totalActiveUsers', data.data.totalActiveUsers);
        localStorage.setItem('totalRoles', data.data.totalRoles);
        localStorage.setItem('totalActiveRoles', data.data.totalActiveRoles);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, [setCardData]);

  const getChartData = useCallback(async () => {
    try {
      const { data } = await DashboardService.getdashboardChartData();
      if (data.status) {
        const fetchedData = data.data;
        localStorage.setItem('chartData', JSON.stringify(fetchedData))
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, [setCardData]);

  useEffect(() => {
    getCardData();
    getChartData();
  }, [getCardData, getChartData, toast]);

    return(
        <>
            <div className="mt-12">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    {dashboardCardsData.map(({ icon, title, footer, ...rest }) => (
                    <DashboardCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                        className: "w-6 h-6 text-white",
                        })}
                        footer={
                        <Typography className="font-normal text-blue-gray-600">
                            <strong className={footer.color}>{footer.value}</strong>
                            &nbsp;{footer.label}
                        </Typography>
                        }
                    />
                    ))}
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {DashboardChartsData.map((props) => (
                <DashboardChart
                    key={props.title}
                    {...props}
                    footer={
                    <Typography
                        variant="small"
                        className="flex items-center font-normal text-blue-gray-600"
                    >
                        <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                        &nbsp;{props.footer}
                    </Typography>
                    }
                />
                ))}
            </div>
        </>
    )
}

export default Dashboard;