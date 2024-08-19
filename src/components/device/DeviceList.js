import React, { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import usePagination from './pagination';

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

// Function to convert timestamp to Korean time and format it
const formatKoreanTime = (timestamp) => {
  const date = new Date(timestamp);
  date.setHours(date.getHours() + 9);
  const formattedDate = date.toISOString().replace('T', ' ').replace(/\..+/, '');
  return formattedDate;
};

const DeviceList = ({ devices, setDevices }) => {
  const [editingDevice, setEditingDevice] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const itemsPerPage = 10;
  const { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage } = usePagination(devices, itemsPerPage);

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
                <TableHead>번호</TableHead> {/* Index column header */}
                <TableHead>메인 디바이스 이름</TableHead>
                <TableHead>디바이스 이름</TableHead>
                <TableHead>현재 알람 상태</TableHead>
                <TableHead>밸브 상태</TableHead>
                <TableHead>밸브 고착</TableHead>
                <TableHead>밸브 누수</TableHead>
                <TableHead className="text-right">알람 무시 상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData().map((device, index) => (
                <TableRow key={device.DEV_ID}> 
                  <TableCell>{index + 1}</TableCell> 
                  <TableCell>{device.MAIN_DEVICE}</TableCell>
                  <TableCell>
                    <div className='flex'>
                      <div className="bg-secondary text-secondary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-2">
                        <TbDeviceDesktopAnalytics className="h-6 w-6" />
                      </div>
                      <div>
                        {editingDevice === device.DEV_ID ? (
                          <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="font-medium">
                            {device.DEV_ID}
                            <p className='text-muted-foreground'>sensor</p>
                          </div>
                        )}
                        <div className="hidden text-sm text-muted-foreground md:inline">{device.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{device.ALARM_STAT}</TableCell>
                  <TableCell>{device.V_STAT}</TableCell>
                  <TableCell>{device.V_STUCK}</TableCell>
                  <TableCell>{device.V_LEAK}</TableCell>
                  <TableCell className="text-right">{device.SEN_IGN_STAT}</TableCell>
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
