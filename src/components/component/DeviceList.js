// components/DeviceList.js
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKURL}/getDevice`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setDevices(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="grid gap-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle>디바이스 목록</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Number</TableHead>
                <TableHead>Name/Type</TableHead>
                <TableHead className="hidden sm:table-cell">Mac Address</TableHead>
                <TableHead className="hidden sm:table-cell">Registration Date</TableHead>
                <TableHead className="text-right">DeleteDevice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">{device.id}</TableCell>
                  <TableCell>
                    <div className='flex'>
                      <div className="bg-secondary text-secondary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-2">
                        <TbDeviceDesktopAnalytics className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">{device.type}</div></div></div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{device.macAddress}</TableCell>
                  <TableCell className="hidden sm:table-cell">{device.registrationDate}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => onDelete(index)}
                      className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                      장치 삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>

  );
};

export default DeviceList;
