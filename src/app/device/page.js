// src/app/device/page.js
'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DeviceForm from '@/components/device/DeviceForm';
import DeviceList from '@/components/device/DeviceList';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import axios from "axios";

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function DevicePage() {
  const [devices, setDevices] = useState([]);

  const fetchDevices = () => {
    axios
      .get(`${BACKURL}/getDevice`, { cache: 'no-store' })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setDevices(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      <header className="w-full py-4 border-b flex items-center justify-center relative">
        <Link href="/" legacyBehavior>
          <MdKeyboardDoubleArrowLeft
            className="absolute left-4 cursor-pointer text-2xl mb-"
          />
        </Link>
        <h1 className="text-xl font-bold">디바이스 등록 및 목록</h1>
      </header>
      <main className="flex flex-col items-center w-full mt-4">
        <DeviceForm fetchDevices={fetchDevices} />
        <DeviceList devices={devices} setDevices={setDevices} />
      </main>
    </div>
  );
}
