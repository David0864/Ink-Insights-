import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
export const REMOVE_COMMENT = gql`

mutation removeComment($thoughtId: ID!, $commentId: ID!) {
  removeComment(thoughtId: $thoughtId, commentId: $commentId) {
    _id
    thoughtText
    thoughtAuthor
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}

`;
export const REMOVE_THOUGHT = gql`
mutation removeThought($thoughtId: ID!) {
  removeThought(thoughtId: $thoughtId) {
    _id
    thoughtText
    thoughtAuthor
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}

`;
export const EDIT_THOUGHT = gql`
mutation editThought($thoughtId: ID!, $thoughtText: String!) {
  editThought(thoughtId: $thoughtId, thoughtText: $thoughtText) {
    _id
    thoughtText
    thoughtAuthor
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}

`;
export const EDIT_COMMENT = gql`
mutation editComment($thoughtId: ID!, $commentId: ID!, $commentText: String!) {
  editComment(thoughtId: $thoughtId, commentId: $commentId, commentText: $commentText) {
    _id
    thoughtText
    thoughtAuthor
    createdAt
    comments {
      _id
      commentText
      commentAuthor
      createdAt
    }
  }
}
`;
