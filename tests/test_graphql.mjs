// @ts-check
import assert from "node:assert";
import test from "node:test";

/**
 * GraphQLエンドポイントURL（環境変数から取得し、指定がなければデフォルトを使用）
 * @type {string}
 */
const ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/graphql";

/**
 * GraphQLリクエストを送信し、結果を返す関数
 * @param {string} query - GraphQLクエリ文字列
 * @param {Record<string, any>} [variables={}] - クエリに渡す変数のオブジェクト
 * @returns {Promise<any>} - GraphQLリクエストの結果データ
 */
async function graphqlRequest(query, variables = {}) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }
  return result.data;
}

test.describe("GraphQL API tests", () => {
  // テスト全体の前にデータをクリア
  test.before(async () => {
    const clearResult = await graphqlRequest(`mutation { cleanUp }`);
    assert.strictEqual(clearResult.cleanUp, true, "cleanUp should return true");
  });

  // 各テストの実行後にデータをクリア
  test.after(async () => {
    const clearResult = await graphqlRequest(`mutation { cleanUp }`);
    assert.strictEqual(
      clearResult.cleanUp,
      true,
      "cleanUp should return true after tests"
    );
  });

  // カテゴリ追加テスト
  test.it("should create a new category", async () => {
    const addCategoryResult = await graphqlRequest(
      `mutation ($name: String!) {
        addCategory(name: $name) {
          id
          name
        }
      }`,
      { name: "Sample Category" }
    );

    assert.strictEqual(
      addCategoryResult.addCategory.name,
      "Sample Category",
      "addCategory name"
    );

    // カテゴリが正しく追加されているか確認
    const categories = await graphqlRequest(`query { categories { id name } }`);
    assert.strictEqual(
      categories.categories.length,
      1,
      "categories count after addCategory"
    );
    assert.strictEqual(
      categories.categories[0].name,
      "Sample Category",
      "categories name after addCategory"
    );
  });

  // Todoの追加テスト
  test.it("should create a new todo item with category", async () => {
    const addCategoryResult = await graphqlRequest(
      `mutation ($name: String!) {
        addCategory(name: $name) {
          id
          name
        }
      }`,
      { name: "Test Category" }
    );

    const categoryId = addCategoryResult.addCategory.id;

    const addTodoResult = await graphqlRequest(
      `mutation ($title: String!, $description: String, $categoryId: ID!) {
        addTodo(title: $title, description: $description, categoryId: $categoryId) {
          id
          title
          description
          status
          category {
            id
            name
          }
        }
      }`,
      { title: "Test Todo", description: "This is a test", categoryId }
    );

    const todoId = addTodoResult.addTodo.id;
    assert.strictEqual(
      addTodoResult.addTodo.title,
      "Test Todo",
      "addTodo title"
    );
    assert.strictEqual(
      addTodoResult.addTodo.description,
      "This is a test",
      "addTodo description"
    );
    assert.strictEqual(
      addTodoResult.addTodo.status,
      "PENDING",
      "addTodo status"
    );
    assert.strictEqual(
      addTodoResult.addTodo.category.name,
      "Test Category",
      "addTodo category name"
    );

    // addTodo後のtodosクエリチェック
    const todosAfterAdd = await graphqlRequest(
      `query { todos { id title category { id name } } }`
    );
    assert.strictEqual(
      todosAfterAdd.todos.length,
      1,
      "todos count after addTodo"
    );
    assert.strictEqual(
      todosAfterAdd.todos[0].title,
      "Test Todo",
      "todos first title after addTodo"
    );
    assert.strictEqual(
      todosAfterAdd.todos[0].category.name,
      "Test Category",
      "todos first category name after addTodo"
    );
  });
});
