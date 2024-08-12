import { ResponsiveBar } from '@nivo/bar';

const NivoBarChartReport = ({ data }) => {
  // Log the data to inspect its structure
  console.log('Bar Chart Data:', data);

  return (
    <div className='h-80 p-3 bg-slate-200 rounded-lg flex justify-center items-center'>
      <ResponsiveBar
        data={data}
        keys={['count']}
        indexBy="classification"
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Classification',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Students',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: '#000'
              }
            }
          },
          legends: {
            text: {
              fill: '#000'
            }
          },
          tooltip: {
            container: {
              background: '#fff',
              color: '#000'
            }
          }
        }}
      />
    </div>
  );
};

export default NivoBarChartReport;
