import { ethers } from "hardhat";
import USDCTokenArtifact from "../artifacts/contracts/ERC20Tokens.sol/USDCToken.json";

async function createTransaction() {
  const USDC_ADDRESS = "";
  const PRIVATE_KEY = "";
  const SPENDER_ADDRESS = "";
  const CHAIN_ID = 31330;

  const wallet = new ethers.Wallet(PRIVATE_KEY);

  const usdc = new ethers.Contract(USDC_ADDRESS, USDCTokenArtifact.abi);

  const value = ethers.utils.parseEther("0.1");
  const data = usdc.interface.encodeFunctionData("approve", [
    SPENDER_ADDRESS,
    value,
  ]);

  // get nonce on server side
  // const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_URL_HERE");
  // const serverWallet = new ethers.Wallet(PRIVATE_KEY, provider);
  // const nonce = await serverWallet.getTransactionCount();

  const transaction = {
    to: USDC_ADDRESS,
    value: ethers.utils.parseEther("0.1"),
    gasLimit: 210000,
    gasPrice: ethers.utils.parseUnits("100", "gwei"),
    nonce: 1,
    data,
    chainId: CHAIN_ID,
  };

  const signedTransaction = await wallet.signTransaction(transaction);
  console.log(`signedTransaction: ${signedTransaction}`);

  // example of http request using axios
  // const url = "https://example.com/api/endpoint";
  // try {
  //   const response = await axios.post(url, data);
  //   console.log("Response:", response.data);
  // } catch (error) {
  //   console.error("Error:", error);
  // }
}

createTransaction()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
