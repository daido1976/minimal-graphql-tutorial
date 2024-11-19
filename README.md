# minimal-graphql-tutorial

graphql 未経験者のための最小限の graphql チュートリアルです。

## テストの実施

実装したサーバを立ち上げて以下を実行する。

```sh
node --test tests/test_graphql.mjs
# エンドポイントをカスタムしたい場合は以下のように環境変数経由で渡す
GRAPHQL_ENDPOINT=http://localhost:4000 node --test tests/test_graphql.mjs
```
