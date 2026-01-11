import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart } from 'react-icons/fi';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const Finance = () => {
  const { data } = useApp();
  const { financeData } = data;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const totalIncome = financeData.income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = financeData.expenses.reduce((sum, item) => sum + item.amount, 0);
  const profit = totalIncome - totalExpenses;
  const profitMargin = ((profit / totalIncome) * 100).toFixed(1);

  const incomeVsExpense = financeData.income.map((item, index) => ({
    month: item.month,
    income: item.amount,
    expenses: financeData.expenses[index].amount,
    profit: item.amount - financeData.expenses[index].amount,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Finance Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor your financial performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">Export Report</Button>
          <Button>Add Transaction</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          color="green"
          trend="up"
          trendValue="12.5%"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          icon={<FiTrendingDown size={24} />}
          color="red"
          trend="up"
          trendValue="8.2%"
        />
        <StatCard
          title="Net Profit"
          value={`$${profit.toLocaleString()}`}
          icon={<FiTrendingUp size={24} />}
          color="blue"
          trend="up"
          trendValue="18.7%"
        />
        <StatCard
          title="Profit Margin"
          value={`${profitMargin}%`}
          icon={<FiPieChart size={24} />}
          color="purple"
        />
      </div>

      {/* Cash Flow Summary */}
      <Card title="Cash Flow Summary">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Opening Balance</p>
            <p className="text-2xl font-bold mt-2">${financeData.cashFlow.opening.toLocaleString()}</p>
          </div>
          <div className="text-center p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Inflow</p>
            <p className="text-2xl font-bold mt-2 text-green-600">+${financeData.cashFlow.inflow.toLocaleString()}</p>
          </div>
          <div className="text-center p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Outflow</p>
            <p className="text-2xl font-bold mt-2 text-red-600">-${financeData.cashFlow.outflow.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Closing Balance</p>
            <p className="text-2xl font-bold mt-2 text-blue-600">${financeData.cashFlow.closing.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses */}
        <Card title="Income vs Expenses Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incomeVsExpense}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Profit Trend */}
        <Card title="Profit Trend">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeVsExpense}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#3b82f6" name="Profit ($)" />
            </BarChart>
          </ResponsiveContainer>
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
                label={({ category, percentage }) => `${category} ${percentage}%`}
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

        {/* Expense Breakdown */}
        <Card title="Expense Breakdown">
          <div className="space-y-4">
            {financeData.expenseCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{category.category}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ${category.amount.toLocaleString()} ({category.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* P&L Statement */}
      <Card title="Profit & Loss Statement (Last 6 Months)">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="table-header">Month</th>
                <th className="table-header">Income</th>
                <th className="table-header">Expenses</th>
                <th className="table-header">Profit</th>
                <th className="table-header">Margin</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {incomeVsExpense.map((row, index) => {
                const margin = ((row.profit / row.income) * 100).toFixed(1);
                return (
                  <tr key={index}>
                    <td className="table-cell font-medium">{row.month}</td>
                    <td className="table-cell text-green-600">${row.income.toLocaleString()}</td>
                    <td className="table-cell text-red-600">${row.expenses.toLocaleString()}</td>
                    <td className="table-cell font-semibold">${row.profit.toLocaleString()}</td>
                    <td className="table-cell">{margin}%</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-700 font-bold">
              <tr>
                <td className="table-cell">Total</td>
                <td className="table-cell text-green-600">${totalIncome.toLocaleString()}</td>
                <td className="table-cell text-red-600">${totalExpenses.toLocaleString()}</td>
                <td className="table-cell">${profit.toLocaleString()}</td>
                <td className="table-cell">{profitMargin}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Finance;
