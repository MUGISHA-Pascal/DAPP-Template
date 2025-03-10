import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SimpleStorageABI from "./HelloWorld.json";

const contractAddress = "0xF349aF4E1b3F5CD74F308d11f7e28B9E18a802e8";

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [signer, setSigner] = useState(null);
  const [helloMessage, setHelloMessage] = useState(
    "Connect wallet to fetch message"
  );

  useEffect(() => {
    checkWalletConnection();
  }, []);

  async function checkWalletConnection() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setWalletConnected(true);
        const signerInstance = await provider.getSigner();
        setSigner(signerInstance);
        fetchStoredValue(signerInstance);
      }
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signerInstance = await provider.getSigner();
    setWalletConnected(true);
    setSigner(signerInstance);
    alert("Wallet connected successfully!");

    fetchStoredValue(signerInstance);
  }

  async function getContract(signerInstance) {
    if (!signerInstance) return null;
    return new ethers.Contract(
      contractAddress,
      SimpleStorageABI.abi,
      signerInstance
    );
  }

  async function fetchStoredValue(signerInstance) {
    const contract = await getContract(signerInstance);
    if (contract) {
      try {
        const message = await contract.getMessage(); // Call Solidity function
        setHelloMessage(message);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Simple Storage DApp</h1>
      <h2>
        Greetings from the blockchain:{" "}
        <span style={styles.helloMessage}>{helloMessage}</span>
      </h2>
      <p style={styles.subtitle}>
        Store and retrieve values securely on the blockchain.
      </p>

      {!walletConnected ? (
        <button style={styles.button} onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <p style={styles.connectedMessage}>✅ Wallet Connected</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "50%",
    margin: "auto",
  },
  title: {
    color: "#333",
  },
  subtitle: {
    color: "#666",
  },
  helloMessage: {
    color: "#4CAF50",
    fontSize: "20px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },
  connectedMessage: {
    color: "#4CAF50",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default App;
