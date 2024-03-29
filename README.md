# UNCHAIN AVALANCHE

### 1. AMM

チュートリアルページ old (2024 年 1 月 31 日まで): https://app.unchain.tech/learn/AVAX-AMM/

チュートリアルページ new: https://github.com/unchain-tech/UNCHAIN-projects/tree/main/docs/AVAX-AMM/ja

ソースコード: avax-amm ディレクトリ

参考動画: [DeFi 勉強会 第 13 回 「AMM の仕組み初級編」](https://www.youtube.com/live/Ky1smrd2mDI?si=Avc7yl2-wc-PX7YW)

# 環境設定ガイド

### 1. Visual Studio Code (VSCode のインストール)

- https://code.visualstudio.com/download

- スマートコントラクト開発におすすめなエクステンション

  - Solidity by nomic foundation (Solidity and Hardhat support by the Hardhat team)
  - Prettier

- Solidity 自動フォーマットの設定 (contract の workspace の設定が終わって Solidity ファイルを作成した後)

  - packages/contract の下の package.json に以下を追加して`yarn install`

    ```
        "prettier": "^3.1.1",
        "prettier-plugin-solidity": "^1.2.0",
    ```

  - mac の場合: command + shift + p, windows の場合: ctl + shift + p

    - ">"で始まる検索窓が出てくるので、 settings で検索し、`Preferences: Open User Settings (JSON)`を選択
    - settings.json 内に以下の設定を貼り付ける

    ```json
    {
      "editor.formatOnSave": true,
      "[solidity]": {
        "editor.defaultFormatter": "NomicFoundation.hardhat-solidity"
      }
    }
    ```

    - 参考
      - https://hardhat.org/hardhat-vscode/docs/formatting

### 2. git のインストール

- Mac の場合
  - https://git-scm.com/download/mac
- Windows の場合
  - https://git-scm.com/download/win
  - 参考ページ: https://www.curict.com/item/60/60bfe0e.html
- proxy 環境で使用する場合

```
$ git config --global http.proxy http://proxyUsername:proxyPassword@proxy.server.com:port
```

### 3. nvm のインストール

Mac の場合

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Windows の場合
以下の URL の Assets からインストーラー(nvm-setup.exe)をダウンロード
https://github.com/coreybutler/nvm-windows/releases/tag/1.1.12

参考
https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/

### 4. node と yarn のインストール

```
$ nvm install 18.17.0
$ nvm use 18.17.0

// node バージョンの確認、バージョンが表示されればOK
$ node --version

$ npm install -g yarn
```

proxy 環境で使用する場合

```
$ npm -g config set proxy http://proxyserver:8080
$ npm -g config set https-proxy http://proxyserver:8080
```

### 5. Hardhat の proxy 設定

1. pacakges/contract の下に.env ファイルを作成する
2. 以下の環境変数を設定

```
HTTP_PROXY=http://proxyserver:8080
HTTPS_PROXY=http://proxyserver:8080
```

### 6. Core Wallet の 設定

1. [インストール方法](https://support.avax.network/en/articles/6066879-core-extension-how-do-i-add-the-core-extension) を参考にして Core Wallet を Chrome Extension としてインストールする
1. 左上のメニューから Advanced を選択して Testnet Mode をオンにする
1. Assets 画面の右下の View All Networks を選択
1. Networks タブを選択
1. Search で`LT0 Subnet`を検索して ⭐️ を選択してお気に入りに追加する

### 7. Core Wallet から 16 進数の秘密鍵をエクスポート

1. Core Wallet のトップ画面の上の真ん中に表示されているアカウント名を選択
2. Main または Imported のタブを選択し各アカウントの右下にある...メニューを選択
3. `Show Private Key` を選択
4. パスワードを入力すると秘密鍵が 16 進数で表示される
5. `0x` で始まる鍵が出力されるので先頭の `0x` の部分を抜いてコントラクトのデプロイに必要な時に(Lesson3 のコントラクトをテストネットにデプロイしましょう) packages/contract 以下の.env に下記のように記述します
   TEST_ACCOUNT_PRIVATE_KEY="YOUR_PRIVATE_KEY"

### Solidity 基礎

- [Solidity 基礎](https://my-organization-23.gitbook.io/solidity-basic/)

### 役に立つツール

- [単位変換ツール](https://subnets.avax.network/tools/unit-converter/)

### 公式ドキュメント

- [Solidity 公式ドキュメント](https://docs.soliditylang.org/en/latest)
- [Solidity 公式ドキュメント(和訳)](https://solidity-jp.readthedocs.io/ja/latest/)
- [OpenZeppelin 公式ドキュメント](https://docs.openzeppelin.com/contracts)
- [TESTING SMART CONTRACTS](https://ethereum.org/en/developers/docs/smart-contracts/testing/)
- [SMART CONTRACT SECURITY](https://ethereum.org/en/developers/docs/smart-contracts/security/)
