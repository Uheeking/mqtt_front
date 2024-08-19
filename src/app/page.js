"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";
import { mapReceivedDataToChartDetails } from '@/utils/mapData';
import { FaSearch } from "react-icons/fa";

const Sidebar = dynamic(() => import('@/components/chart/Sidebar'));
const WarningMessage = dynamic(() => import("@/components/chart/WarningMessage"));
const LineChartComponent = dynamic(() => import("@/components/chart/LineChartComponent"));
const DeviceInfo = dynamic(() => import("@/components/chart/DeviceInfo"));
const MainDeviceList = dynamic(() => import("@/components/device/MainDeviceList"));
dynamic(() => import('@/app/globals.css'));

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function Home() {
  const [category, setCategory] = useState('deviceName');
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [pointedId, setPointedId] = useState(1); // Initial pointedId
  const [deviceData, setDeviceData] = useState(null);
  const [devices, setDevices] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [chartDetails, setChartDetails] = useState([
    { title: "현재온도", range: "-10°C~60°C, ±1°C", data: [] },
    { title: "현재온도2", range: "-10°C~60°C, ±1°C", data: [] },
    { title: "현재압력", range: "0~200K Lux, 14%", data: [] },
    { title: "현재전류", range: "20%~85% RH, ±4%RH", data: [] },
    { title: "현재수압", range: "0~10 Bar, ±0.5%", data: [] },
  ]);

  // Fetch device info and data based on pointedId whenever it changes
  useEffect(() => {
    fetchDeviceInfo(pointedId);
    fetchDeviceData(pointedId, setDeviceData, setChartDetails);
  }, [pointedId]); // Adding pointedId as a dependency

  // Fetch devices list only once when the component mounts
  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDeviceData = async (id, setDeviceData, setChartDetails) => {
    try {
      console.log('Fetching data for pointedId:', id);
      const response = await axios.get(`${BACKURL}/device/getDevice/${id}`, { headers: { 'Cache-Control': 'no-cache' } });
      const newData = response.data.data;
      console.log(newData);

      if (Array.isArray(newData) && newData.length > 0) {
        setDeviceData(newData);
        const updatedChartDetails = mapReceivedDataToChartDetails(newData);
        setChartDetails(updatedChartDetails);
      } else {
        console.error('Unexpected data format:', newData);
      }
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };

  const fetchDeviceInfo = async (id) => {
    try {
      const response = await axios.get(`${BACKURL}/device/getDeviceInfo/${id}`, { headers: { 'Cache-Control': 'no-cache' } });
      const infoData = response.data;
      console.log('Device Info:', infoData.data[0]);
      setDeviceInfo(infoData.data[0]);
    } catch (error) {
      console.error("Error fetching device info:", error);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await axios.get(`${BACKURL}/device/getMainDeviceInfo`, { cache: 'no-store' });
      const data = response.data;
      setDevices(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeviceData = async (id) => {
    console.log('Updating pointedId to:', id);
    setPointedId(id);
  };

  const handleSearch = async () => {
    if (!keyword || !category) return;

    try {
      const response = await axios.post(`${BACKURL}/device/postSearchDevices`, {
        keyword: keyword, category : category
      });
      console.log(response.data);
      
      setSearchResults(response.data.devices);
    } catch (error) {
      console.error('Error searching devices:', error);
    }
  };



  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col items-center w-full">
        <header className="w-full flex items-center justify-between px-4 relative">
          <Sidebar />
          <h1 className="text-xl font-bold truncate header-content">실내 모니터링({deviceInfo?.DEV_NAME}/{deviceInfo?.DEV_ID})</h1>
          <div className="w-1/2 md:w-1/4 flex items-center space-x-2">
            <select
              className="w-1/2 md:w-1/3 sm:w-full p-2 border border-gray-300 rounded text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="DEV_NAME">디바이스 이름</option>
              <option value="DEV_ID">맥주소</option>
            </select>

            <input
              type="text"
              className="w-1/2 p-2 border border-gray-300 rounded text-sm"
              placeholder="Search devices..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <FaSearch
              className="w-8 h-8 bg-black text-white p-1 rounded cursor-pointer"
              onClick={() => handleSearch()}
            />
          </div>

        </header>
        {devices && <MainDeviceList devices={devices} onGraphClick={handleDeviceData} pointedId={pointedId} />}
        <main className="flex flex-wrap justify-center w-full gap-4 my-4">
          {searchResults?.length > 0 && (
            <div className="w-full mt-4">
              <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
              <DeviceList devices={searchResults} />
            </div>
          )}
          {chartDetails.map((chart, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 mx-4">
              <LineChartComponent className="w-full aspect-[4/3]" title={chart.title} range={chart.range} data={chart.data} />
            </div>
          ))}
          {deviceInfo && <DeviceInfo data={deviceData?.[0]} deviceInfo={deviceInfo} />}
        </main>
        {deviceData && <WarningMessage data={deviceData} />}

      </div>
    </div>
  );
}
