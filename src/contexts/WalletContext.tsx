import React, { createContext, useState, ReactNode } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface WalletContextType {
  accounts: string[];
  balances: { [key: string]: string };
  transactionLogs: TransactionLog[];
  addAccount: (privateKey: string) => Promise<void>;
  transferETH: (from: string, to: string, amount: string) => Promise<void>;
}

interface TransactionLog {
  from: string;
  to: string;
  amount: string;
  transactionHash: string;
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [transactionLogs, setTransactionLogs] = useState<TransactionLog[]>([]);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  React.useEffect(() => {
    const initializeWeb3 = async () => {
      if (window?.ethereum) {
        try {
          await window?.ethereum.request({ method: "eth_requestAccounts" });
          const web3Instance = new Web3(window?.ethereum);
          setWeb3(web3Instance);

          const fetchedAccounts = await web3Instance.eth.getAccounts();
          setAccounts(fetchedAccounts);

          // Fetch balances for all accounts
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
        throw error; // Propagate error for the caller to handle
      }
    }
  };

  const transferETH = async (from: string, to: string, amount: string) => {
    if (web3) {
      try {
        // Convert amount to Wei
        const amountInWei = web3.utils.toWei(amount, "ether");

        // Perform the transaction
        const result = await web3.eth.sendTransaction({
          from,
          to,
          value: amountInWei,
        });

        // Deduct balance from the sender
        const senderBalance = await web3.eth.getBalance(from);
        setBalances((prevBalances) => ({
          ...prevBalances,
          [from]: web3.utils.fromWei(senderBalance, "ether"),
        }));

        // Check if the recipient exists in the context
        if (accounts.includes(to)) {
          const recipientBalance = await web3.eth.getBalance(to);
          setBalances((prevBalances) => ({
            ...prevBalances,
            [to]: web3.utils.fromWei(recipientBalance, "ether"),
          }));
        }

        // Log the transaction
        setTransactionLogs((prevLogs) => [
          ...prevLogs,
          {
            from,
            to,
            amount,
            transactionHash: result.transactionHash.toString(),
          },
        ]);
      } catch (error) {
        console.error("Error transferring ETH:", error);
        throw error; // Propagate error for the caller to handle
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        accounts,
        balances,
        transactionLogs,
        addAccount,
        transferETH,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
