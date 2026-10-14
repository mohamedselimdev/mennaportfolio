"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function TrendChart({ data }: { data: { m: string; visits: number; leads: number }[] }) {
  return (
    <div className="h-64" role="img" aria-label="رسم بياني للزيارات والعملاء المحتملين (بيانات تجريبية)">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid stroke="#E9E5DD" vertical={false} />
          <XAxis dataKey="m" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} orientation="right" />
          <Tooltip />
          <Area dataKey="visits" name="الزيارات" stroke="#0B2B25" fill="#0B2B25" fillOpacity={0.25} />
          <Area dataKey="leads" name="العملاء المحتملون" stroke="#AD8453" fill="#C9A778" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
