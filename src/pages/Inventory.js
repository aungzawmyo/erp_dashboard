import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FiPackage, FiAlertCircle, FiTrendingDown, FiDollarSign, FiPlus } from 'react-icons/fi';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { useApp } from '../context/AppContext';

const Inventory = () => {
  const { data, addNotification } = useApp();
  const { inventoryData } = data;
  const [showItemModal, setShowItemModal] = useState(false);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const itemColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Quantity', 
      render: (row) => (
        <span className={row.quantity < row.minStock ? 'text-red-600 font-semibold' : ''}>
          {row.quantity} {row.unit}
        </span>
      )
    },
    { header: 'Min Stock', render: (row) => `${row.minStock} ${row.unit}` },
    { header: 'Value', render: (row) => `$${row.value}` },
    { header: 'Expiry Date', accessor: 'expiryDate' },
    { 
      header: 'Status', 
      render: (row) => {
        const isLowStock = row.quantity < row.minStock;
        const daysToExpiry = Math.ceil((new Date(row.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
        const isExpiringSoon = daysToExpiry <= 5;

        return (
          <div className="flex flex-col gap-1">
            {isLowStock && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Low Stock
              </span>
            )}
            {isExpiringSoon && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Expiring Soon
              </span>
            )}
            {!isLowStock && !isExpiringSoon && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Good
              </span>
            )}
          </div>
        );
      }
    },
  ];

  const categoryColumns = [
    { header: 'Category', accessor: 'name' },
    { header: 'Items', accessor: 'items' },
    { header: 'Total Value', render: (row) => `$${row.value.toLocaleString()}` },
  ];

  const totalValue = inventoryData.items.reduce((sum, item) => sum + item.value, 0);
  const lowStockCount = inventoryData.items.filter(item => item.quantity < item.minStock).length;
  const expiringSoonCount = inventoryData.items.filter(item => {
    const daysToExpiry = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysToExpiry <= 5;
  }).length;

  const handleAddItem = () => {
    addNotification({ type: 'success', message: 'Item added successfully' });
    setShowItemModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your stock levels</p>
        </div>
        <Button icon={<FiPlus />} onClick={() => setShowItemModal(true)}>
          Add Item
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          color="blue"
        />
        <StatCard
          title="Total Items"
          value={inventoryData.items.length}
          icon={<FiPackage size={24} />}
          color="green"
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockCount}
          icon={<FiAlertCircle size={24} />}
          color="red"
        />
        <StatCard
          title="Expiring Soon"
          value={expiringSoonCount}
          icon={<FiTrendingDown size={24} />}
          color="yellow"
        />
      </div>

      {/* Low Stock Alerts */}
      {lowStockCount > 0 && (
        <Card title="Low Stock Alerts">
          <div className="space-y-3">
            {inventoryData.lowStock.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FiAlertCircle className="text-red-600" size={20} />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Current: {item.current} | Required: {item.minimum} | Short by: {item.shortage}
                    </p>
                  </div>
                </div>
                <Button variant="danger" onClick={() => addNotification({ type: 'info', message: `Reorder initiated for ${item.name}` })}>
                  Reorder
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card title="Inventory by Category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData.categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {inventoryData.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Summary */}
        <Card title="Category Summary">
          <Table columns={categoryColumns} data={inventoryData.categories} />
        </Card>
      </div>

      {/* All Items */}
      <Card title="All Inventory Items">
        <Table columns={itemColumns} data={inventoryData.items} />
      </Card>

      {/* Add Item Modal */}
      <Modal
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        title="Add New Item"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowItemModal(false)}>Cancel</Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </>
        }
      >
        <Input label="Item Name" placeholder="Enter item name" required />
        <Input label="Category" placeholder="Enter category" required />
        <Input label="Quantity" type="number" placeholder="Enter quantity" required />
        <Input label="Unit" placeholder="e.g., kg, liters, pieces" required />
        <Input label="Minimum Stock Level" type="number" placeholder="Enter minimum stock" required />
        <Input label="Value" type="number" placeholder="Enter value" required />
        <Input label="Expiry Date" type="date" required />
      </Modal>
    </div>
  );
};

export default Inventory;
