import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiShoppingCart, FiTruck, FiDollarSign, FiPlus } from 'react-icons/fi';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { useApp } from '../context/AppContext';

const Purchase = () => {
  const { data, addNotification } = useApp();
  const { purchaseData } = data;
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);

  const supplierColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Contact', accessor: 'contact' },
    { header: 'Email', accessor: 'email' },
  ];

  const poColumns = [
    { header: 'PO Number', accessor: 'id' },
    { header: 'Supplier', accessor: 'supplier' },
    { header: 'Date', accessor: 'date' },
    { header: 'Items', accessor: 'items' },
    { 
      header: 'Amount', 
      render: (row) => <span className="font-semibold">${row.amount}</span>
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Delivered' ? 'bg-green-100 text-green-800' :
          row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  const totalPurchases = purchaseData.purchaseHistory.reduce((sum, item) => sum + item.amount, 0);
  const pendingOrders = purchaseData.purchaseOrders.filter(po => po.status === 'Pending').length;

  const handleAddSupplier = () => {
    addNotification({ type: 'success', message: 'Supplier added successfully' });
    setShowSupplierModal(false);
  };

  const handleCreatePO = () => {
    addNotification({ type: 'success', message: 'Purchase order created successfully' });
    setShowPOModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Purchase Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage suppliers and purchase orders</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon={<FiPlus />} onClick={() => setShowSupplierModal(true)}>
            Add Supplier
          </Button>
          <Button icon={<FiShoppingCart />} onClick={() => setShowPOModal(true)}>
            Create Purchase Order
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Purchases"
          value={`$${totalPurchases.toLocaleString()}`}
          icon={<FiDollarSign size={24} />}
          color="blue"
        />
        <StatCard
          title="Total Suppliers"
          value={purchaseData.suppliers.length}
          icon={<FiTruck size={24} />}
          color="green"
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<FiShoppingCart size={24} />}
          color="yellow"
        />
        <StatCard
          title="Active POs"
          value={purchaseData.purchaseOrders.length}
          icon={<FiShoppingCart size={24} />}
          color="purple"
        />
      </div>

      {/* Purchase Trend */}
      <Card title="Purchase Trend (Last 7 Days)">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={purchaseData.purchaseHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={2} name="Amount ($)" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Purchase Orders */}
      <Card title="Purchase Orders">
        <Table columns={poColumns} data={purchaseData.purchaseOrders} />
      </Card>

      {/* Suppliers */}
      <Card title="Suppliers">
        <Table columns={supplierColumns} data={purchaseData.suppliers} />
      </Card>

      {/* Add Supplier Modal */}
      <Modal
        isOpen={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
        title="Add New Supplier"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowSupplierModal(false)}>Cancel</Button>
            <Button onClick={handleAddSupplier}>Add Supplier</Button>
          </>
        }
      >
        <Input label="Supplier Name" placeholder="Enter supplier name" required />
        <Input label="Category" placeholder="Enter category" required />
        <Input label="Contact Number" placeholder="Enter contact number" required />
        <Input label="Email" type="email" placeholder="Enter email address" required />
      </Modal>

      {/* Create PO Modal */}
      <Modal
        isOpen={showPOModal}
        onClose={() => setShowPOModal(false)}
        title="Create Purchase Order"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowPOModal(false)}>Cancel</Button>
            <Button onClick={handleCreatePO}>Create Order</Button>
          </>
        }
      >
        <Input label="Supplier" placeholder="Select supplier" required />
        <Input label="Expected Delivery Date" type="date" required />
        <Input label="Notes" placeholder="Add any notes" />
      </Modal>
    </div>
  );
};

export default Purchase;
