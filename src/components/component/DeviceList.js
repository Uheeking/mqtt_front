// components/DeviceList.js
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { TbDeviceDesktopAnalytics } from "react-icons/tb";

const DeviceList = ({ devices, onDelete }) => {
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
                <TableHead>Name/Type</TableHead>
                <TableHead className="hidden sm:table-cell">Mac Address</TableHead>
                <TableHead className="hidden sm:table-cell">Registration Date</TableHead>
                <TableHead className="text-right">DeleteDevice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">Grade 10</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">10</TableCell>
                <TableCell className="hidden sm:table-cell">A</TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => onDelete(index)}
                    className="px-4 py-2 bg-black text-white rounded-lg"
                  >
                    장치 삭제
                  </button>
                </TableCell>
              </TableRow>
              {devices.map((device, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{device.deviceName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">{device.deviceType}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{device.macAddress}</TableCell>
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
    // <ul className="list-disc pl-5">
    //   {devices.map((device, index) => (
    //     <li key={index} className="mb-2 flex justify-between items-center">
    //       <span>{device.deviceName} - {device.deviceType}</span>
    //       <button
    //         onClick={() => onDelete(index)}
    //         className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
    //       >
    //         삭제
    //       </button>
    //     </li>
    //   ))}
    // </ul>
  );
};

export default DeviceList;
