import React, { useState, useEffect } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const Account: React.FC = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [privateKey, setPrivateKey] = useState<string>("");
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);

          // Fetch balances for all accounts
          const balances: { [key: string]: string } = {};
          for (const account of accounts) {
            const balance = await web3Instance.eth.getBalance(account);
            balances[account] = web3Instance.utils.fromWei(balance, "ether");
          }
          setBalances(balances);
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      } else {
        console.error(
          "No Ethereum browser extension detected, install MetaMask!"
        );
      }
    };
    initializeWeb3();
  }, []);

 const handleImportAccount = async () => {
   if (web3) {
     try {
       // Convert private key to account using web3
       const importedAccount =
         web3.eth.accounts.privateKeyToAccount(privateKey);
       setAccounts((prevAccounts) => [
         ...prevAccounts,
         importedAccount.address,
       ]);

       // Fetch balance for the imported account
       const balance = await web3.eth.getBalance(importedAccount.address);
       setBalances((prevBalances) => ({
         ...prevBalances,
         [importedAccount.address]: web3.utils.fromWei(balance, "ether"),
       }));

       setPrivateKey(""); // Clear input after successful import
       setErrorMessage(""); // Clear any existing error messages
     } catch (error: any) {
       // General error handling
       console.error("Error importing account:", error.message);
       setErrorMessage(
         "Failed to import account. Please ensure the private key is correct and try again."
       );
     }
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

      {/* Error Notification */}
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
