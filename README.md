# UNCHAIN AVALANCHE

### 1. AMM

ソースコード
avax-amm

参考動画
[DeFi 勉強会 第 13 回 「AMM の仕組み初級編」](https://www.youtube.com/live/Ky1smrd2mDI?si=Avc7yl2-wc-PX7YW)

# 環境設定ガイド

### 1. nvm のインストール

Mac の場合

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Windows の場合
以下の URL から公式ドキュメントに沿ってインストーラーをダウンロード
https://github.com/coreybutler/nvm-windows

### 2. node と yarn のインストール

```
$ nvm install 18.17.0
$ nvm use 18.17.0

$ npm install -g yarn
```

### 3. Core Wallet の 設定

1. [インストール方法](https://support.avax.network/en/articles/6066879-core-extension-how-do-i-add-the-core-extension) を参考にして Core Wallet を Chrome Extension としてインストールする
1. 左上のメニューから Advanced を選択して Testnet Mode をオンにする
1. Assets 画面の右下の View All Networks を選択
1. Networks タブを選択
1. Search で`LT0 Subnet`を検索して ⭐️ を選択してお気に入りに追加する
