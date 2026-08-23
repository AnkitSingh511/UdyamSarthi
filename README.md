# UdyamSarthi (उद्यम सारथी)

> **AI-Driven Hyper-Local Business Advisory Platform**

UdyamSarthi is an intelligent business advisory & analytics platform designed to empower local entrepreneurs, micro-enterprises, and small businesses with data-backed market insights, hyper-local spatial intelligence, financial forecasting, and government scheme support (such as MUDRA loans).

---

## 🚀 Key Features

- 📍 **Hyper-Local Map & Intelligence (`HyperLocalMap`)**: Interactive mapping powered by Leaflet to analyze local market competition, customer density, and strategic location hotspots.
- 🤖 **AI Advisor (`AIAdvisor`)**: Rule-engine & ML intelligence giving customized business suggestions, risk assessments, and growth strategies.
- 📊 **Financial Engine (`FinancialEngine`)**: Comprehensive financial modeling, break-even analysis, revenue projections, and interactive charts powered by Chart.js.
- 💳 **MUDRA Loan Card & Assistant (`MudraLoanCard`)**: Step-by-step guidance on eligibility, application requirements, and financial support under government schemes like MUDRA.
- ⚙️ **Dynamic Business Configurator (`DynamicBusinessForm`)**: Tailored questionnaires to capture specific business parameters, location inputs, and investment scales.
- 🔐 **Secure Authentication & Drawer History (`AuthModal`, `ActivityLogDrawer`)**: User sign-in/registration backed by JWT and MongoDB, with activity tracking and history log.
- 🛰️ **GPS Location Calibration (`GpsCalibrationModal`)**: Fine-grained GPS positioning for exact local area analytics.

---

## 🛠️ Tech Stack

### Frontend
- **Framework & Build Tool:** [React 18](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer
- **UI Components & Icons:** [Lucide React](https://lucide.dev/), Canvas Confetti
- **Mapping:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Data Visualization:** [Chart.js](https://www.chartjs.org/) & [React-ChartJS-2](https://react-chartjs-2.js.org/)

### Backend
- **Server:** Node.js, [Express.js v5](https://expressjs.com/)
- **Database & ODM:** MongoDB, [Mongoose](https://mongoosejs.com/)
- **Authentication & Security:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`, `dotenv`

---

## 📁 Project Structure

```text
UdyamSarthi/
├── server/                 # Express backend API & Database models
│   ├── middleware/         # Auth & validation middleware
│   ├── models/             # Mongoose schemas (User, Business, etc.)
│   ├── routes/             # Express API routes
│   ├── index.js            # Express server entry point
│   └── seed.js             # Database seeding script
├── src/                    # Frontend React application
│   ├── components/         # UI Components (Map, AI Advisor, Financials, etc.)
│   ├── context/            # Global AppContext state management
│   ├── data/               # Static dataset & reference definitions
│   ├── services/           # API interaction & service layer
│   ├── utils/              # Helper functions & utilities
│   ├── App.jsx             # Main App layout & provider wrapper
│   ├── main.jsx            # React root mount point
│   └── index.css           # Global Tailwind CSS imports
├── index.html              # Vite HTML template
├── vite.config.js          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies & npm scripts
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (Local instance or MongoDB Atlas connection string)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AnkitSingh511/UdyamSarthi.git
cd UdyamSarthi
npm install
```

### 2. Environment Configuration

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/udyamsarthi
JWT_SECRET=your_jwt_secret_key
```

### 3. Running the Application

#### Start Backend Server
```bash
npm run server
```

#### Seed Initial Data (Optional)
```bash
npm run seed
```

#### Start Frontend Development Server
```bash
npm run dev
```

The application will be running locally at `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

| Script | Description |
|---|---|
| `npm run dev` | Runs the Vite frontend development server. |
| `npm run server` | Starts the Node.js / Express backend server. |
| `npm run seed` | Runs the database seed script to populate sample data. |
| `npm run build` | Bundles the application for production deployment. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint to check for code quality issues. |

---

## 📄 License

This project is licensed under the MIT License.
