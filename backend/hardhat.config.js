require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0x111dacf4ced8b23b6c089afecce7c8b637bed282a154d5dbc5989ee4d5644f7c",
      ],
    },
  },
};
