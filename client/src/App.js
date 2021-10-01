import { abi } from "./utils/FistBumpPortal.json";
import './App.css';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

function App() {
  const [allFistBumps, setAllFistBumps] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");



  //After smart contract deployment, variable to hold contract address
  const contractAddress = "0x09a9438C25338C4fbB3366904dF1b395E926E981";

  //copy artifact content to utils/json - create varible
  const contractABI = abi;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllFistBumps = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const fistBumpContract = new ethers.Contract(contractAddress, contractABI, signer);

        // calls getAllFistBumps func from Smart Contract
        const fistBumps = await fistBumpContract.getAllFistBumps();

        let filterFistBumps = [];

        fistBumps.forEach(fistBump => {
          filterFistBumps.push({
            address: fistBump.fistBumpFrom,
            timestamp: new Date(fistBump.timestamp * 1000),
            message: fistBump.message
          });
        });

        setAllFistBumps(filterFistBumps);
      } else {
        console.log("Ethereum object does not exist!");
      }
    } catch (error) {
      console.error(error)
    }
  }

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


  const fistBump = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const fistBumpContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await fistBumpContract.getTotalFistBumps();
        console.log("Retrieve total fistBump count...", count.toNumber());

        const fistBumpTxn = await fistBumpContract.fistBump('this is a message');
        console.log('Mining...', fistBumpTxn.hash);

        await fistBumpTxn.wait();
        console.log("Mined -- ", fistBumpTxn.hash);

        count = await fistBumpContract.getTotalFistBumps();
        console.log("Retrieve total fistbump count...", count.toNumber());

      } else {
        console.log("Ethereum object does not exist!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    checkWallet()
  }, [])

  useEffect(() => {
    if (currentAccount) {
      getAllFistBumps()
    }
  }, [currentAccount, getAllFistBumps])

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

        <button className="waveButton" onClick={fistBump}>
          Bump it! 🤛🏼
        </button>
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect MetaMask Wallet
          </button>
        )}

        {allFistBumps.map((fistBump, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {fistBump.address}</div>
              <div>Time: {fistBump.timestamp.toString()}</div>
              <div>Message: {fistBump.message}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
