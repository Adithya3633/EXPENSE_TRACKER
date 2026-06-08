# 💰 Expense Tracker

A modern, lightweight web application to track your income and expenses with automatic data persistence. Built with vanilla HTML, CSS, and JavaScript.

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Browser Support](#browser-support)
- [Contributing](#contributing)

## ✨ Features

- **🎯 Transaction Management**
  - Add income and expense transactions with descriptions
  - Automatic data persistence using browser's localStorage
  - Real-time balance calculation

- **📊 Visual Dashboard**
  - View balance, total income, and total expenses at a glance
  - Spending ratio bar showing percentage of income spent
  - Beautiful and responsive UI with modern design

- **🏷️ Categories**
  - Pre-defined expense categories with emojis:
    - 🍔 Food
    - 🚗 Transport
    - 🏠 Rent
    - 🛒 Shopping
    - 💊 Health
    - 🎮 Entertainment
    - 📚 Education
    - ⚡ Utilities
    - 📦 Other

- **🔍 Filter & Sort**
  - Filter transactions by type (All, Income, Expense)
  - View all transactions in chronological order
  - Easy-to-read transaction list with timestamps

- **🗑️ Data Management**
  - Clear all transactions with confirmation
  - Edit or delete individual transactions (coming soon)
  - Export data functionality (planned)

- **💾 Auto-Save**
  - All data is automatically saved to your browser's localStorage
  - Data persists even after closing the browser
  - No server required

- **📱 Responsive Design**
  - Works on desktop, tablet, and mobile devices
  - Clean, modern interface with smooth animations
  - Dark mode friendly design

## 🚀 Demo

[Live Demo](https://adithya3633.github.io/EXPENSE_TRACKER/) 

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - it's a web-based application

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adithya3633/EXPENSE_TRACKER.git
   cd EXPENSE_TRACKER
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (with http-server package)
     npx http-server
     ```

3. **Access the application**
   - Open `http://localhost:8000` in your browser

## 📖 Usage

### Adding a Transaction

1. **Select Transaction Type**
   - Click "+ Income" for income transactions
   - Click "− Expense" for expense transactions

2. **Fill in Details**
   - Enter a description (e.g., "Freelance payment", "Grocery shopping")
   - Enter the amount in rupees (₹)
   - For expenses, select a category from the dropdown

3. **Submit**
   - Click "Add Transaction" button
   - The transaction will appear in the list immediately
   - Your balance, income, and expenses will update automatically

### Filtering Transactions

- Click **All** to view all transactions
- Click **Income** to view only income transactions
- Click **Expense** to view only expense transactions

### Viewing Summary

The dashboard at the top shows:
- **Balance**: Total money available (Income - Expenses)
- **Income**: Total income added
- **Expenses**: Total expenses deducted
- **Spending Ratio**: Percentage of income spent on expenses

### Clearing Transactions

1. Scroll to the bottom of the transaction list
2. Click "Clear all transactions" button
3. A confirmation dialog will appear
4. Click "Yes, clear" to confirm or "Cancel" to keep transactions

## 🏗️ Project Structure

```
EXPENSE_TRACKER/
├── index.html          # Main HTML file with UI structure
├── styles.css          # Styling and layout
├── script.js           # JavaScript logic and functionality
└── README.md           # This file
```

### File Descriptions

**index.html**
- Contains the HTML structure of the application
- Defines the UI layout with header, summary cards, forms, and transaction list
- Links to external fonts (Google Fonts: Syne, DM Mono, DM Sans)

**styles.css**
- Responsive CSS styling
- Color variables for consistent theming
- Media queries for mobile responsiveness
- Smooth transitions and animations

**script.js**
- Core functionality for adding/removing transactions
- LocalStorage management for data persistence
- Event handlers for UI interactions
- Calculation logic for balance, income, and expenses

## 🔧 How It Works

### Data Storage

The application uses **localStorage** to persist data:
- Data is stored as a JSON string in the browser
- Each transaction contains: type, description, amount, category, date, and timestamp
- Data persists across browser sessions until manually cleared

### Key Functions

| Function | Purpose |
|----------|---------|
| `addTransaction()` | Adds a new transaction to the list |
| `setType(type)` | Switches between income and expense mode |
| `setFilter(filter)` | Filters transactions by type |
| `updateUI()` | Refreshes the display with current data |
| `calculateBalance()` | Computes total balance, income, and expenses |
| `saveData()` | Saves transactions to localStorage |
| `loadData()` | Loads transactions from localStorage |
| `clearAll()` | Removes all transactions (with confirmation) |

### Data Flow

```
User Input → Validation → Add to Array → Save to localStorage → Update UI
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` (in amount field) | Add transaction |

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| IE 11 | ⚠️ Limited |

## 🎨 Customization

### Change Currency

Edit the `script.js` file and replace `₹` (Indian Rupee) with your preferred currency symbol:
```javascript
// Example for US Dollar
const currencySymbol = '$';
```

### Modify Categories

Edit the category options in `index.html`:
```html
<option value="🍔 Food">🍔 Food</option>
<!-- Add more categories as needed -->
```

### Adjust Colors

Edit the CSS variables in `styles.css`:
```css
:root {
  --primary: #your-color;
  --expense: #your-color;
  /* ... other variables ... */
}
```

## 🐛 Troubleshooting

### Data Not Saving?
- Check if browser's localStorage is enabled
- Clear browser cache and try again
- Ensure JavaScript is enabled

### Transactions Not Appearing?
- Refresh the page
- Check browser console for errors (F12 → Console)
- Verify localStorage isn't full

### Styling Issues?
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Try a different browser
- Check internet connection for Google Fonts

## 📝 Future Enhancements

- [ ] Edit existing transactions
- [ ] Delete individual transactions
- [ ] Export data to CSV/PDF
- [ ] Multiple budget categories
- [ ] Monthly/yearly reports
- [ ] Charts and statistics
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Cloud sync

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Adithya3633**
- GitHub: [@Adithya3633](https://github.com/Adithya3633)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💬 Feedback & Support

Have suggestions or found a bug? 
- Open an issue on GitHub
- Contact the author

## 🙏 Acknowledgments

- Google Fonts for beautiful typography
- Inspired by modern financial apps
- Built with vanilla JavaScript (no frameworks!)

---

**Happy Tracking! 💵**
