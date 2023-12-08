import * as dotenv from "dotenv"; // 環境構築時にこのパッケージはインストールしてあります。
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

// .envファイルから環境変数をロードします。
dotenv.config();

if (process.env.TEST_ACCOUNT_PRIVATE_KEY === undefined) {
  console.log("private key is missing");
}

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    fuji: {
      url: "https://subnets.avax.network/lt0/testnet/rpc",
      chainId: 31330,
      accounts:
        process.env.TEST_ACCOUNT_PRIVATE_KEY !== undefined
          ? [process.env.TEST_ACCOUNT_PRIVATE_KEY]
          : [],
    },
  },
};

export default config;
