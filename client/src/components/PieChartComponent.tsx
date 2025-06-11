import { useDashboardStore } from '@/store/useDashboardStore';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS =["#5f5", "#f11"]

const PieChartComponent = () => {

  const { summary, getDashboardSummary } = useDashboardStore();
  const [pieData, setPieData] = useState([]);

  const getMonthStartAndEnd = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed: 0 = Jan, 5 = June

    // Start of month
    const start = new Date(year, month, 1);

    // End of month
    const end = new Date(year, month + 1, 0); // 0 gives last day of previous month

    const format = (d: Date) =>
      d.toISOString().split('T')[0]; // YYYY-MM-DD format

    return {
      startDate: format(start),
      endDate: format(end),
    };
  };

  const { startDate:from, endDate:to } = getMonthStartAndEnd(new Date());

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = (_: any, index: number) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  useEffect(() => {
    getDashboardSummary(from, to);
  }, [])

  useEffect(() => {
    if(summary) {
      console.log(summary);
      setPieData(() => [
        {name:"Total Income", amount: summary.totalIncome},
        {name:"Total Expense", amount: summary.totalExpense}
      ]);
      console.log(pieData)
    }
  }, [summary])

  return (
    <>
    {summary && (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5f5" stopOpacity={0.2}/>
              <stop offset="100%" stopColor="#5f5" stopOpacity={1}/> 
            </linearGradient>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f00" stopOpacity={1} />
              <stop offset="100%" stopColor="#f00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Pie
            data={pieData}
            dataKey="amount"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={80}
            activeIndex={activeIndex ?? -1}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            isAnimationActive={true}
            animationDuration={300}
          >
            <Cell fill="url(#incomeGradient)" />
            <Cell fill="url(#expenseGradient)" />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>)
    }
    </>
  );
}

const renderActiveShape = (props: any) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload
  } = props;

  const RADIAN = Math.PI / 180;
  
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10} // Expand radius on hover
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, amount } = payload[0].payload;

    const textColor = name === "Total Income" ? "text-green-600" : "text-red-600";

    return (
      <div className="rounded-md bg-secondary p-2 shadow-md text-xs border border-gray-300">
        <p className="font-semibold text-primary">{name}</p>
        <p className={textColor}>Amount: ₹{amount}</p>
      </div>
    );
  }
  return null;
};

export default PieChartComponent;