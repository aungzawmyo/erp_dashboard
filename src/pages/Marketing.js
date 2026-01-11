import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiUsers, FiStar, FiGift, FiPlus } from 'react-icons/fi';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { useApp } from '../context/AppContext';

const Marketing = () => {
  const { data, addNotification } = useApp();
  const { marketingData } = data;
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const customerColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { 
      header: 'Loyalty Points', 
      render: (row) => (
        <span className="flex items-center">
          <FiStar className="text-yellow-500 mr-1" />
          {row.loyaltyPoints}
        </span>
      )
    },
    { header: 'Total Spent', render: (row) => `$${row.totalSpent.toLocaleString()}` },
  ];

  const promoColumns = [
    { header: 'Promotion Name', accessor: 'name' },
    { header: 'Discount', accessor: 'discount' },
    { header: 'Start Date', accessor: 'startDate' },
    { header: 'End Date', accessor: 'endDate' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {row.status}
        </span>
      )
    },
  ];

  const totalCustomers = marketingData.customers.length;
  const avgLoyaltyPoints = Math.round(
    marketingData.customers.reduce((sum, c) => sum + c.loyaltyPoints, 0) / totalCustomers
  );
  const totalCustomerValue = marketingData.customers.reduce((sum, c) => sum + c.totalSpent, 0);

  const handleAddCustomer = () => {
    addNotification({ type: 'success', message: 'Customer added successfully' });
    setShowCustomerModal(false);
  };

  const handleCreatePromo = () => {
    addNotification({ type: 'success', message: 'Promotion created successfully' });
    setShowPromoModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Marketing Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Engage customers and run campaigns</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary" icon={<FiPlus />} onClick={() => setShowCustomerModal(true)}>
            Add Customer
          </Button>
          <Button icon={<FiGift />} onClick={() => setShowPromoModal(true)}>
            Create Promotion
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          icon={<FiUsers size={24} />}
          color="blue"
          trend="up"
          trendValue="8.5%"
        />
        <StatCard
          title="Avg Loyalty Points"
          value={avgLoyaltyPoints}
          icon={<FiStar size={24} />}
          color="yellow"
        />
        <StatCard
          title="Customer Lifetime Value"
          value={`$${totalCustomerValue.toLocaleString()}`}
          icon={<FiUsers size={24} />}
          color="green"
        />
        <StatCard
          title="Active Promotions"
          value={marketingData.promotions.filter(p => p.status === 'Active').length}
          icon={<FiGift size={24} />}
          color="purple"
        />
      </div>

      {/* Campaign Performance */}
      <Card title="Campaign Performance">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={marketingData.campaigns}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sent" fill="#3b82f6" name="Sent" />
            <Bar dataKey="opened" fill="#10b981" name="Opened" />
            <Bar dataKey="clicked" fill="#f59e0b" name="Clicked" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Campaign ROI">
          <div className="space-y-4">
            {marketingData.campaigns.map((campaign) => {
              const openRate = ((campaign.opened / campaign.sent) * 100).toFixed(1);
              const clickRate = ((campaign.clicked / campaign.opened) * 100).toFixed(1);
              const roi = ((campaign.revenue / (campaign.sent * 0.1)) * 100).toFixed(0);

              return (
                <div key={campaign.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.type}</p>
                    </div>
                    <span className="text-lg font-bold text-green-600">${campaign.revenue.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Open Rate</p>
                      <p className="text-lg font-semibold">{openRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Click Rate</p>
                      <p className="text-lg font-semibold">{clickRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
                      <p className="text-lg font-semibold text-green-600">{roi}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Top Customers">
          <div className="space-y-4">
            {marketingData.customers
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FiStar className="text-yellow-500 mr-1" size={14} />
                        {customer.loyaltyPoints} points
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">${customer.totalSpent.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Promotions */}
      <Card title="Active Promotions">
        <Table columns={promoColumns} data={marketingData.promotions} />
      </Card>

      {/* Customers */}
      <Card title="Customer Database">
        <Table columns={customerColumns} data={marketingData.customers} />
      </Card>

      {/* Add Customer Modal */}
      <Modal
        isOpen={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        title="Add New Customer"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>Cancel</Button>
            <Button onClick={handleAddCustomer}>Add Customer</Button>
          </>
        }
      >
        <Input label="Customer Name" placeholder="Enter customer name" required />
        <Input label="Email" type="email" placeholder="Enter email address" required />
        <Input label="Phone" placeholder="Enter phone number" required />
        <Input label="Initial Loyalty Points" type="number" placeholder="0" />
      </Modal>

      {/* Create Promotion Modal */}
      <Modal
        isOpen={showPromoModal}
        onClose={() => setShowPromoModal(false)}
        title="Create New Promotion"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowPromoModal(false)}>Cancel</Button>
            <Button onClick={handleCreatePromo}>Create Promotion</Button>
          </>
        }
      >
        <Input label="Promotion Name" placeholder="Enter promotion name" required />
        <Input label="Discount" placeholder="e.g., 20%, $10 off" required />
        <Input label="Start Date" type="date" required />
        <Input label="End Date" type="date" required />
        <Input label="Description" placeholder="Enter promotion details" />
      </Modal>
    </div>
  );
};

export default Marketing;
