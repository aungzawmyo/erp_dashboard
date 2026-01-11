import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDollarSign, FiTrendingUp, FiPackage, FiShoppingCart } from 'react-icons/fi';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import { useApp } from '../context/AppContext';

const Overview = () => {
  const { data } = useApp();
  const { overviewData, salesData, financeData } = data;

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Overview Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value={`$${overviewData.metrics.totalSales.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          color="blue"
          trend="up"
          trendValue="12.5%"
        />
        <StatCard
          title="Total Expenses"
          value={`$${overviewData.metrics.totalExpenses.toLocaleString()}`}
          icon={<FiTrendingUp size={24} />}
          color="red"
          trend="up"
          trendValue="8.2%"
        />
        <StatCard
          title="Profit Margin"
          value={`${overviewData.metrics.profitMargin}%`}
          icon={<FiTrendingUp size={24} />}
          color="green"
          trend="up"
          trendValue="4.1%"
        />
        <StatCard
          title="Inventory Value"
          value={`$${overviewData.metrics.inventoryValue.toLocaleString()}`}
          icon={<FiPackage size={24} />}
          color="purple"
        />
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Orders"
          value={overviewData.todayStats.orders}
          icon={<FiShoppingCart size={24} />}
          color="primary"
        />
        <StatCard
          title="Today's Revenue"
          value={`$${overviewData.todayStats.revenue.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          color="green"
        />
        <StatCard
          title="Pending Orders"
          value={overviewData.todayStats.pendingOrders}
          icon={<FiShoppingCart size={24} />}
          color="yellow"
        />
        <StatCard
          title="Low Stock Alerts"
          value={overviewData.todayStats.lowStockAlerts}
          icon={<FiPackage size={24} />}
          color="red"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card title="Sales Trend (Last 7 Days)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData.dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue vs Expenses */}
        <Card title="Revenue vs Expenses">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financeData.income.map((item, index) => ({
              month: item.month,
              income: item.amount,
              expenses: financeData.expenses[index].amount,
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" />
              <Bar dataKey="expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Selling Items */}
        <Card title="Top Selling Items">
          <div className="space-y-4">
            {salesData.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-400">{index + 1}</span>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <span className="font-semibold text-green-600">${product.revenue}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Expense Distribution */}
        <Card title="Expense Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={financeData.expenseCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {financeData.expenseCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          {overviewData.recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
              <div className={`w-2 h-2 mt-2 rounded-full ${
                activity.type === 'order' ? 'bg-blue-500' :
                activity.type === 'payment' ? 'bg-green-500' :
                activity.type === 'stock' ? 'bg-red-500' :
                'bg-yellow-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Overview;
