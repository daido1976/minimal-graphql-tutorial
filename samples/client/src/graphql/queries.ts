import { graphql } from "../__generated__/gql";

export const GET_TODOS = graphql(`
  query GetTodos {
    todos {
      id
      content
      status
      category {
        id
        name
      }
    }
  }
`);

export const GET_CATEGORIES = graphql(`
  query GetCategories {
    categories {
      id
      name
    }
  }
`);

export const ADD_TODO = graphql(`
  mutation AddTodo($content: String!, $categoryId: ID!) {
    addTodo(content: $content, categoryId: $categoryId) {
      id
      content
      status
      category {
        id
        name
      }
    }
  }
`);

export const UPDATE_TODO = graphql(`
  mutation UpdateTodo(
    $id: ID!
    $content: String
    $status: TodoStatus
    $categoryId: ID
  ) {
    updateTodo(
      id: $id
      content: $content
      status: $status
      categoryId: $categoryId
    ) {
      id
      content
      status
      category {
        id
        name
      }
    }
  }
`);

export const DELETE_TODO = graphql(`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`);

export const ADD_CATEGORY = graphql(`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`);
