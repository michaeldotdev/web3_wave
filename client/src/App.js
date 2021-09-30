import './App.css';

function App() {
  const wave = () => {

  }
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
