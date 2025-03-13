import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const TransactionLog: React.FC = () => {
  const walletContext = useContext(WalletContext);

  if (!walletContext) {
    return <p>Loading transaction data...</p>;
  }

  const { transactionLogs } = walletContext;

  return (
    <div>
      <h2>Transaction Log</h2>
      {transactionLogs.length > 0 ? (
        <table
          border={1}
          cellPadding={10}
          cellSpacing={0}
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Amount (ETH)</th>
              <th>Transaction Hash</th>
            </tr>
          </thead>
          <tbody>
            {transactionLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.from}</td>
                <td>{log.to}</td>
                <td>{log.amount}</td>
                <td>
                  <a
                    href={`https://etherscan.io/tx/${log.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {log.transactionHash}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionLog;
