import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar,
    XAxis, YAxis,
    Tooltip, Legend,
    ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell,
    LineChart, Line,
    AreaChart, Area,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    RadialBarChart, RadialBar
} from 'recharts';
import axios from 'axios';

const COLORS = [
    '#36A2EB', '#FF6384', '#FFCE56',
    '#4BC0C0', '#9966FF', '#FF9F40', '#00D084'
];

const chartTypes = ['Bar', 'Pie', 'Line', 'Area', 'Radar', 'RadialBar'];

const ProductStockChart = () => {
    const [stockData, setStockData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartType, setChartType] = useState('Bar');

    useEffect(() => {
        async function fetchStockData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/stock`);
                if (response?.data?.success) {
                    setStockData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching stock data", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchStockData();
    }, []);

    const renderChart = () => {
        switch (chartType) {
            case 'Bar':
                return (
                    <BarChart data={stockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalStock">
                            {stockData.map((_, index) => (
                                <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                );

            case 'Pie':
                return (
                    <PieChart>
                        <Pie
                            data={stockData}
                            dataKey="totalStock"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {stockData.map((_, index) => (
                                <Cell key={`pie-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                );

            case 'Line':
                return (
                    <LineChart data={stockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totalStock" stroke="#36A2EB" strokeWidth={3} />
                    </LineChart>
                );

            case 'Area':
                return (
                    <AreaChart data={stockData}>
                        <defs>
                            <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#36A2EB" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#36A2EB" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="totalStock" stroke="#36A2EB" fillOpacity={1} fill="url(#colorStock)" />
                    </AreaChart>
                );

            case 'Radar':
                return (
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stockData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis />
                        <Radar name="Stock" dataKey="totalStock" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                        <Legend />
                    </RadarChart>
                );

            case 'RadialBar':
                return (
                    <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="100%" barSize={10} data={stockData}>
                        <RadialBar
                            minAngle={15}
                            label={{ position: 'insideStart', fill: '#fff' }}
                            background
                            clockWise
                            dataKey="totalStock"
                        >
                            {stockData.map((_, index) => (
                                <Cell key={`radial-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </RadialBar>
                        <Tooltip />
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                    </RadialBarChart>
                );

            default:
                return null;
        }
    };

    return (
        <div className="w-full h-[500px] p-4 bg-white shadow-md rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Stock by Category</h2>
                <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                    {chartTypes.map(type => (
                        <option key={type} value={type}>{type} Chart</option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ProductStockChart;
