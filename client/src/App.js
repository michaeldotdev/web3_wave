import './App.css';
import React, { useEffect } from 'react';

function App() {
  const checkWallet = () => {
    const { ethereum } = window;

    ethereum
      ? console.log("Wallet is connected!", ethereum)
      : console.log("Make sure your wallet is connected!");
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
      </div>
    </div>
  );
}

export default App;
