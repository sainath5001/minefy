
const { ethers } = require("hardhat");

async function deployContract() {
  const signers = await ethers.getSigners();
  const deployer = signers[0]; // Assuming you want the first signer as the deployer
  console.log(deployer.address);

  // Specify the contract's ABI and bytecode
  const ExperienceLetterToken = await ethers.getContractFactory("ExperienceLetter");
  const contract = await ExperienceLetterToken.deploy();

  await contract.deployContract; 

  console.log("Contract deployed to:", contract.address);
}

deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// module.exports = async ({getNamedAccounts, deployments}) => {
//   const {deploy} = deployments;
//   const {deployer} = await getNamedAccounts();
//   await deploy('ExperienceLetter', {
//     from: deployer,
//     args: ['Hello'],
//     log: true,
//   });
// };
// module.exports.tags = ['ExperienceLetter'];
