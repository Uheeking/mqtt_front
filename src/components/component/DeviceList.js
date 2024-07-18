// components/DeviceList.js
import React from 'react';

const DeviceList = ({ devices, onDelete }) => {
  return (
    <ul className="list-disc pl-5">
      {devices.map((device, index) => (
        <li key={index} className="mb-2 flex justify-between items-center">
          <span>{device.deviceName} - {device.deviceType}</span>
          <button
            onClick={() => onDelete(index)}
            className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DeviceList;
