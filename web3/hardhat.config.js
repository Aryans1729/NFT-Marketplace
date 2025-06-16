/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY; // No '0x' prefix
const RPC_URL = "https://mainnet.base.org"; // Official Base Mainnet RPC

module.exports = {
  defaultNetwork: "base_mainnet",
  networks: {
    hardhat: {
      chainId: 8453,
    },
    base_mainnet: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 8453,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
