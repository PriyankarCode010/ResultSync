// Components/NivoBarChart.js
import { ResponsiveBar } from '@nivo/bar';

const NivoBarChart = ({ data }) => (
  <div className="h-80 bg-slate-500 p-4 rounded-lg">
    <ResponsiveBar
      data={data}
      keys={['mark']}
      indexBy="subject"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Subject',
        legendPosition: 'middle',
        legendOffset: 32,
        tickTextColor: '#fff', // For dark theme
        legendTextColor: '#fff', // For dark theme
        legendFontSize: 14, // Increase the size of the legend
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Marks',
        legendPosition: 'middle',
        legendOffset: -40,
        tickTextColor: '#fff', // For dark theme
        legendTextColor: '#fff', // For dark theme
        legendFontSize: 14, // Increase the size of the legend
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      // legends={[
      //   {
      //     dataFrom: 'keys',
      //     anchor: 'bottom-right',
      //     direction: 'column',
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: 'left-to-right',
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: 'hover',
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: '#fff', // Ensure axis text is visible in dark theme
              fontSize: 14, // Increase the size of the axis text
            },
          },
          legend: {
            text: {
              fill: '#fff', // Ensure legend text is visible in dark theme
              fontSize: 16, // Increase the size of the legend text
            },
          },
        },
        legends: {
          text: {
            fill: '#fff', // Ensure legend text is visible in dark theme
            fontSize: 14, // Increase the size of the legend text
          },
        },
        tooltip: {
          container: {
            background: '#333', // Dark tooltip background
            color: '#fff', // Tooltip text color
          },
        },
      }}
    />
  </div>
);

export default NivoBarChart;
