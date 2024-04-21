const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const UserManagement = await ethers.getContractFactory("UserManagement");
  console.log("Deploying UserManagement contract...");
  const userManagement = await UserManagement.deploy();
  console.log("UserManagement contract deployed to:", userManagement.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
