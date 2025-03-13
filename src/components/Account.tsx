import React, { useState, useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const Account: React.FC = () => {
  const walletContext = useContext(WalletContext);
  const [privateKey, setPrivateKey] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!walletContext) {
    return <p>Loading wallet data...</p>;
  }

  const { accounts, balances, addAccount } = walletContext;

  const handleImportAccount = async () => {
    try {
      await addAccount(privateKey);
      setPrivateKey("");
      setErrorMessage("");
    } catch (error: any) {
      if (error.message.toLowerCase().includes("invalid private key")) {
        setErrorMessage(
          "Invalid private key. Please provide a valid private key."
        );
      } else {
        setErrorMessage(
          "An error occurred while importing the account. Please try again."
        );
      }
      console.error("Error importing account:", error.message);
    }
  };

  return (
    <div>
      <h2>View Accounts</h2>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter Private Key"
        />
        <button onClick={handleImportAccount} style={{ marginLeft: "10px" }}>
          Import Account
        </button>
      </div>

      {errorMessage && (
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid red",
            borderRadius: "5px",
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
          }}
        >
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {accounts.length > 0 ? (
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
      ) : (
        <p>No accounts found. Please connect MetaMask.</p>
      )}
    </div>
  );
};

export default Account;
