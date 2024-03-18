import { ethers } from "hardhat";

async function sendNativeToken() {
  const [sender] = await ethers.getSigners();

  const receiver = "0x7a8CEC8Ef52F76E6847c2F6F621002E4335c7f6e";
  const amountInEther = "0.01";
  const tx = {
    to: receiver,
    value: ethers.utils.parseEther(amountInEther),
  };

  const txReceipt = await sender.sendTransaction(tx);
  console.log(txReceipt);
}

sendNativeToken()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
