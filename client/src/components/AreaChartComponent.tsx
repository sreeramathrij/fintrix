import { useDashboardStore } from '@/store/useDashboardStore'
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts'

import React, { useEffect, useState } from 'react'


type RecordInput = {
  _id: string; // Date in "YYYY-MM-DD"
  income: number;
  expense: number;
};

type RecordOutput = {
  date: string; // e.g., "June 10"
  income: number;
  expense: number;
  dailyAmount: number;
};

const AreaChartComponent = () => {

  const { dailyTrends, getDailyTrends } = useDashboardStore();
  const [ chartData, setChartData ] = useState([]);

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear());

  const transformRecords = (records: RecordInput[]): RecordOutput[] => {
    return records.map((record) => {
      const dateObj = new Date(record._id);
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);

      return {
        date: formattedDate,
        income: record.income,
        expense: record.expense,
        dailyAmount: record.income - record.expense,
      };
    });
  };

  useEffect(() => {
      getDailyTrends(month, year);
      
  }, [getDailyTrends])

  useEffect(() => {
    if(dailyTrends) {
      setChartData(transformRecords(dailyTrends));
      console.log(chartData);
    }
  }, [dailyTrends])

  
  const gradientOffset = () => {
    const dataMax = Math.max(...chartData.map((i) => i.dailyAmount));
    const dataMin = Math.min(...chartData.map((i) => i.dailyAmount));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();


  return (
    <>
    {dailyTrends &&
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={400}
          height={250}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid opacity={0.2} stroke='#777' />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#55ff55" stopOpacity={0.2} />
              <stop offset={off} stopColor="#55ff55" stopOpacity={1} />
              <stop offset={off} stopColor="#f11" stopOpacity={1} />
              <stop offset="100%" stopColor="#f11" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="dailyAmount"
            stroke="#afb489"
            strokeWidth={1}
            fill="url(#splitColor)"
            dot={{ r: 2, strokeWidth: 1, fill: "#afb489" }}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    }
    </>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { income, expense } = payload[0].payload;

    return (
      <div className="rounded-md bg-secondary p-2 shadow-md text-xs border border-muted-foreground">
        <p className="font-bold text-primary">{label}</p>
        <p className="text-green-400">Income: ₹{income}</p>
        <p className="text-red-500">Expense: ₹{expense}</p>
      </div>
    );
  }

  return null;
};

export default AreaChartComponent