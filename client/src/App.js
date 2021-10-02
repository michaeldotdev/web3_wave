import { abi } from "./utils/FistBumpPortal.json";
import './App.css';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

function App() {
  const [allFistBumps, setAllFistBumps] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");
  const [message, setMessage] = useState("");
  const [songLink, setSongLink] = useState("");

  //After smart contract deployment, variable to hold contract address
  const contractAddress = "0x26C11BAdEFcBA76606Bd55A04040d5C70BD727B9";

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
            message: fistBump.message,
            link: fistBump.link,
            timestamp: new Date(fistBump.timestamp * 1000),
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

        const fistBumpTxn = await fistBumpContract.fistBump(message, songLink);
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

        {currentAccount && (
          <form action="">
            <div>
              <textarea
                className="messageBox"
                id="message"
                name="message"
                onChange={event => setMessage(event.target.value)}
                placeholder="Please leave me a message!"
                required>
              </textarea>
            </div>

            <div>
              <input
                className="linkInput"
                id="songLink"
                name="songLink"
                onChange={event => setSongLink(event.target.value)}
                placeholder="Please link your favorite song!"
                type="url"
                required
              />
            </div>
          </form>
        )}

        {currentAccount && (
          <button className="fistBumpButton" onClick={fistBump}>
            Bump it! 🤛🏼
          </button>
        )}

        {!currentAccount && (
          <button className="fistBumpButton" onClick={connectWallet}>
            Connect MetaMask Wallet
          </button>
        )}

        <h2>People who already fistbump'd!</h2>


        {allFistBumps.map((fistBump, index) => {
          return (
            <div className="message" key={index}>
              <div>Message: {fistBump.message}</div>
              <div>Song Link: {fistBump.link}</div>
              <div>Address: {fistBump.address}</div>
              <div>Time: {fistBump.timestamp.toString()}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
