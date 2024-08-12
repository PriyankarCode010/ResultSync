// components/NivoPieChart.js
import { ResponsivePie } from '@nivo/pie';

const NivoPieChart = ({ data }) => {

    console.log("piechart",data)

  return (
    <div className="h-80 bg-slate-200 rounded-lg flex justify-center items-center">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabel={(e) => `${e.id}: ${e.value}`}
        radialLabelsTextColor="#333333"
        sliceLabel={(e) => e.id}
        slicesLabelsTextColor="#333333"
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            itemWidth: 100,
            itemHeight: 40,
            symbolSize: 18,
            symbolShape: 'circle',
          },
        ]}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#000', // Ensure axis text is visible
              },
            },
          },
          legends: {
            text: {
              fill: '#000', // Ensure legend text is visible
            },
          },
          tooltip: {
            container: {
              background: '#fff', // Ensure tooltip background is white
              color: '#000', // Ensure tooltip text is black
            },
          },
        }}
      />
    </div>
  );
};

export default NivoPieChart;
