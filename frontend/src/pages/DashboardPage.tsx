import { useMemo, useState } from "react";

import debounce from "lodash/debounce";

import { CSVLink } from "react-csv";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

import { useThemeStore } from "../store/themeStore";

interface Lead {
  id: number;

  name: string;

  email: string;

  status: string;

  source: string;
}

function DashboardPage() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const darkMode = useThemeStore((state) => state.darkMode);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: "Rahul",
      email: "rahul@gmail.com",
      status: "New",
      source: "Website",
    },

    {
      id: 2,
      name: "Priya",
      email: "priya@gmail.com",
      status: "Qualified",
      source: "Instagram",
    },

    {
      id: 3,
      name: "Aman",
      email: "aman@gmail.com",
      status: "Contacted",
      source: "Referral",
    },
  ]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [source, setSource] = useState("Website");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [page, setPage] = useState(1);

  const limit = 5;

  // LOGOUT
  const handleLogout = () => {
    logout();

    navigate("/");
  };

  // CREATE
  const handleCreateLead = () => {
    if (!name || !email) {
      alert("All fields required");

      return;
    }

    const newLead = {
      id: Date.now(),

      name,

      email,

      status: "New",

      source,
    };

    setLeads([newLead, ...leads]);

    setName("");

    setEmail("");

    setSource("Website");
  };

  // DELETE
  const handleDelete = (id: number) => {
    const filtered = leads.filter((lead) => lead.id !== id);

    setLeads(filtered);
  };

  // UPDATE
  const handleUpdateStatus = (id: number) => {
    const updated = leads.map((lead) => {
      if (lead.id === id) {
        let newStatus = "Lost";

        if (lead.status === "New") {
          newStatus = "Contacted";
        } else if (lead.status === "Contacted") {
          newStatus = "Qualified";
        }

        return {
          ...lead,
          status: newStatus,
        };
      }

      return lead;
    });

    setLeads(updated);
  };

  // SEARCH
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500),
    []
  );

  // FILTERS
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter ? lead.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredLeads.length / limit);

  const paginatedLeads = filteredLeads.slice((page - 1) * limit, page * limit);

  // CHART DATA
  const chartData = [
    {
      name: "New",
      value: leads.filter((lead) => lead.status === "New").length,
    },

    {
      name: "Contacted",
      value: leads.filter((lead) => lead.status === "Contacted").length,
    },

    {
      name: "Qualified",
      value: leads.filter((lead) => lead.status === "Qualified").length,
    },

    {
      name: "Lost",
      value: leads.filter((lead) => lead.status === "Lost").length,
    },
  ];

  const COLORS = ["#eab308", "#3b82f6", "#22c55e", "#ef4444"];

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-black"
      }`}
    >
      {/* HEADER */}
      <div
        className={`shadow px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 ${
          darkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div>
          <h1 className="text-4xl font-bold">Smart Leads Dashboard</h1>

          <p
            className={`mt-2 ${darkMode ? "text-slate-300" : "text-slate-500"}`}
          >
            MERN Internship Assignment
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={toggleTheme}
            className="bg-black text-white px-6 py-3 rounded-xl"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <CSVLink
            data={leads}
            filename="leads.csv"
            className="bg-green-500 text-white px-6 py-3 rounded-xl"
          >
            Export CSV
          </CSVLink>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-10">
        {/* USER CARD */}
        <div
          className={`p-8 rounded-2xl shadow mb-8 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h2>

          <div className="space-y-2 text-lg">
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>

            <p>
              <span className="font-semibold">Role:</span> {user?.role}
            </p>
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className={`p-8 rounded-2xl shadow ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3>Total Leads</h3>
            <p className="text-5xl font-bold mt-4">{leads.length}</p>
          </div>

          <div
            className={`p-8 rounded-2xl shadow ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3>Qualified</h3>
            <p className="text-5xl font-bold text-green-500 mt-4">
              {chartData[2].value}
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl shadow ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3>Contacted</h3>
            <p className="text-5xl font-bold text-blue-500 mt-4">
              {chartData[1].value}
            </p>
          </div>

          <div
            className={`p-8 rounded-2xl shadow ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3>Lost</h3>
            <p className="text-5xl font-bold text-red-500 mt-4">
              {chartData[3].value}
            </p>
          </div>
        </div>

        {/* CHART */}
        <div
          className={`p-8 rounded-2xl shadow mb-8 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <h2 className="text-3xl font-bold mb-8">Lead Analytics</h2>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={140}
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

        {/* CREATE FORM */}
        <div
          className={`p-8 rounded-2xl shadow mb-8 ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">Create Lead</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-4 rounded-xl text-black"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-4 rounded-xl text-black"
            />

            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="border p-4 rounded-xl text-black"
            >
              <option>Website</option>

              <option>Instagram</option>

              <option>Referral</option>
            </select>

            <button
              onClick={handleCreateLead}
              className="bg-black text-white rounded-xl"
            >
              Add Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
