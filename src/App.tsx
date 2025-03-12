// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Account from "./components/Account";
import TransferETH from "./components/TransferETH";
import ReceiveETH from "./components/ReceiveETH";
import TransactionLog from "./components/TransactionLog";
import "./styles.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <div className="sidebar">
          <h2>Blockchain Wallet</h2>
          <nav>
            <ul>
              <li>
                <Link to="/">Account</Link>
              </li>
              <li>
                <Link to="/transfer">Transfer ETH</Link>
              </li>
              <li>
                <Link to="/receive">Receive ETH</Link>
              </li>
              <li>
                <Link to="/transactions">Transaction Log</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Account />} />
            <Route path="/transfer" element={<TransferETH />} />
            <Route path="/receive" element={<ReceiveETH />} />
            <Route path="/transactions" element={<TransactionLog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
