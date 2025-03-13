import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const TransactionLog: React.FC = () => {
  const walletContext = useContext(WalletContext);

  if (!walletContext) {
    return <p>Loading transaction data...</p>;
  }

  const { transactionLogs } = walletContext;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transaction Log</h2>

      {transactionLogs.length > 0 ? (
        <div
          style={{
            overflowX: "auto", // Enable horizontal scrolling if table overflows
            marginTop: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <table
            cellPadding={10}
            cellSpacing={0}
            style={{
              width: "100%",
              borderCollapse: "collapse", // Prevent double borders
            }}
          >
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "10px" }}>Sender</th>
                <th style={{ textAlign: "left", padding: "10px" }}>
                  Recipient
                </th>
                <th style={{ textAlign: "left", padding: "10px" }}>
                  Amount (ETH)
                </th>
                <th style={{ textAlign: "left", padding: "10px" }}>
                  Transaction Hash
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionLogs.map((log, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #ddd", // Add separation between rows
                  }}
                >
                  <td style={{ padding: "10px" }}>{log.from}</td>
                  <td style={{ padding: "10px" }}>{log.to}</td>
                  <td style={{ padding: "10px" }}>{log.amount}</td>
                  <td style={{ padding: "10px" }}>
                    <a
                      href={`https://etherscan.io/tx/${log.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff", textDecoration: "none" }}
                    >
                      {log.transactionHash}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionLog;
