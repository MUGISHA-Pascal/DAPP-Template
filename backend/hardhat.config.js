require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0x56c41a406d02b17de7e3a5f4c73ac5e9461ec82cc3a7378b7826556d0f317b18",
      ],
    },
  },
};
