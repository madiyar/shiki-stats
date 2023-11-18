import dayjs from "dayjs";
import { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";
import { AxisOptions, Chart } from "react-charts";

const Charts: FunctionalComponent<{ data: any[] }> = ({ data }) => {
  const primaryAxis = useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => dayjs(datum.primary).format('DD MMM YY') as unknown as Date,
    }),
    []
  );

  const secondaryAxes = useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: 'line',
      },
    ],
    []
  );

  return (
    <div className="h-80 border border-zinc-700 rounded-lg p-3 ">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          dark: true,
        }}
      />
    </div>
  );
}

export default Charts;
