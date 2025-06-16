/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = "b4e68828fdcbfd06d805dc68ec24638bd4c973d1a6decf0553823131df864294"; // No '0x' prefix
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
