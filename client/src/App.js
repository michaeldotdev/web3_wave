import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkWallet = async () => {
    const { ethereum } = window;
    try {
      !ethereum
        ? console.log("Make sure your MetaMask wallet is connected!")
        : console.log("MetaMask Wallet is connected!", ethereum);

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }


  const wave = () => {

  }

  useEffect(() => {
    checkWallet()
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <h1>🤜🏼 Hey There!</h1>
        </div>

        <div className="bio">
          <h4>I am Michael and I recently got interested in Web3, building with Solidity and Ethereum</h4>
          <h4>Connect your Ethereum Wallet and fistbump!</h4>
        </div>

        <button className="waveButton" onClick={wave}>
          Bump it! 🤛🏼
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect MetaMask Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
