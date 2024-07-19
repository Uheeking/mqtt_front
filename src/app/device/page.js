// src/app/device/page.js
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import DeviceForm from '@/components/component/DeviceForm';
import DeviceList from '@/components/component/DeviceList';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useRouter } from 'next/navigation';

export default function DevicePage() {
  const [devices, setDevices] = useState([]);
  const router = useRouter();

  const handleAddDevice = (device) => {
    setDevices([...devices, device]);
  };

  const handleDeleteDevice = (index) => {
    const newDevices = devices.slice();
    newDevices.splice(index, 1);
    setDevices(newDevices);
  };

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
        <DeviceForm onSubmit={handleAddDevice} />
        <DeviceList devices={devices} onDelete={handleDeleteDevice} />
      </main>
    </div>
  );
}
