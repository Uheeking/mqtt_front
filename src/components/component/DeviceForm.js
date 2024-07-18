// components/DeviceForm.js
import React, { useState } from 'react';
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import Link from "next/link"

const DeviceForm = ({ onSubmit }) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ deviceName, deviceType });
    setDeviceName('');
    setDeviceType('');
  };

  return (
    <div>    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">디바이스 이름</label>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">디바이스 타입</label>
        <input
          type="text"
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        등록
      </button>
    </form>
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Enter your email and password to access your account.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
        </div>
        <button type="submit" className="w-full">
          Sign in
        </button>
        <Link
          href="#"
          className="inline-block w-full text-center text-sm text-primary-foreground underline"
          prefetch={false}
        >
          Forgot your password?
        </Link>
      </div>
    </div>
    </div>

  );
};

export default DeviceForm;
