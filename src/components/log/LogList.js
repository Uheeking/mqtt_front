import React, { useState } from 'react';
import { FiAlignLeft } from "react-icons/fi";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import usePagination from '@/components/device/pagination';

// Function to convert timestamp to Korean time and format it
const formatKoreanTime = (timestamp) => {
  const date = new Date(timestamp);
  date.setHours(date.getHours() + 9);
  const formattedDate = date.toISOString().replace('T', ' ').replace(/\..+/, '');
  return formattedDate;
};

const LogList = ({ logList, setLogList }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const itemsPerPage = 10;

  // Handle change event on the select menu
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter logs based on the selected category
  const filteredLogs = selectedCategory
    ? logList.filter(log => log.logName === selectedCategory)
    : logList;

    console.log(filteredLogs);
    
  const { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage } = usePagination(filteredLogs, itemsPerPage);

  return (
    <div className="grid gap-4 w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div>
              <CardTitle>로그 목록</CardTitle>
              <p className='text-sm text-muted-foreground'>최근 20개의 로그만 확인됩니다.</p>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                <option value="TEMPR_1">TEMPR_1</option>
                <option value="TEMPR_2">TEMPR_2</option>
                <option value="W_PRES">W_PRES</option>
                <option value="AC_CURR">AC_CURR</option>
                <option value="WATER_PRESSURE">WATER_PRESSURE</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>LogName</TableHead>
                <TableHead>Log</TableHead>
                <TableHead>Creation Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData().map((log, i) => (
                <TableRow key={log.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <div className='flex'>
                      <div className="bg-secondary text-secondary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-2">
                        <FiAlignLeft className="h-6 w-6" />
                      </div>
                      <div className='py-2'>
                        {log.logName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{log.log}</TableCell>
                  <TableCell>{formatKoreanTime(log.created_at)}</TableCell>
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

export default LogList;
