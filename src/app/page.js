"use client";
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip } from "recharts";
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import WarningMessage from '@/components/chart/WarningMessage';
import axios from "axios";
import '@/app/globals.css';
import { useEffect, useState } from 'react';

const BACKURL = process.env.NEXT_PUBLIC_BACKURL;

export default function Home() {
  const [chartDetails, setChartDetails] = useState([
    { title: "CO2 측정", range: "400-5,000ppm, 해상도 1ppm", data: [] },
    { title: "미세먼지 측정", range: "OuE/ 1m-5000u/mt", data: [] },
    { title: "온도측정", range: "-10°C~60°C, ±1°C", data: [] },
    { title: "습도측정", range: "20%~85% RH, ±4%RH", data: [] },
    { title: "조도측정", range: "0~200K Lux, 14%", data: [] },
  ]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${BACKURL}/getValues`, { headers: { 'Cache-Control': 'no-cache' } })
        .then((response) => {
          const newData = response.data;
          console.log(newData);

          // Map the received data to the chart details
          const updatedChartDetails = mapReceivedDataToChartDetails(newData);
          setChartDetails(updatedChartDetails);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Change this to 10000 for 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      <header className="w-full py-4 border-b flex items-center justify-between lg:justify-center px-4 relative">
        <h1 className="text-xl font-bold truncate">실내 모니터링</h1>
        <Link href="/device" legacyBehavior>
          <a className="px-4 py-2 bg-black text-white rounded-lg absolute right-1">디바이스 등록</a>
        </Link>
      </header>
      <main className="flex flex-wrap justify-center w-full gap-4 mt-4">
        {chartDetails.map((chart, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3">
            <LineChartComponent className="w-full aspect-[4/3]" title={chart.title} range={chart.range} data={chart.data} />
          </div>
        ))}
      </main>
    </div>
  );
}

// Helper function to map received data to chart details
function mapReceivedDataToChartDetails(receivedData) {
  const co2Data = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.co2) }));
  const dustData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.dust) }));
  const temperatureData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.temperature) }));
  const humidityData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.humidity) }));
  const illuminanceData = receivedData.map((item, index) => ({ index: index + 1, value: parseFloat(item.Illuminance) }));

  return [
    { title: "CO2 측정", range: "400-5,000ppm, 해상도 1ppm", data: co2Data },
    { title: "미세먼지 측정", range: "OuE/ 1m-5000u/mt", data: dustData },
    { title: "온도측정", range: "-10°C~60°C, ±1°C", data: temperatureData },
    { title: "습도측정", range: "20%~85% RH, ±4%RH", data: humidityData },
    { title: "조도측정", range: "0~200K Lux, 14%", data: illuminanceData },
  ];
}

function LineChartComponent({ title, range, data, ...props }) {
  return (
    <div {...props}>
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <CardTitle>
            {title} <br />
            <span className="text-sm font-normal">{range}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <LineChart
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="index"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `#${value}`}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
              <Line
                dataKey="value"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
