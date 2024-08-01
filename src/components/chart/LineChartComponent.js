import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CartesianGrid, XAxis, YAxis, Line, LineChart, Tooltip } from "recharts";
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const LineChartComponent = ({ title, range, data, ...props }) => {
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
};

export default LineChartComponent;
