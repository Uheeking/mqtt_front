// components/DeviceList.js
import React from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import usePagination from './pagination';

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

// Function to convert timestamp to Korean time and format it
const formatKoreanTime = (timestamp) => {
  const date = new Date(timestamp);
  // Add 9 hours to the date
  date.setHours(date.getHours() + 9);
  // Format the date to a readable string, e.g., "YYYY-MM-DD HH:MM:SS"
  const formattedDate = date.toISOString().replace('T', ' ').replace(/\..+/, '');
  return formattedDate;
};

const DeviceList = ({ devices, setDevices }) => {
  const itemsPerPage = 10;
  const { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage } = usePagination(devices, itemsPerPage);

  const handleDelete = async (deviceId) => {
    try {
      await axios.delete(`${BACKURL}/deleteDevice/${deviceId}`);
      setDevices((prevDevices) => prevDevices.filter((device) => device.id !== deviceId));
      alert('기기가 삭제되었습니다.');
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

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
              {currentData().map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="hidden sm:table-cell">{device.id}</TableCell>
                  <TableCell>
                    <div className='flex'>
                      <div className="bg-secondary text-secondary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-2">
                        <TbDeviceDesktopAnalytics className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium">{device.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">{device.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{device.macAddress}</TableCell>
                  <TableCell className="hidden sm:table-cell">{formatKoreanTime(device.registrationDate)}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDelete(device.id)}
                      className="px-4 py-2 bg-black text-white rounded-lg"
                    >
                      장치 삭제
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={prevPage} disabled={currentPage === 1} />
                </PaginationItem>
                {Array.from({ length: maxPage }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => jumpToPage(index + 1)}
                      className={currentPage === index + 1 ? 'isActive' : ''}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" onClick={nextPage} disabled={currentPage === maxPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceList;
