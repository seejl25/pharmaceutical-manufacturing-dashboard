import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { useTheme } from "./ThemeContext";

import MachineUptimeLine from "./components/Machine-uptime";
import DefectRate from "./components/defect-rate";
import UnitsProduced from "./components/units-produced";
import EnergyConsumed from "./components/energy";

import DeptProduction from "./components/Dept-production";

import KPIMachineUptime from "./components/Kpi-machine-uptime";
import KPIUnitsProduced from "./components/Kpi-units";
import KPIDefect from "./components/Kpi-defect-rate";
import KPIEnergy from "./components/Kpi-energy";

import dashboardIcon from "./assets/dashboard.svg";
import productionIcon from "./assets/production.svg";
import darkModeIcon from "./assets/dark_mode.svg";
import lightModeIcon from "./assets/light_mode.svg";

function toInputDateFormat(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function App() {
  const [pharmaData, setPharmaData] = useState(null);
  const [startDate, setStartDate] = useState(new Date(2025, 5, 1));
  const [endDate, setEndDate] = useState(new Date(2025, 5, 31));
  const { darkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    fetch("pharma_manufacturing.json")
      .then((response) => response.json())
      .then((data) => setPharmaData(data))
      .catch((err) => console.log(err));
  }, []);

  if (pharmaData) {
    return (
      <>
        <nav
          style={
            darkMode
              ? { backgroundColor: "#757575" }
              : { backgroundColor: "#D9D9D9" }
          }
        >
          <div className="dashboard">
            <img src={dashboardIcon} alt="dashboard icon" style={{boxShadow: "2px 2px 4px #E4AD2E"}}/>
            <h1>
              <Link
                to="/"
                style={
                  darkMode
                    ? { textDecoration: "none", color: "#f5f5f5", textShadow: "2px 2px 4px #E4AD2E" }
                    : { textDecoration: "none", color: "black", textShadow: "2px 2px 4px #E4AD2E"}
                }
              >
                Dashboard
              </Link>
            </h1>
          </div>
          <div className="production">
            <img src={productionIcon} alt="production icon" />
            <h1>
              <Link
                to="/production"
                style={
                  darkMode
                    ? { textDecoration: "none", color: "#f5f5f5" }
                    : { textDecoration: "none", color: "black" }
                }
              >
                Production
              </Link>
            </h1>
          </div>
        </nav>
        <div
          className="container"
          style={
            darkMode
              ? { backgroundColor: "#404040" }
              : { backgroundColor: "white" }
          }
        >
          <header>
            <h1>Manufacturing Dashboard</h1>
            <div className="right-header">
              <div className="dates">
                <label htmlFor="startDate" style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>Start from:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={toInputDateFormat(startDate)}
                  onChange={(e) => {
                    const [y, m, d] = e.target.value.split("-");
                    setStartDate(new Date(y, m - 1, d));
                  }}
                />
                <label htmlFor="endDate" style={darkMode ? {color: "#f5f5f5" } : {color: "black" }}>End at:</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={toInputDateFormat(endDate)}
                  onChange={(e) => {
                    const [y, m, d] = e.target.value.split("-");
                    setEndDate(new Date(y, m - 1, d));
                  }}
                />
              </div>
              <button type="button" className="mode" onClick={toggleDarkMode}>
                {darkMode ? (
                  <img src={lightModeIcon} alt="light mode" />
                ) : (
                  <img src={darkModeIcon} alt="dark mode" />
                )}
              </button>
            </div>
          </header>

          <div className="kpi-container">
            <div
              className="kpi"
              style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }
            >
              <KPIMachineUptime
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
            <div
              className="kpi"
              style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }
            >
              <KPIUnitsProduced
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
            <div
              className="kpi"
              style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }
            >
              <KPIDefect
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
            <div
              className="kpi"
              style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }
            >
              <KPIEnergy
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
          </div>

          <div className="chart-container">
            <DeptProduction
              pharmaData={pharmaData}
              startDate={startDate}
              endDate={endDate}
              darkMode={darkMode}
            />
            <div className="chart-card" style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }>
              <MachineUptimeLine
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
            <div className="chart-card" style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }>
              <DefectRate
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
            <div className="chart-card" style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }>
              <UnitsProduced
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
            <div className="chart-card" style={
                darkMode
                  ? { backgroundColor: "#757575" }
                  : { backgroundColor: "#D9D9D9" }
              }>
              <EnergyConsumed
                pharmaData={pharmaData}
                startDate={startDate}
                endDate={endDate}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
