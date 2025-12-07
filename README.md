# 📊 FinBoard - Customizable Real-Time Finance Dashboard

> A dynamic, drag-and-drop finance dashboard builder that allows users to connect **any JSON API** and visualize data in real-time without writing code.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Chart.js](https://img.shields.io/badge/Chart.js-3.9-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Live Demo

<img width="1919" height="1032" alt="image" src="https://github.com/user-attachments/assets/bab70b28-78b7-4b15-a82e-ed4f640ead0f" />

<img width="1915" height="1051" alt="image" src="https://github.com/user-attachments/assets/ecff9e6d-03f8-4c2b-b21d-306991e650c3" />


https://github.com/user-attachments/assets/2260169a-4d3e-4aba-8932-44c4002c976f


https://github.com/user-attachments/assets/d23ff887-d07e-41b3-bd83-0461f0a664c8



https://github.com/user-attachments/assets/df6b4c69-e1b6-4c18-b23d-13bd6579c0c1




<img width="1919" height="1073" alt="image" src="https://github.com/user-attachments/assets/0bcc6d21-6cb1-4a74-8bbb-40b1266395dc" />
<img width="1919" height="1032" alt="image" src="https://github.com/user-attachments/assets/c8f504df-b02a-4a2f-827c-44dba5d0a11c" />
<img width="1919" height="1026" alt="image" src="https://github.com/user-attachments/assets/ecc6fd32-ced2-4511-8205-27f8598b2ff8" />



---

## 💡 The Problem & Solution
**The Challenge:** Most dashboards are hard-coded to specific APIs. If the API changes or a user wants to track a new metric (e.g., a specific crypto token or stock), developers have to write new code.

**The FinBoard Solution:** I built a **Universal API Connector**.
- Users paste *any* public API URL.
- The app **dynamically parses** the JSON response.
- Users "point and click" to select the specific data fields they want to track (e.g., `data.rates.BTC`).
- The dashboard automatically generates a Widget (Card, Table, or Chart) bound to that specific data path.

---

## ✨ Key Features

### 1. 🔌 Universal Widget Builder (The "JSON Explorer")
- Connect to **any REST API** (Crypto, Stocks, Weather, etc.).
- **Dynamic Field Mapping:** Automatically flattens complex nested JSON into selectable paths.
- **Test Connection:** Verifies API response before creating the widget.

### 2. 📈 Real-Time Visualization
- **Live Charts:** Line graphs that update in real-time as new data points arrive.
- **Data Tables:** Dynamic tables with search, sort, and pagination logic.
- **Finance Cards:** Custom cards highlighting primary and secondary metrics.

### 3. 🖱️ Drag-and-Drop Layout
- Built with `react-grid-layout`.
- Fully responsive grid (widgets resize automatically on mobile).
- Widgets can be resized and moved freely.

### 4. 💾 Robust Data Persistence
- **Auto-Save:** Dashboard state (layout + configurations) is saved to `localStorage` instantly.
- **Export/Import:** Users can download their config as a `.json` file and restore it on another device.

### 5. 🎨 UI/UX Polish
- **Dark/Light Mode:** Seamless theme switching with CSS variables.
- **Interactive States:** Loading skeletons, error handling, and hover effects.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **State Management:** Redux Toolkit (Slices for Widgets & API Config)
- **Styling:** CSS Modules & Styled JSX (Scoped styling)
- **Visualization:** Chart.js & React-Chartjs-2
- **Grid System:** React-Grid-Layout
- **Utilities:** Lodash (for deep object property extraction)

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/finboard.git](https://github.com/your-username/finboard.git)
   cd finboard
2. **Install dependencies**
   ```bash
   npm install
3. **Run the development server**
   ```bash
   npm run dev 
4. **Open in Browser Visit http://localhost:3000 to see the app.**

## 🧪 How to Test (Example)

To test the **Table Widget**, use this free CoinGecko API URL *(no API key required)*:

### **URL**

```
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
```

### **Steps**

1. Click **+ Add Widget**

2. Paste the URL above

3. Click **Test**

4. Select **Display Mode: Table**

5. Add these fields from the list:

   * `name` → **Company**
   * `current_price` → **Price**
   * `high_24h` → **24h High**

6. Click **Add Widget**

---

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router Pages
├── components/
│   ├── Dashboard/       # Widget Logic (Card, Chart, Modal)
│   ├── UI/              # Reusable UI (Navbar, Buttons)
│   └── Logic/           # Invisible Logic (Persistence)
├── store/               # Redux Toolkit Setup
│   └── slices/          # Widget State Slices
├── hooks/               # Custom Hooks (useWidgetData)
└── utils/               # Helpers (JSON Flattener)
```

---

## 🔮 Future Improvements

* [ ] Server-Side Rendering (SSR) for initial data pre-fetching
* [ ] OAuth integration for saving dashboards to a user account
* [ ] WebSocket support for sub-second updates (e.g., Binance Stream)

---
