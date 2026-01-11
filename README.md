# Restaurant ERP Dashboard

A comprehensive Enterprise Resource Planning (ERP) dashboard built with React for managing restaurant operations. This application provides modules for sales, purchases, inventory, finance, and marketing management.

## Features

### 🎯 Core Modules

1. **Overview Dashboard**
   - Real-time key metrics (sales, expenses, profit margin, inventory value)
   - Interactive charts showing sales trends and revenue vs expenses
   - Top-selling items visualization
   - Recent activity feed
   - Quick statistics display

2. **Sales Management**
   - Daily, weekly, and monthly sales analytics
   - Order management (dine-in, takeaway, delivery)
   - Sales trend visualization
   - Top products performance tracking
   - Order status tracking

3. **Purchase Management**
   - Supplier database management
   - Purchase order creation and tracking
   - Purchase history and analytics
   - Pending orders monitoring
   - Purchase trend visualization

4. **Inventory Management**
   - Real-time stock level monitoring
   - Low stock alerts
   - Category-based organization
   - Expiry date tracking
   - Stock valuation
   - Inventory distribution charts

5. **Finance Management**
   - Income and expense tracking
   - Profit & Loss statements
   - Cash flow monitoring
   - Expense distribution analysis
   - Financial trend charts
   - Budget overview

6. **Marketing Management**
   - Customer database
   - Loyalty points system
   - Promotion management
   - Campaign performance tracking
   - Customer analytics
   - ROI measurement

### ✨ Additional Features

- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Authentication**: Simple login/logout functionality
- **Notifications**: Toast notifications for user actions
- **Interactive Charts**: Beautiful data visualizations using Recharts
- **Modern UI**: Clean and professional interface with Tailwind CSS

## Technology Stack

- **Framework**: React 19.2.3
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: React Icons (Feather Icons)
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aungzawmyo/erp_dashboard.git
cd erp_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Usage

### Login

- Navigate to the login page
- Enter any username and password (demo mode)
- You will be redirected to the dashboard

### Navigation

- Use the sidebar to navigate between different modules
- Click on module icons or names to switch views
- The sidebar is collapsible on mobile devices

### Features by Module

#### Overview Dashboard
- View key performance indicators
- Monitor today's statistics
- Check recent activities
- Analyze sales trends and expense distribution

#### Sales Module
- Track sales performance
- View and manage orders
- Analyze top-selling products
- Generate sales reports

#### Purchase Module
- Manage suppliers
- Create purchase orders
- Track pending deliveries
- Monitor purchase trends

#### Inventory Module
- Monitor stock levels
- Receive low stock alerts
- Track expiring items
- View inventory by category
- Add new inventory items

#### Finance Module
- View income and expenses
- Monitor profit trends
- Analyze expense distribution
- Review P&L statements
- Track cash flow

#### Marketing Module
- Manage customer database
- Track loyalty points
- Create promotions
- Monitor campaign performance
- Analyze customer behavior

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── Modal.js
│   │   ├── Notification.js
│   │   ├── StatCard.js
│   │   └── Table.js
│   └── layout/          # Layout components
│       ├── Header.js
│       ├── Layout.js
│       └── Sidebar.js
├── pages/               # Page components
│   ├── Overview.js
│   ├── Sales.js
│   ├── Purchase.js
│   ├── Inventory.js
│   ├── Finance.js
│   ├── Marketing.js
│   └── Login.js
├── context/             # Context API
│   └── AppContext.js
├── services/            # Mock data services
│   └── mockData.js
├── styles/              # Global styles
│   └── index.css
├── App.js               # Main app component
└── index.js             # Entry point
```

## Mock Data

The application uses mock data for demonstration purposes. All data is stored in `src/services/mockData.js` and includes:

- Sales transactions and trends
- Purchase orders and suppliers
- Inventory items and categories
- Financial records
- Customer information and campaigns

## Customization

### Adding New Features

1. Create new components in the appropriate directory
2. Add routes in `App.js`
3. Update the sidebar navigation in `Sidebar.js`
4. Add mock data in `mockData.js`

### Styling

- Global styles are in `src/styles/index.css`
- Tailwind configuration is in `tailwind.config.js`
- Custom utility classes are defined using Tailwind's `@layer` directive

### Dark Mode

Dark mode is implemented using Tailwind's `dark:` variant and managed through the AppContext. Toggle it using the moon/sun icon in the header.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for beautiful chart components
- React Icons for the icon library

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time data updates
- [ ] Advanced reporting features
- [ ] Multi-language support
- [ ] Role-based access control
- [ ] Export functionality (PDF, Excel)
- [ ] Email/SMS integration
- [ ] Advanced analytics and AI insights
- [ ] Mobile app version

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ for restaurant management
