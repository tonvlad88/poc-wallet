// src/components/Account.tsx
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

  const [account, setAccount] = useState<Web3.eth.Account | null>(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const accounts = await web3Instance.eth.getAccounts();
          console.log('accounts', accounts)
          setAccounts(accounts);


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

  const handleImportAccount = () => {
    if (web3) {
      const importedAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
      setAccounts([...accounts, importedAccount.address]);
      setPrivateKey('')
    }
  };

  return (
    <div>
      <h2>View Accounts</h2>
      {accounts.length > 0 ? (
        <div>
          {accounts.map((account, index) => (
            <div key={index}>
              <p>Address: {account}</p>
              <p>Balance: {balances[account]} ETH</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No accounts found. Please connect MetaMask.</p>
      )}

      <div>
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter Private Key"
        />
        <button onClick={handleImportAccount}>Import Account</button>
      </div>
    </div>
  );
};

export default Account;
