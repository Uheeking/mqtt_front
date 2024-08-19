"use client";
import dynamic from 'next/dynamic';
import axios from "axios";
import '@/app/globals.css';
import { useEffect, useState } from 'react';
const WarningMessage = dynamic(() => import("@/components/chart/WarningMessage"));
const LineChartComponent = dynamic(() => import("@/components/chart/LineChartComponent"));
const Sidebar = dynamic(() => import('@/components/chart/Sidebar'));
import { mapReceivedDataToChartDetails } from "@/utils/mapData";

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function Home() {
  const [data, setData] = useState([]);
  const [chartDetails, setChartDetails] = useState([
    { title: "CO2 측정", range: "400-5,000ppm, 해상도 1ppm", data: [] },
    { title: "미세먼지 측정", range: "OuE/ 1m-5000u/mt", data: [] },
    { title: "온도측정", range: "-10°C~60°C, ±1°C", data: [] },
    { title: "습도측정", range: "20%~85% RH, ±4%RH", data: [] },
    { title: "조도측정", range: "0~200K Lux, 14%", data: [] },
  ]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${BACKURL}/device/getDevice`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((response) => {
          const newData = response.data;
          console.log(newData);

          const updatedChartDetails = mapReceivedDataToChartDetails(newData);
          setChartDetails(updatedChartDetails);
          setData(newData[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    const test = () => {
      axios
        .get(`${BACKURL}/`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((response) => {
          const newData = response.data;
          console.log(newData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    test()
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 10000); // Change this to 10000 for 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col items-center w-full">
        <header className="w-full flex items-center justify-between px-4 relative">
        <Sidebar />
          <h1 className="text-xl font-bold truncate header-content">실내 모니터링</h1>
        </header>
        <main className="flex flex-wrap justify-center w-full gap-4 my-4">
          {chartDetails.map((chart, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 mx-4">
              <LineChartComponent className="w-full aspect-[4/3]" title={chart.title} range={chart.range} data={chart.data} />
            </div>
          ))}
        </main>
        <WarningMessage data={data} />
      </div>
    </div>
  );
}
