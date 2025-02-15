import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import HelloWorldABI from "./HelloWorld.json"; // Compile the contract and get ABI

const CONTRACT_ADDRESS = "0x64dc49b794d82190849CD15f59dDB0B5Ddc2e0f0";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchMessage() {
      if (window.ethereum) {
        // Access provider directly from ethers object
        const provider = new ethers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          HelloWorldABI,
          provider
        );
        const msg = await contract.getMessage();
        setMessage(msg);
      }
    }
    fetchMessage();
  }, []);

  return (
    <div>
      <h1>DApp Hello World</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
