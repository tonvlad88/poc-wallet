import React, { useState, useContext } from "react";
import Web3 from "web3";
import { WalletContext } from "../contexts/WalletContext";

const TransferETH: React.FC = () => {
  const walletContext = useContext(WalletContext); // Access the WalletContext
  const [selectedAccount, setSelectedAccount] = useState<string>(""); // Track the selected account
  const [toAddress, setToAddress] = useState<string>(""); // Track the recipient address
  const [amount, setAmount] = useState<string>(""); // Track the amount to send
  const [transactionHash, setTransactionHash] = useState<string | null>(null); // Store transaction hash
  const [errorMessage, setErrorMessage] = useState<string>(""); // Track errors
  const [successMessage, setSuccessMessage] = useState<string>(""); // Track success messages

  if (!walletContext) {
    return <p>Loading wallet data...</p>; // Handle loading state
  }

  const { accounts } = walletContext; // Extract accounts from context

  const handleTransfer = async () => {
    try {
      if (!selectedAccount || !toAddress || !amount) {
        setErrorMessage(
          "Please provide all required information (account, recipient, and amount)."
        );
        return;
      }

      // Create a web3 instance
      // const web3 = new Web3(Web3.givenProvider);
      const web3 = new Web3("HTTP://127.0.0.1:7545");

      // Send the transaction
      const result = await web3.eth.sendTransaction({
        from: selectedAccount, 
        to: toAddress,
        value: web3.utils.toWei(amount, "ether"), 
      });

      console.log('result', result)

      // Update transaction hash and success message
      setTransactionHash(result.transactionHash.toString());
      setSuccessMessage(
        `Transaction successful! Hash: ${result.transactionHash}`
      );
      setErrorMessage(""); // Clear previous errors
      setToAddress("");
      setAmount("");
      setSelectedAccount("");
    } catch (error: any) {
      console.error("Error sending transaction:", error);
      setErrorMessage("Failed to send transaction. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2>Transfer ETH</h2>

      {/* Error Notification */}
      {errorMessage && (
        <div
          style={{
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

      {/* Success Notification */}
      {successMessage && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid green",
            borderRadius: "5px",
            backgroundColor: "#e6ffe6",
            color: "#008000",
          }}
        >
          <strong>Success:</strong> {successMessage}
        </div>
      )}

      {/* Account Dropdown */}
      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "10px",
          width: "100%",
        }}
      >
        <option value="">Select an account</option>
        {accounts.map((account, index) => (
          <option key={index} value={account}>
            {account}
          </option>
        ))}
      </select>

      {/* Input Fields for Recipient and Amount */}
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="Recipient Address"
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button onClick={handleTransfer} style={{ marginTop: "10px" }}>
        Send
      </button>

      {/* Display Transaction Hash */}
      {transactionHash && (
        <div style={{ marginTop: "20px" }}>
          <p>
            Transaction Hash:{" "}
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default TransferETH;
