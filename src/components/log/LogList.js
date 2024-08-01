import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from '@/components/ui/pagination';
import { FiAlignLeft } from "react-icons/fi";
import usePagination from '@/components/device/pagination';

// Function to convert timestamp to Korean time and format it
const formatKoreanTime = (timestamp) => {
  const date = new Date(timestamp);
  date.setHours(date.getHours() + 9);
  const formattedDate = date.toISOString().replace('T', ' ').replace(/\..+/, '');
  return formattedDate;
};

const LogList = ({ logList, setLogList }) => {
  const itemsPerPage = 10;
  const { nextPage, prevPage, jumpToPage, currentData, currentPage, maxPage } = usePagination(logList, itemsPerPage);

  return (
    <div className="grid gap-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle>로그 목록</CardTitle>
          <p className='text-sm text-muted-foreground'>최근 20개의 로그만 확인됩니다. </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Number</TableHead>
                <TableHead>LogName</TableHead>
                <TableHead className="hidden sm:table-cell">Log</TableHead>
                <TableHead className="hidden sm:table-cell">Creation Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData().map((log, i) => (
                <TableRow key={log.id}>
                  <TableCell className="hidden sm:table-cell">{i+1}</TableCell>
                  <TableCell>
                    <div className='flex'>
                      <div className="bg-secondary text-secondary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-2">
                        <FiAlignLeft  className="h-6 w-6" />
                      </div>
                      <div className='py-2 '>
                      {log.logName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{log.log}</TableCell>
                  <TableCell className="hidden sm:table-cell">{formatKoreanTime(log.created_at)}</TableCell>
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
