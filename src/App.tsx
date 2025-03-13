import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { WalletProvider } from "./contexts/WalletContext"; // Ensure WalletContext is imported
import Account from "./components/Account";
import TransferETH from "./components/TransferETH";
import ReceiveETH from "./components/ReceiveETH";
import TransactionLog from "./components/TransactionLog";
import "./styles.css";

const App: React.FC = () => {
  return (
    // Wrap the entire app with WalletProvider for context access
    <WalletProvider>
      <Router>
        <div className="container">
          {/* Sidebar */}
          <div className="sidebar">
            <h2>Blockchain Wallet</h2>
            <nav>
              <ul>
                <li>
                  <Link to="/">Accounts</Link>
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

          {/* Main Content */}
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
    </WalletProvider>
  );
};

export default App;
