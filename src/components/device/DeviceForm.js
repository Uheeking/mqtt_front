import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const DeviceForm = ({ fetchDevices }) => {
  const [deviceName, setDeviceName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKURL}/device/postCreateDevice`, { name: deviceName }, { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        const newDevice = response.data;
        console.log(newDevice);
        fetchDevices();
        alert('등록이 완료되었습니다.');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceForm;
