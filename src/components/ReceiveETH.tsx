// src/components/ReceiveETH.tsx
import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const ReceiveETH: React.FC = () => {
  const walletContext = useContext(WalletContext);

  if (!walletContext) {
    return <p>Loading wallet data...</p>;
  }

  const { accounts, balances } = walletContext;

  return (
    <div>
      <h2>Receive ETH</h2>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Address</th>
            <th>Balance (ETH)</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account}</td>
              <td>{balances[account] || "Loading..."}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiveETH;
