import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiFileText } from 'react-icons/fi';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const Sales = () => {
  const { data } = useApp();
  const { salesData } = data;
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Date', accessor: 'date' },
    { header: 'Type', accessor: 'type' },
    { header: 'Items', accessor: 'items' },
    { 
      header: 'Total', 
      render: (row) => <span className="font-semibold">${row.total.toFixed(2)}</span>
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Completed' ? 'bg-green-100 text-green-800' :
          row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  const totalSales = salesData.dailySales.reduce((sum, day) => sum + day.amount, 0);
  const totalOrders = salesData.dailySales.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalSales / totalOrders;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sales Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and analyze your sales performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon={<FiFileText />}>Generate Report</Button>
          <Button icon={<FiShoppingCart />}>New Order</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          color="blue"
          trend="up"
          trendValue="15.3%"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<FiShoppingCart size={24} />}
          color="green"
          trend="up"
          trendValue="8.1%"
        />
        <StatCard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          icon={<FiTrendingUp size={24} />}
          color="purple"
          trend="up"
          trendValue="5.2%"
        />
        <StatCard
          title="Pending Orders"
          value={salesData.orders.filter(o => o.status === 'Pending').length}
          icon={<FiShoppingCart size={24} />}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card title="Sales Trend">
          <div className="mb-4 flex space-x-2">
            {['daily', 'weekly', 'monthly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  selectedPeriod === period
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData.dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} name="Sales ($)" />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Products */}
        <Card title="Top Selling Products">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Orders Table */}
      <Card title="Recent Orders">
        <Table columns={orderColumns} data={salesData.orders} />
      </Card>

      {/* Top Products List */}
      <Card title="Product Performance">
        <div className="space-y-4">
          {salesData.topProducts.map((product, index) => (
            <div key={product.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">${product.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Sales;
