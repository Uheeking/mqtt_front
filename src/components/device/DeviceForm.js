import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const DeviceForm = ({ fetchDevices }) => {
  const [deviceName, setDeviceName] = useState('');
  const [macAddress, setMacAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKURL}/postcreateDevice`, { name: deviceName, macAddress }, { headers: { 'Cache-Control': 'no-cache' } })
      .then((response) => {
        console.log(response.data);
        fetchDevices();
        if (response.data.status === 'success') {
          alert('등록이 완료되었습니다.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Clear form after submission
    setFormValues({
      deviceName: '',
      macAddress: '',
      valveOffTime: '',
      valveOnTime: '',
      valveCurrent: '',
      valveTemperature: '',
      emergencyTemperature: '',
      minOperatingTemperature: '',
      alarmLevel: '',
      sensorIgnoreSetting: '',
      transmissionInterval: '',
      highPressureLimit: '',
      lowPressureLimit: '',
    });
  };

  const formFields = [
    { name: 'deviceName', label: '디바이스 이름' },
    { name: 'macAddress', label: '맥주소' },
    { name: 'valveOffTime', label: '밸브 꺼짐 시간' },
    { name: 'valveOnTime', label: '밸브 켜짐 시간' },
    { name: 'valveCurrent', label: '밸브 동작 전류' },
    { name: 'valveTemperature', label: '밸브 동작 온도' },
    { name: 'emergencyTemperature', label: '비상 온도' },
    { name: 'minOperatingTemperature', label: '최소 작동 온도' },
    { name: 'alarmLevel', label: '알람 레벨' },
    { name: 'sensorIgnoreSetting', label: '센서 무시 설정' },
    { name: 'transmissionInterval', label: '전송 주기' },
    { name: 'highPressureLimit', label: '수압 높음 기준' },
    { name: 'lowPressureLimit', label: '수압 낮음 기준' },
  ];

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
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceForm;
