// components/DeviceForm.js
import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Device Name</label>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Device Type</label>
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
  );
};

export default DeviceForm;
