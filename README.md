# minimal-graphql-tutorial

GraphQL 未経験者のための最小限の GraphQL チュートリアルです。

開発するプログラミング言語やライブラリは不問でローカル環境で動く Todo アプリのクライアント・サーバを GraphQL を利用して作ってもらいます。

## 前提

- みんな自走して調べられることを前提にしてるので「GraphQL とは何か？」みたいなことは記載してません
  - 困ったら公式ドキュメントの https://graphql.org/ を読みましょう
- クライアント、サーバの課題は独立しているので興味のある方だけやるのも OK です
- サンプル実装を動かすには Node.js が必要になります

## 課題（サーバ実装）

- 事前に定義された [GraphQL スキーマ](./schema.graphql) を満たす Todo アプリの GraphQL サーバを実装してみてください
  - スキーマさえ満たしていれば開発言語や利用するライブラリはなんでもよいです
  - 「{任意の開発言語} graphql server」などで検索するとその言語でメジャーな GraphQL サーバ用のライブラリがヒットするはずなので、特にこだわりがなければそれを使いましょう
- このリポジトリで適当にブランチを切って進めてもらっても良いですし、GraphQL スキーマだけコピーして自分のプロジェクトで開発してもらっても良いです

### サンプル実装

- Node.js(TypeScript) + Apollo Server を利用したサンプルの実装が [samples/server](./samples/server/) ディレクトリに置いてあるので参考にしてみてください
- サンプル実装のサーバは以下のコマンドで立ち上がります

```sh
$ (cd samples/server && npm i && npm run start)
# http://localhost:4000/ で GraphQL サーバの開発ツールである Apollo Sandbox にアクセス可能
```

### E2E テストの実施

- サーバ実装には簡易的な E2E テストを用意しています

```sh
# 実装したサーバを立ち上げる（例としてサンプル実装のサーバを立ち上げる）
$ (cd samples/server && npm i && npm run start)
# テストを実行する（要 node.js）
$ node --test tests/test_graphql.mjs
# エンドポイントをカスタムしたい場合は以下のように環境変数経由で渡す
$ GRAPHQL_ENDPOINT=http://localhost:4000 node --test tests/test_graphql.mjs
```

## 課題（クライアント実装）

- 事前に定義された [GraphQL スキーマ](./schema.graphql) を満たす GraphQL サーバを利用して、Todo アプリのクライアントを実装してみてください
  - 開発言語や利用するライブラリ、プラットフォームはなんでもよいです
  - 「{任意の開発言語/プラットフォーム} graphql client」などで検索するとその言語でメジャーな GraphQL クライアント用のライブラリがヒットするはずなので、特にこだわりがなければそれを使いましょう
- このリポジトリで適当にブランチ切って進めてもらっても良いですし、GraphQL スキーマだけコピーして自分のプロジェクトで開発してもらっても良いです
- クライアントの課題のみ行う場合は後述するサンプル実装のサーバと繋ぎ込むと動作確認が可能になります

### サンプル実装

- React(TypeScript) + Apollo Client を利用したサンプルの実装が [samples/client](./samples/client/) ディレクトリに置いてあるので参考にしてみてください
- サンプル実装のアプリケーションは以下のコマンドで立ち上がります

```sh
# サンプル実装のサーバを立ち上げる
$ (cd samples/server && npm i && npm run start)
# ターミナルで別のタブを開いてサンプル実装のクライアントを立ち上げる
$ (cd samples/client && npm i && npm run start)
# http://localhost:5173/ にアクセス
```

以下、サンプル実装のデモ動画です。

https://github.com/user-attachments/assets/49a96e0a-1d02-4706-81ca-e4fef9539239

### クライアントアプリケーションの仕様

最低限満たしてほしい仕様は以下になります。

- Todo を追加できる
- Todo のステータスを完了にできる
- Todo を削除できる
- カテゴリを追加できる
- カテゴリを Todo に関連づけられる

## 追加演習

余裕があればやってみてください。

- GraphQL サーバの実装手法であるスキーマファーストとコードファーストの違いについて簡単に調べてみてください
  - ちなみにサンプル実装のサーバはスキーマファーストのアプローチを取っています
- （静的型付け言語の場合）GraphQL のスキーマから各言語の型を生成し、GraphQL のスキーマと実装が違う場合には静的にエラーが検知できるようにしてみてください
  - サンプル実装ではクライアント・サーバともにすでにそうなっていて、[GraphQL Codegen](https://the-guild.dev/graphql/codegen) を使って型を生成しています
- カテゴリを削除できるようにしてみてください
  - サーバ側にも手を加えないといけなそうなので、できる人だけで
- カテゴリごとの Todo 一覧を表示できるようにしてみてください
  - サーバ側にも手を加えないといけなそうなので、できる人だけで

## このチュートリアルで習得できること・できないこと

### 習得できること

- GraphQL の基本的な型に触れる
  - String, ID, Enum, Non-Null, List など
- GraphQL Schema の読み書き
- Query/Mutation の読み書き
- 簡易な Resolver の実装
- （オプション）GraphQL ツールチェインによるコードの自動生成

### 習得できないこと

このチュートリアルの内容には含んでいませんが、興味があれば学んでみてください。

- 応用的な型
  - Interface, Union, Directives など
  - https://graphql.org/learn/schema/
- Subscription
  - GraphQL でクライアントがサーバからリアルタイムにデータの更新を受け取る仕組み
  - https://graphql.org/learn/subscriptions/
- Introspection
  - GraphQL スキーマの構造や型情報をクエリを用いて取得できる仕組み
  - https://graphql.org/learn/introspection/
- Relay による拡張仕様（主に Pagination 周り）
  - Connection, Edge, Node など
  - https://graphql.org/learn/pagination/
