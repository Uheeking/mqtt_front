// components/DeviceForm.js
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DeviceForm = ({ onSubmit }) => {
  const [deviceName, setDeviceName] = useState('');
  const [macAddress, setMacAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ deviceName, macAddress });
    setDeviceName('');
    setMacAddress('');
  };

  return (
    <div className="grid gap-4 w-full mt-10 mb-10">
      <Card>
        <CardHeader>
          <CardTitle>디바이스 등록</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">맥주소</label>
              <input
                type="text"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
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

            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg w-full">
              등록
            </button>
          </form>
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">

              <div>
                <div className="font-medium">Conference Room A</div>
                <div className="text-muted-foreground text-sm">Capacity: 10 people</div>
              </div>
            </div>
            <button variant="outline" size="sm">
              Reserve
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">

              <div>
                <div className="font-medium">Brainstorming Room</div>
                <div className="text-muted-foreground text-sm">Capacity: 6 people</div>
              </div>
            </div>
            <button variant="outline" size="sm">
              Reserve
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">

              <div>
                <div className="font-medium">Training Room</div>
                <div className="text-muted-foreground text-sm">Capacity: 20 people</div>
              </div>
            </div>
            <button variant="outline" size="sm">
              Reserve
            </button>
          </div> */}
        </CardContent>
      </Card>
    </div>
    // <div>    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
    //   <div className="mb-4">
    //     <label className="block text-sm font-bold mb-2">맥주소</label>
    //     <input
    //       type="text"
    //       value={macAddress}
    //       onChange={(e) => setMacAddress(e.target.value)}
    //       className="w-full p-2 border border-gray-300 rounded"
    //       required
    //     />
    //   </div>
    //   <div className="mb-4">
    //     <label className="block text-sm font-bold mb-2">디바이스 이름</label>
    //     <input
    //       type="text"
    //       value={deviceName}
    //       onChange={(e) => setDeviceName(e.target.value)}
    //       className="w-full p-2 border border-gray-300 rounded"
    //       required
    //     />
    //   </div>

    //   <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg w-full">
    //     등록
    //   </button>
    // </form>
    // </div>

  );
};

export default DeviceForm;
