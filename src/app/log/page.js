'use client'
import dynamic from 'next/dynamic';
import axios from "axios";
import React, { useState, useEffect } from 'react';

const LogList = dynamic(() => import('@/components/log/LogList'), { ssr: false });
const Sidebar = dynamic(() => import("@/components/chart/Sidebar"), { ssr: false });


const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function LogPage() {
  const [logList, setLogList] = useState([]);

  const fetchLogs = () => {
    axios
      .get(`${BACKURL}/log/getLogList`, { cache: 'no-store' })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setLogList(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <header className="w-full flex items-center justify-between px-4 relative">
        <Sidebar />
        <h1 className="text-xl font-bold truncate header-content">로그 리스트</h1>
      </header>
      <main className="flex flex-col items-center w-full mt-4 p-4">
        <LogList logList={logList} setLogList={setLogList} />
      </main>
    </div>
  );
}
