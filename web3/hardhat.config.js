/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = "https://mainnet.base.org";

module.exports = {
  defaultNetwork: "base_sepolia",
  networks: {
    hardhat: {
      chainId: 8453,
    },
    base_sepolia: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 84532,
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





