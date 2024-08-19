import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { TbDeviceDesktopAnalytics } from 'react-icons/tb';
import usePagination from './pagination';

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

const DeviceList = ({ devices, onUpdateClick, pointedId }) => {
    const [editingDevice, setEditingDevice] = useState(null);
    const [updatedName, setUpdatedName] = useState('');

    const itemsPerPage = 10;
    const { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage } = usePagination(devices, itemsPerPage);

    const handleEdit = (device) => {
        setEditingDevice(device.DEV_ID);
        setUpdatedName(device.DEV_NAME); // Initialize with the current name
    };

    const handleSave = async (id) => {
        try {
            const payload = {
                name: updatedName, // or any other field you want to update
            };
            const response = await axios.put(`${BACKURL}/device/putUpdateDevice/${id}`, payload, { headers: { 'Content-Type': 'application/json' } });

            console.log('Device updated:', response.data);

            // Reset the editing state
            setEditingDevice(null);
            setUpdatedName('');

            if(response.status){
                alert('성공적으로 수정되었습니다!')
            }

            // Optionally, update the device list or fetch the devices again
            onUpdateClick(); // Uncomment if you want to refetch the devices list
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
                                <TableHead>디바이스 이름 / MAC주소</TableHead>
                                <TableHead>밸브 꺼짐 시간</TableHead>
                                <TableHead>밸브 켜짐 시간</TableHead>
                                <TableHead>밸브 동작 전류</TableHead>
                                <TableHead>밸브 동작 온도</TableHead>
                                <TableHead>비상 온도</TableHead>
                                <TableHead>최소 작동 온도</TableHead>
                                <TableHead>알람 레벨</TableHead>
                                <TableHead>센서 무시 설정</TableHead>
                                <TableHead>전송 주기(sec)</TableHead>
                                <TableHead>수압 높음 기준</TableHead>
                                <TableHead>수압 낮음 기준</TableHead>
                                <TableHead className="text-center">버튼</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData().map((device) => {
                                // Parse the comma-separated string to an array
                                const offTimeParts = device.OFF_T.replace(/[\[\]"]+/g, '').split(',');
                                const onTimeParts = device.ON_T.replace(/[\[\]"]+/g, '').split(',');

                                // Get the specific element based on DEV_NO
                                const offTimeValue = offTimeParts[device.DEV_NO] || 'N/A'; // Default to 'N/A' if index is out of bounds
                                const onTimeValue = onTimeParts[device.DEV_NO] || 'N/A'; // Default to 'N/A' if index is out of bounds

                                return (
                                    <TableRow key={device.DEV_ID} className={device.ID === pointedId ? 'isActive' : 'bg-white'}>
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
                                                            {device.DEV_NAME}
                                                            <p className='text-muted-foreground'>{device.DEV_ID}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Display specific element from OFF_T and ON_T based on DEV_NO */}
                                        <TableCell>{offTimeValue}</TableCell>
                                        <TableCell>{onTimeValue}</TableCell>

                                        <TableCell>{device.CURR_THR}</TableCell>
                                        <TableCell>{device.TEMPR_THR}</TableCell>
                                        <TableCell>{device.TEMPR_OVR}</TableCell>
                                        <TableCell>{device.TEMPR_MIN}</TableCell>
                                        <TableCell>{device.ALARM_LVL}</TableCell>
                                        <TableCell>{device.SEN_IGN}</TableCell>
                                        <TableCell>{device.PERIOD}</TableCell>
                                        <TableCell>{device.PRESS_HIGH}</TableCell>
                                        <TableCell>{device.PRESS_LOW}</TableCell>
                                        <TableCell>
                                            <div className='flex'>
                                            {editingDevice === device.DEV_ID ? (
                                                <button
                                                    onClick={() => handleSave(device.ID)}
                                                    className="bg-black text-white px-4 py-2 rounded mr-2"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(device)}
                                                    className="bg-black text-white px-4 py-2 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setEditingDevice(null)}
                                                className="bg-black text-white px-4 py-2 rounded"
                                            >
                                                Cancel
                                            </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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
