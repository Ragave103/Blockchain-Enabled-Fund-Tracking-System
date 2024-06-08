require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/0EhRlUT8xX54xsOftYdtcf9MC5Q-dfzs",
      accounts: [
        "be14ae8afa7dbf6e0204f8b39c32ced87cb1627f49869dd9a59d3fce0964a2eb",
      ],
    },
  },
  gasLimit: 100000,
};
