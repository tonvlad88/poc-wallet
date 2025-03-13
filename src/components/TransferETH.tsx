import React, { useState } from "react";
// import Web3 from "web3";

const TransferETH: React.FC = () => {
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleTransfer = async () => {
    // const web3 = new Web3(Web3.givenProvider);
    // const accounts = await web3.eth.getAccounts();
    // const result = await web3.eth.sendTransaction({
    //   from: accounts[0],
    //   to: toAddress,
    //   value: web3.utils.toWei(amount, "ether"),
    // });
    // setTransactionHash(result.transactionHash);
  };

  return (
    <div>
      <h2>Transfer ETH</h2>
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
      />
      <button onClick={handleTransfer}>Send</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default TransferETH;
