# minimal-graphql-tutorial

GraphQL 未経験者のための最小限の GraphQL チュートリアルです。

開発する言語、ライブラリ、プラットフォームは不問でローカル環境で動く Todo アプリのクライアント・サーバを GraphQL を利用して作ってもらいます。

クライアント、サーバの課題は独立しているので興味のある方だけやるのも OK です。

## チュートリアル（サーバ）

事前に定義された [GraphQL スキーマ](./schema.graphql) を満たす Todo アプリの GraphQL サーバを実装してみましょう。

スキーマさえ満たしていれば開発言語や利用するライブラリはなんでもよいです。

「{任意の開発言語} graphql server」などで検索するとその言語でメジャーな GraphQL サーバ用のライブラリがヒットするはずなので、それを使いましょう。もしくは生成 AI に聞いても良いでしょう。

Node.js(TypeScript) + Apollo Server を利用したサンプルの実装が [samples/server](./samples/server/) ディレクトリに置いてあるので参考にしてみてください。

### テストの実施

サーバ実装には簡易的な E2E テストを用意しています。

```sh
# 実装したサーバを立ち上げる（例としてサンプル実装のサーバを立ち上げる）
$ (cd samples/server && npm i && npm run start)
# テストを実行する（要 node.js）
node --test tests/test_graphql.mjs
# エンドポイントをカスタムしたい場合は以下のように環境変数経由で渡す
GRAPHQL_ENDPOINT=http://localhost:4000 node --test tests/test_graphql.mjs
```

## チュートリアル（クライアント）

事前に定義された [GraphQL スキーマ](./schema.graphql) を満たす GraphQL サーバを利用して、Todo アプリのクライアントを実装しましょう。

開発言語や利用するライブラリ、プラットフォームはなんでもよいです。

「{任意の開発言語/プラットフォーム} graphql client」などで検索するとその言語でメジャーな GraphQL クライアント用のライブラリがヒットするはずなので、それを使いましょう。もしくは生成 AI に聞いても良いでしょう。

React(TypeScript) + Apollo Client を利用したサンプルの実装が [samples/client](./samples/client/) ディレクトリに置いてあるので参考にしてみてください。

### クライアントアプリケーションの仕様

最低限満たしてほしい仕様は以下になります。

- Todo を追加できる
- Todo のステータスを完了にできる
- Todo を削除できる
- カテゴリを追加できる
- カテゴリを Todo に関連づけられる

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
  - Interface, Union, Directives
  - https://graphql.org/learn/schema/
- Subscription
  - https://graphql.org/learn/subscriptions/
- Introspection
  - https://graphql.org/learn/introspection/
- Relay による拡張仕様（主に Pagination 周り）
  - Connection, Edge, Node
  - https://graphql.org/learn/pagination/
