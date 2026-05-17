import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import type { Lead } from "../types/lead";
interface Props {
  data?: Lead[];
}

function LeadChart({ data = [] }: Props) {
  const chartData = [
    {
      name: "Qualified",
      value: data.filter((lead) => lead.status === "Qualified").length,
    },

    {
      name: "Contacted",
      value: data.filter((lead) => lead.status === "Contacted").length,
    },

    {
      name: "Lost",
      value: data.filter((lead) => lead.status === "Lost").length,
    },

    {
      name: "New",
      value: data.filter((lead) => lead.status === "New").length,
    },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#eab308"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">Lead Analytics</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LeadChart;
