// src/app/device/page.js
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DeviceForm from '@/components/device/DeviceForm';
import DeviceList from '@/components/device/DeviceList';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import Sidebar from "@/components/chart/Sidebar";
import axios from "axios";

const DeviceForm = dynamic(() => import('@/components/device/DeviceForm'));
const UpdateDeviceList = dynamic(() => import('@/components/device/UpdateDeviceList'));
const Sidebar = dynamic(() => import('@/components/chart/Sidebar'), { ssr: false });

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function DevicePage() {
  const [devices, setDevices] = useState([]);
  const [mainDevices, setMainDevices] = useState([]);

  const fetchDevices = () => {
    axios
      .get(`${BACKURL}/device/getDevice`, { cache: 'no-store' })
      .then((response) => {
        const data = response.data;
        setDevices(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchMainDevices = async () => {
    try {
      const response = await axios.get(`${BACKURL}/device/getMainDeviceInfo`, { cache: 'no-store' });
      setMainDevices(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
    fetchMainDevices();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <header className="w-full flex items-center justify-between px-4 relative">
        <Sidebar />
        <h1 className="text-xl font-bold truncate header-content">디바이스 등록 및 목록</h1>
      </header>
      <main className="flex flex-col items-center w-full mt-4 p-4">
        <DeviceForm fetchDevices={fetchDevices} />
        <UpdateDeviceList devices={mainDevices} onUpdateClick={fetchMainDevices} setDevices={setMainDevices} />
      </main>
    </div>
  );
}
