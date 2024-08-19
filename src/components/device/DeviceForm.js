import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const DeviceForm = ({ fetchDevices }) => {
  const [formValues, setFormValues] = useState({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACKURL}/device/postCreateDevice`, formValues, {
        headers: { 'Cache-Control': 'no-cache' },
    })
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 groupBg">
              {formFields.slice(0, 2).map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-sm font-bold mb-2">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formValues[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded radius"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Grouping fields into logical sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 groupBg">
              <div>
                <h3 className="text-lg font-semibold mb-2">밸브 설정</h3>
                {formFields.slice(2, 6).map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="block text-sm font-bold mb-2">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded radius"
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">온도 및 알람</h3>
                {formFields.slice(6, 9).map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="block text-sm font-bold mb-2">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded radius"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* The rest of the form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 groupBg">
              {formFields.slice(9).map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-sm font-bold mb-2">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formValues[field.name]}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded radius"
                    required
                  />
                </div>
              ))}
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
