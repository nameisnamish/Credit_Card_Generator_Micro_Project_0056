# 💳 Credit Card Generator Micro Project

An interactive, responsive React web application that generates real-time credit card previews, performs client-side form validation, and provides dynamic completion workflows.

---

## ✨ Features

- **Live Card Preview**: Instantly updates cardholder name, 16-digit card number, expiry date (MM/YY), and CVC on both front and back card designs as you type.
- **Form Validation**: Comprehensive input validation ensuring correct card number formatting, numeric expiry dates, and valid security codes.
- **Interactive States**: Transitions seamlessly between input form state and a completed confirmation screen.
- **Toast Notifications**: Built-in animated `SuccessToast` component confirming successful card detail submission.
- **Responsive Layout**: Designed for mobile and desktop viewports with a split sidebar layout and modern CSS styling.

---

## 🛠️ Tech Stack

- **Frontend Library**: React (v19)
- **Styling**: Modern CSS (Flexbox, Grid, CSS Custom Variables, Responsive Media Queries)
- **Tooling & Build**: Create React App (`react-scripts`)
- **Testing**: React Testing Library & Jest

---

## 📁 Project Structure

```text
microproject/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.css               # Main app layout and responsive styles
│   ├── App.js                # Core state container & component router
│   ├── CardDetailsForm.js    # Interactive form with validation logic
│   ├── CompletedState.js     # Post-submission confirmation screen
│   ├── CreditCard.js         # Interactive Front & Back card preview component
│   ├── SuccessToast.js       # Auto-dismissing success toast alert
│   ├── index.css             # Base reset and typography styles
│   └── index.js              # Application entry point
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) and `npm` installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nameisnamish/Credit_Card_Generator_Micro_Project_0056.git
   cd Credit_Card_Generator_Micro_Project_0056
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   Open `http://localhost:3000` to view the app in your browser.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the repository issues page.

---

## 📄 License

This micro-project is open source and available under the [MIT License](LICENSE).