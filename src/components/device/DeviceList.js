import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
const usePagination = dynamic(() => import("@/components/device/pagination"));

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const DeviceList = ({ devices, setDevices }) => {
  const [editingDevice, setEditingDevice] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const itemsPerPage = 10;
  const { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage } = usePagination(devices, itemsPerPage);

  const handleDelete = async (deviceId) => {
    try {
      const result = confirm('정말로 삭제하시겠습니까?')
      if (result === true) {
        await axios.delete(`${BACKURL}/device/deleteDevice/${deviceId}`);
        setDevices((prevDevices) => prevDevices.filter((device) => device.id !== deviceId));
        alert('기기가 삭제되었습니다.');
      } else {
        alert('기기가 삭제되지 않았습니다. ')
      }

    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleEdit = (device) => {
    setEditingDevice(device.id);
    setUpdatedName(device.name);
  };

  const handleSave = async (deviceId) => {
    try {
      await axios.put(`${BACKURL}/device/putUpdateDevice/${deviceId}`, {
        name: updatedName
      });
      setDevices((prevDevices) => prevDevices.map((device) =>
        device.id === deviceId ? { ...device, name: updatedName } : device
      ));
      setEditingDevice(null);
      alert('기기가 업데이트되었습니다.');
    } catch (error) {
      console.error("Error updating device:", error);
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
                <TableHead>번호</TableHead>
                <TableHead>디바이스 ID</TableHead>
                <TableHead className="text-center">동작 전류</TableHead>
                <TableHead className="text-center">동작 온도</TableHead>
                <TableHead className="text-center">비상 온도</TableHead>
                <TableHead className="text-center">최소 작동 온도</TableHead>
                <TableHead className="text-center">알람 레벨</TableHead>
                <TableHead className="text-center">센서 무시 설정</TableHead>
                <TableHead className="text-right">전송 주기(sec)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData().map((device) => (
                <TableRow key={device.ID}>
                  <TableCell>{device.ID}</TableCell>
                  <TableCell>
                    <div className='flex'>
                      <div className="bg-secondary text-secondary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-2">
                        <TbDeviceDesktopAnalytics className="h-6 w-6" />
                      </div>
                        {editingDevice === device.id ? (
                          <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                        ) : (
                          <div className="font-medium py-3">{device.DEV_ID}</div>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{device.CURR_THR}</TableCell>
                  <TableCell className="text-center">{device.TEMPR_THR}</TableCell>
                  <TableCell className="text-center">{device.TEMPR_OVR}</TableCell>
                  <TableCell className="text-center">{device.TEMPR_MIN}</TableCell>
                  <TableCell className="text-center">{device.ALARM_LVL}</TableCell>
                  <TableCell className="text-center">{device.SEN_IGN}</TableCell>
                  <TableCell className="text-right">{device.PERIOD}</TableCell>
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
