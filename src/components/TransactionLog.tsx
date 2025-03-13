import React, { useEffect, useState } from "react";
import Web3 from "web3";

const TransactionLog: React.FC = () => {
  const [transactions, setTransactions] = useState<Web3.eth.Log[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      const txs = await web3.eth.getPastLogs({
        address: accounts[0],
      });
      setTransactions(txs);
    };
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction Log</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>{tx.transactionHash}</li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionLog;
