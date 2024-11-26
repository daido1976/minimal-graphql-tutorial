import { gql } from "../__generated__/gql";

export const GET_TODOS = gql(`
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

export const GET_CATEGORIES = gql(`
  query GetCategories {
    categories {
      id
      name
    }
  }
`);

export const ADD_TODO = gql(`
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

export const UPDATE_TODO = gql(`
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

export const DELETE_TODO = gql(`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`);

export const ADD_CATEGORY = gql(`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`);
