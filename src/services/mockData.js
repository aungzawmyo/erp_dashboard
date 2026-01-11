// Mock data for the ERP Dashboard

// Sales Data
export const salesData = {
  dailySales: [
    { date: '2024-01-01', amount: 4500, orders: 45 },
    { date: '2024-01-02', amount: 5200, orders: 52 },
    { date: '2024-01-03', amount: 4800, orders: 48 },
    { date: '2024-01-04', amount: 6100, orders: 61 },
    { date: '2024-01-05', amount: 5800, orders: 58 },
    { date: '2024-01-06', amount: 7200, orders: 72 },
    { date: '2024-01-07', amount: 6800, orders: 68 },
  ],
  topProducts: [
    { id: 1, name: 'Chicken Burger', sales: 245, revenue: 2450 },
    { id: 2, name: 'Margherita Pizza', sales: 198, revenue: 2376 },
    { id: 3, name: 'Caesar Salad', sales: 156, revenue: 1404 },
    { id: 4, name: 'Spaghetti Carbonara', sales: 142, revenue: 1988 },
    { id: 5, name: 'Fish and Chips', sales: 128, revenue: 1664 },
  ],
  orders: [
    { id: 1001, date: '2024-01-07', type: 'Dine-in', items: 3, total: 45.50, status: 'Completed' },
    { id: 1002, date: '2024-01-07', type: 'Takeaway', items: 2, total: 28.00, status: 'Completed' },
    { id: 1003, date: '2024-01-07', type: 'Delivery', items: 5, total: 67.80, status: 'Pending' },
    { id: 1004, date: '2024-01-07', type: 'Dine-in', items: 4, total: 52.00, status: 'In Progress' },
  ],
};

// Purchase Data
export const purchaseData = {
  suppliers: [
    { id: 1, name: 'Fresh Farms Ltd', category: 'Vegetables', contact: '+1234567890', email: 'contact@freshfarms.com' },
    { id: 2, name: 'Quality Meats Co', category: 'Meat', contact: '+1234567891', email: 'info@qualitymeats.com' },
    { id: 3, name: 'Dairy Best', category: 'Dairy', contact: '+1234567892', email: 'orders@dairybest.com' },
    { id: 4, name: 'Ocean Fresh', category: 'Seafood', contact: '+1234567893', email: 'sales@oceanfresh.com' },
  ],
  purchaseOrders: [
    { id: 'PO-001', supplier: 'Fresh Farms Ltd', date: '2024-01-05', items: 12, amount: 450, status: 'Delivered' },
    { id: 'PO-002', supplier: 'Quality Meats Co', date: '2024-01-06', items: 8, amount: 680, status: 'Pending' },
    { id: 'PO-003', supplier: 'Dairy Best', date: '2024-01-07', items: 6, amount: 320, status: 'In Transit' },
  ],
  purchaseHistory: [
    { date: '2024-01-01', amount: 1200 },
    { date: '2024-01-02', amount: 980 },
    { date: '2024-01-03', amount: 1450 },
    { date: '2024-01-04', amount: 1100 },
    { date: '2024-01-05', amount: 1380 },
    { date: '2024-01-06', amount: 1620 },
    { date: '2024-01-07', amount: 1290 },
  ],
};

// Inventory Data
export const inventoryData = {
  items: [
    { id: 1, name: 'Tomatoes', category: 'Vegetables', quantity: 50, unit: 'kg', minStock: 20, value: 150, expiryDate: '2024-01-15' },
    { id: 2, name: 'Chicken Breast', category: 'Meat', quantity: 15, unit: 'kg', minStock: 25, value: 225, expiryDate: '2024-01-10' },
    { id: 3, name: 'Mozzarella Cheese', category: 'Dairy', quantity: 30, unit: 'kg', minStock: 15, value: 450, expiryDate: '2024-01-20' },
    { id: 4, name: 'Lettuce', category: 'Vegetables', quantity: 40, unit: 'kg', minStock: 20, value: 80, expiryDate: '2024-01-12' },
    { id: 5, name: 'Salmon Fillet', category: 'Seafood', quantity: 8, unit: 'kg', minStock: 10, value: 320, expiryDate: '2024-01-09' },
    { id: 6, name: 'Olive Oil', category: 'Condiments', quantity: 25, unit: 'liters', minStock: 10, value: 375, expiryDate: '2024-06-30' },
  ],
  categories: [
    { id: 1, name: 'Vegetables', items: 15, value: 2400 },
    { id: 2, name: 'Meat', items: 8, value: 3200 },
    { id: 3, name: 'Dairy', items: 6, value: 1800 },
    { id: 4, name: 'Seafood', items: 5, value: 2100 },
    { id: 5, name: 'Condiments', items: 12, value: 960 },
  ],
  lowStock: [
    { name: 'Chicken Breast', current: 15, minimum: 25, shortage: 10 },
    { name: 'Salmon Fillet', current: 8, minimum: 10, shortage: 2 },
  ],
};

// Finance Data
export const financeData = {
  income: [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 48000 },
    { month: 'Mar', amount: 52000 },
    { month: 'Apr', amount: 49000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 58000 },
  ],
  expenses: [
    { month: 'Jan', amount: 32000 },
    { month: 'Feb', amount: 34000 },
    { month: 'Mar', amount: 36000 },
    { month: 'Apr', amount: 35000 },
    { month: 'May', amount: 38000 },
    { month: 'Jun', amount: 40000 },
  ],
  expenseCategories: [
    { category: 'Inventory', amount: 18000, percentage: 45 },
    { category: 'Salaries', amount: 12000, percentage: 30 },
    { category: 'Rent', amount: 4000, percentage: 10 },
    { category: 'Utilities', amount: 3000, percentage: 7.5 },
    { category: 'Marketing', amount: 2000, percentage: 5 },
    { category: 'Others', amount: 1000, percentage: 2.5 },
  ],
  cashFlow: {
    opening: 50000,
    inflow: 58000,
    outflow: 40000,
    closing: 68000,
  },
};

// Marketing Data
export const marketingData = {
  customers: [
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1234567890', loyaltyPoints: 450, totalSpent: 2400 },
    { id: 2, name: 'Emma Wilson', email: 'emma@example.com', phone: '+1234567891', loyaltyPoints: 320, totalSpent: 1800 },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', phone: '+1234567892', loyaltyPoints: 580, totalSpent: 3200 },
    { id: 4, name: 'Sarah Davis', email: 'sarah@example.com', phone: '+1234567893', loyaltyPoints: 210, totalSpent: 1200 },
  ],
  promotions: [
    { id: 1, name: 'Weekend Special', discount: '20%', startDate: '2024-01-06', endDate: '2024-01-07', status: 'Active' },
    { id: 2, name: 'Lunch Combo', discount: '15%', startDate: '2024-01-01', endDate: '2024-01-31', status: 'Active' },
    { id: 3, name: 'Happy Hour', discount: '25%', startDate: '2024-01-01', endDate: '2024-01-15', status: 'Scheduled' },
  ],
  campaigns: [
    { id: 1, name: 'New Year Campaign', type: 'Email', sent: 500, opened: 320, clicked: 180, revenue: 4500 },
    { id: 2, name: 'Valentine Promo', type: 'SMS', sent: 350, opened: 280, clicked: 150, revenue: 3200 },
  ],
};

// Overview/Dashboard Data
export const overviewData = {
  metrics: {
    totalSales: 58000,
    totalExpenses: 40000,
    profitMargin: 31.0,
    inventoryValue: 24500,
  },
  todayStats: {
    orders: 45,
    revenue: 6800,
    pendingOrders: 8,
    lowStockAlerts: 2,
  },
  recentActivities: [
    { id: 1, type: 'order', message: 'New order #1004 received', time: '5 mins ago' },
    { id: 2, type: 'payment', message: 'Payment of $67.80 received', time: '12 mins ago' },
    { id: 3, type: 'stock', message: 'Low stock alert for Chicken Breast', time: '1 hour ago' },
    { id: 4, type: 'purchase', message: 'Purchase order PO-003 created', time: '2 hours ago' },
  ],
};

const mockData = {
  salesData,
  purchaseData,
  inventoryData,
  financeData,
  marketingData,
  overviewData,
};

export default mockData;
