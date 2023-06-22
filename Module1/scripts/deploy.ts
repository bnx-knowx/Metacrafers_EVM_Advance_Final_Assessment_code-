import { ethers } from "hardhat";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther("0.001");

  const TokenVesting = await ethers.getContractFactory("TokenVesting");
  //const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  const contract = await TokenVesting.deploy();

  await contract.deployed();
  const val = await contract.msgg()
  console.log(
    `Lock with ${ethers.utils.formatEther(lockedAmount)}ETH and unlock timestamp ${unlockTime} deployed to ${contract.address}`
  );
  console.log(`account address is ${contract.address} ----- ${val}`);

/*  contract.on("mint", (Organization_name,Organization_Token_name,Organization_token_abbreviation,Organization_token_totall_supply) => {
    console.log(`Organization_name is ${Organization_name} Organization_Token_name is ${Organization_Token_name} Organization_token_abbreviation is ${Organization_token_abbreviation} Organization_token_totall_supply is ${Organization_token_totall_supply} `)
  })
*/
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
