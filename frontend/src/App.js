import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SimpleStorageABI from "./HelloWorld.json";

const contractAddress = "0x43440FC37D1E8Ac2Db93512628675F18b6b2a6b7";

function App() {
  const [userName, setUserName] = useState("");
  const [value, setValue] = useState("");
  const [storedValue, setStoredValue] = useState("Loading...");
  const [walletConnected, setWalletConnected] = useState(false);
  const [helloMessage, setHelloMessage] = useState("");
  const [yourName, setYourName] = useState("");
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    checkWalletConnection();
    fetchStoredValue();
  }, []);

  async function checkWalletConnection() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setWalletConnected(true);
        setSigner(await provider.getSigner());
      }
    }
  }

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletConnected(true);
      setSigner(await provider.getSigner());
      alert("Wallet Connected!");
      fetchStoredValue();
    } else {
      alert("Please install MetaMask.");
    }
  }

  async function getContract() {
    if (!signer) return null;
    return new ethers.Contract(contractAddress, SimpleStorageABI.abi, signer);
  }

  async function fetchStoredValue() {
    const contract = await getContract();
    if (contract) {
      const hello_message = contract.getMessage();
      setHelloMessage(hello_message);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Simple Storage DApp</h1>
      <h2>
        {" "}
        Greetings from the blockchain{" "}
        <span style={styles.helloMessage}>{helloMessage}</span>
      </h2>
      <p style={styles.subtitle}>
        Store and retrieve values securely on the blockchain.
      </p>

      {walletConnected && (
        <button style={styles.button} onClick={connectWallet}>
          Connect Wallet
        </button>
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
  welcomeMessage: {
    color: "#4CAF50",
    fontSize: "20px",
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginRight: "10px",
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
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  storedValue: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  helloMessage: {
    color: "#4CAF50",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default App;
