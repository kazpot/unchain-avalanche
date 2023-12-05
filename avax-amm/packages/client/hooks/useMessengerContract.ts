import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { Messenger as MessengerType } from "../typechain-types";
import { getEthereum } from "../utils/ethereum";
import abi from "../utils/Messenger.json";

const contractAddress = "あなたのコントラクトのデプロイ先アドレス";
const contractABI = abi.abi;

export type Message = {
  sender: string;
  receiver: string;
  depositInWei: BigInt;
  timestamp: Date;
  text: string;
  isPending: boolean;
};

// sendMessageの引数のオブジェクトの型定義です。
type PropsSendMessage = {
  text: string;
  receiver: string;
  tokenInEther: string;
};

// useMessengerContractの返すオブジェクトの型定義です。
type ReturnUseMessengerContract = {
  processing: boolean;
  ownMessages: Message[];
  sendMessage: (props: PropsSendMessage) => void;
};

// useMessengerContractの引数のオブジェクトの型定義です。
type PropsUseMessengerContract = {
  currentAccount: string | undefined;
};

export const useMessengerContract = ({
  currentAccount,
}: PropsUseMessengerContract): ReturnUseMessengerContract => {
  // トランザクションの処理中のフラグを表す状態変数。
  const [processing, setProcessing] = useState<boolean>(false);
  // Messengerコントラクトのオブジェクトを格納する状態変数。
  const [messengerContract, setMessengerContract] = useState<MessengerType>();
  // ユーザ宛のメッセージを配列で保持する状態変数。
  const [ownMessages, setOwnMessages] = useState<Message[]>([]);

  // ethereumオブジェクトを取得します。
  const ethereum = getEthereum();

  function getMessengerContract() {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(
          ethereum as unknown as ethers.providers.ExternalProvider
        );
        const signer = provider.getSigner();
        const MessengerContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        ) as MessengerType;
        setMessengerContract(MessengerContract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getOwnMessages() {
    if (!messengerContract) return;
    try {
      const OwnMessages = await messengerContract.getOwnMessages();
      const messagesCleaned: Message[] = OwnMessages.map((message) => {
        return {
          sender: message.sender,
          receiver: message.receiver,
          depositInWei: message.depositInWei,
          timestamp: new Date(message.timestamp.toNumber() * 1000),
          text: message.text,
          isPending: message.isPending,
        };
      });
      setOwnMessages(messagesCleaned);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage({
    text,
    receiver,
    tokenInEther,
  }: PropsSendMessage) {
    if (!messengerContract) return;
    try {
      const tokenInWei = ethers.utils.parseEther(tokenInEther);
      console.log(
        "call post with receiver:[%s], token:[%s]",
        receiver,
        tokenInWei.toString()
      );
      const txn = await messengerContract.post(text, receiver, {
        gasLimit: 300000,
        value: tokenInWei,
      });
      console.log("Processing...", txn.hash);
      setProcessing(true);
      await txn.wait();
      console.log("Done -- ", txn.hash);
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessengerContract();
    getOwnMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount, ethereum]);

  useEffect(() => {
    // NewMessageのイベントリスナ
    const onNewMessage = (
      sender: string,
      receiver: string,
      depositInWei: BigNumber,
      timestamp: BigNumber,
      text: string,
      isPending: boolean
    ) => {
      console.log("NewMessage from %s to %s", sender, receiver);
      // 自分宛のメッセージの場合ownMessagesを編集します。
      // 各APIの使用によりアドレス英字が大文字小文字の違いが出る場合がありますが、その違いはアドレス値において区別されません。
      if (receiver.toLocaleLowerCase() === currentAccount) {
        setOwnMessages((prevState) => [
          ...prevState,
          {
            sender: sender,
            receiver: receiver,
            depositInWei: depositInWei,
            timestamp: new Date(timestamp.toNumber() * 1000),
            text: text,
            isPending: isPending,
          },
        ]);
      }
    };

    /* イベントリスナの登録をします */
    if (messengerContract) {
      messengerContract.on("NewMessage", onNewMessage);
    }

    /* イベントリスナの登録を解除します */
    return () => {
      if (messengerContract) {
        messengerContract.off("NewMessage", onNewMessage);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messengerContract]);

  return {
    processing,
    ownMessages,
    sendMessage,
  };
};
