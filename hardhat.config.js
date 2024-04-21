const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const config = {
  solidity: "0.8.20",
  networks: {
    "stavanger": {
      url: "https://sn2-stavanger-rpc.eu-north-2.gateway.fm",
      chainId: 686669576,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  }
};

module.exports = config;
