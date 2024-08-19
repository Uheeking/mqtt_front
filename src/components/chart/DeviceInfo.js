// components/chart/DeviceInfo.js

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DeviceInfo = ({ data, deviceInfo }) => {
  return (
    <Card className="w-full md:w-1/2 lg:w-1/3 mx-4">
      <CardHeader>
        <CardTitle>Device Data</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>디바이스 ID: {deviceInfo.DEV_ID}</li>
          <li>현재 상태: {data?.RUN_STAT}</li>
          <li>현재 알람 상태: {deviceInfo.ALARM_STAT}</li>
          <li>밸브 상태: {deviceInfo.V_STAT}</li>
          <li>밸브 고착: {deviceInfo.V_STUCK}</li>
          <li>밸브 누수: {deviceInfo.V_LEAK}</li>
          <li>알람 무시 상태: {deviceInfo.SEN_IGN_STAT}</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default DeviceInfo;
