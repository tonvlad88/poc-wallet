import React, { useState, useContext } from "react";
import { WalletContext } from "../contexts/WalletContext";

const TransferETH: React.FC = () => {
  const walletContext = useContext(WalletContext);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  if (!walletContext) {
    return <p>Loading...</p>;
  }

  const { accounts, transferETH } = walletContext;

  const handleTransfer = async () => {
    try {
      if (!selectedAccount || !toAddress || !amount) {
        setErrorMessage("Please provide all required fields.");
        return;
      }

      await transferETH(selectedAccount, toAddress, amount);
      setSuccessMessage("Transaction successful!");
      setErrorMessage("");
      setToAddress("");
      setAmount("");
      setSelectedAccount("");
    } catch (error) {
      setErrorMessage("Failed to send ETH. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Transfer ETH</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        <option value="">Select an account</option>
        {accounts.map((account, index) => (
          <option key={index} value={account}>
            {account}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Send</button>
    </div>
  );
};

export default TransferETH;
