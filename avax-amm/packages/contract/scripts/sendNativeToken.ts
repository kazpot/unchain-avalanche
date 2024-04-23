import { ethers } from "hardhat";

async function sendNativeToken() {
  const [sender] = await ethers.getSigners();

  const receiver = "0x5829c85e4c68c4f799EC3D4B68D3C4950fa2E815";
  const amountInEther = "100";
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
