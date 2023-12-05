import { BigNumber, ethers } from "ethers";
import { useEffect, useState, useCallback } from "react";

import { USDCToken as UsdcContractType } from "../typechain-types";
import { JOEToken as JoeContractType } from "../typechain-types";
import { AMM as AmmContractType } from "../typechain-types";
import AmmArtifact from "../utils/AMM.json";
import { getEthereum } from "../utils/ethereum";
import UsdcArtifact from "../utils/USDCToken.json";
import JoeArtifact from "../utils/USDCToken.json";

export const UsdcAddress = "0x96531723D1bE9002b2002F5469e90547937Dfa17";
export const JoeAddress = "0xFCd2058bDa35Dd74A30892c2b999DFb3E7e86B91";
export const AmmAddress = "0x572A0a02c436c70433A71D3B9053C5c1Ef928138";

export type TokenType = {
  symbol: string;
  contract: UsdcContractType | JoeContractType;
};

export type AmmType = {
  sharePrecision: BigNumber;
  contract: AmmContractType;
};

type ReturnUseContract = {
  usdc: TokenType | undefined;
  joe: TokenType | undefined;
  amm: AmmType | undefined;
};

export const useContract = (
  currentAccount: string | undefined
): ReturnUseContract => {
  const [usdc, setUsdc] = useState<TokenType>();
  const [joe, setJoe] = useState<TokenType>();
  const [amm, setAmm] = useState<AmmType>();
  const ethereum = getEthereum();

  const getContract = useCallback(
    (
      contractAddress: string,
      abi: ethers.ContractInterface,
      storeContract: (_: ethers.Contract) => void
    ) => {
      if (!ethereum) {
        console.log("Ethereum object doesn't exist!");
        return;
      }
      if (!currentAccount) {
        // ログインしていない状態でコントラクトの関数を呼び出すと失敗するため
        // currentAccountがundefinedの場合はcontractオブジェクトもundefinedにします。
        console.log("currentAccount doesn't exist!");
        return;
      }
      try {
        const provider = new ethers.providers.Web3Provider(
          ethereum as unknown as ethers.providers.ExternalProvider
        );
        const signer = provider.getSigner(); // 簡易実装のため、引数なし = 初めのアカウント(account#0)を使用する
        const Contract = new ethers.Contract(contractAddress, abi, signer);
        storeContract(Contract);
      } catch (error) {
        console.log(error);
      }
    },
    [ethereum, currentAccount]
  );

  const generateUsdc = async (contract: UsdcContractType) => {
    try {
      const symbol = await contract.symbol();
      setUsdc({ symbol: symbol, contract: contract } as TokenType);
    } catch (error) {
      console.log(error);
    }
  };

  const generateJoe = async (contract: UsdcContractType) => {
    try {
      const symbol = await contract.symbol();
      setJoe({ symbol: symbol, contract: contract } as TokenType);
    } catch (error) {
      console.log(error);
    }
  };

  const generateAmm = async (contract: AmmContractType) => {
    try {
      const precision = await contract.PRECISION();
      setAmm({ sharePrecision: precision, contract: contract } as AmmType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContract(UsdcAddress, UsdcArtifact.abi, (Contract: ethers.Contract) => {
      generateUsdc(Contract as UsdcContractType);
    });
    getContract(JoeAddress, JoeArtifact.abi, (Contract: ethers.Contract) => {
      generateJoe(Contract as JoeContractType);
    });
    getContract(AmmAddress, AmmArtifact.abi, (Contract: ethers.Contract) => {
      generateAmm(Contract as AmmContractType);
    });
  }, [ethereum, currentAccount, getContract]);

  return {
    usdc,
    joe,
    amm,
  };
};
