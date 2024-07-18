/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/271A79dJ3zL
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"

export function Component() {
  return (
    (<div className="flex flex-col items-center w-full min-h-screen p-4">
      <header className="w-full py-4 text-center border-b">
        <h1 className="text-xl font-bold">Hello world</h1>
      </header>
      <main className="flex flex-wrap justify-center w-full gap-4 mt-4">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <LinechartChart className="w-full aspect-[4/3]" />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <LinechartChart className="w-full aspect-[4/3]" />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <LinechartChart className="w-full aspect-[4/3]" />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <LinechartChart className="w-full aspect-[4/3]" />
        </div>
      </main>
    </div>)
  );
}

function LinechartChart(props) {
  return (
    (<div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}>
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false} />
        </LineChart>
      </ChartContainer>
    </div>)
  );
}
