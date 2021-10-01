import './App.css';
import React, { useEffect } from 'react';

function App() {
  const checkWallet = () => {
    const { ethereum } = window;

    ethereum
      ? console.log("Make sure your wallet is connected!")
      : console.log("Wallet is connected!", ethereum);
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
          I am Michael and I recent got interested in Web3 and NFTs!
          Connect your Ethereum Wallet and fistbump!
        </div>

        <button className="waveButton" onClick={wave}>
          Bump it! 🤛🏼
        </button>
      </div>
    </div>
  );
}

export default App;
