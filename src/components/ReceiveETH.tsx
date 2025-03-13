import React, { useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";
import QRCode from "qrcode.react";

const ReceiveETH: React.FC = () => {
  const walletContext = useContext(WalletContext);

  if (!walletContext) {
    return <p>Loading wallet data...</p>;
  }

  const { accounts } = walletContext;

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    alert(`Address copied to clipboard: ${address}`);
  };

  return (
    <div>
      <h2>Receive ETH</h2>
      {accounts.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {accounts.map((account, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                width: "300px",
                textAlign: "center",
              }}
            >
              <h4>Account {index + 1}</h4>
              <p style={{ wordWrap: "break-word" }}>{account}</p>
              {/* <QRCode value={account} size={150} /> */}
              <button
                onClick={() => copyToClipboard(account)}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Copy Address
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No accounts found. Please connect MetaMask or import accounts.</p>
      )}
    </div>
  );
};

export default ReceiveETH;
