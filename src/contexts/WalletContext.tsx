// src/contexts/WalletContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import Web3 from "web3";

export interface WalletContextType {
  accounts: string[];
  balances: { [key: string]: string };
  addAccount: (privateKey: string) => Promise<void>;
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const fetchedAccounts = await web3Instance.eth.getAccounts();
          setAccounts(fetchedAccounts);

          // Fetch balances
          const fetchedBalances: { [key: string]: string } = {};
          for (const account of fetchedAccounts) {
            const balance = await web3Instance.eth.getBalance(account);
            fetchedBalances[account] = web3Instance.utils.fromWei(
              balance,
              "ether"
            );
          }
          setBalances(fetchedBalances);
        } catch (error) {
          console.error("Error initializing Web3:", error);
        }
      }
    };
    initializeWeb3();
  }, []);

  const addAccount = async (privateKey: string) => {
    if (web3) {
      try {
        const newAccount = web3.eth.accounts.privateKeyToAccount(privateKey);
        setAccounts((prevAccounts) => [...prevAccounts, newAccount.address]);

        const balance = await web3.eth.getBalance(newAccount.address);
        setBalances((prevBalances) => ({
          ...prevBalances,
          [newAccount.address]: web3.utils.fromWei(balance, "ether"),
        }));
      } catch (error) {
        console.error("Error adding account:", error);
        throw error; 
      }
    }
  };

  return (
    <WalletContext.Provider value={{ accounts, balances, addAccount }}>
      {children}
    </WalletContext.Provider>
  );
};
