"use client";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip } from "recharts";
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart";

export default function Home() {
  // Updated chart details with measurement ranges and specific data for each chart
  const chartDetails = [
    { title: "CO2 측정", range: "400-5,000ppm, 해상도 1ppm", data: generateData(400, 5000, 6) },
    { title: "미세먼지 측정", range: "OuE/ 1m-5000u/mt", data: generateData(1, 5000, 6) },
    { title: "온도측정", range: "-10°C~60°C, ±1°C", data: generateData(-10, 60, 6) },
    { title: "습도측정", range: "20%~85% RH, ±4%RH", data: generateData(20, 85, 6) },
    { title: "조도측정", range: "0~200K Lux, 14%", data: generateData(0, 200000, 6) },
  ];


  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
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

// Helper function to generate sample data within a range
function generateData(min, max, count) {
  return Array.from({ length: count }, (_, i) => ({
    index: i + 1,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));
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
