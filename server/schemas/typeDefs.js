const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
<<<<<<< HEAD
    posts: [post]!
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
=======
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
>>>>>>> afc481c4eb9cea505c76454dab471705064d9f00
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
<<<<<<< HEAD
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
=======
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
>>>>>>> afc481c4eb9cea505c76454dab471705064d9f00
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
<<<<<<< HEAD
    addpost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removepost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
=======
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(
      thoughtId: ID!
      commentText: String!
      commentAuthor: String!
    ): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
>>>>>>> afc481c4eb9cea505c76454dab471705064d9f00
  }
`;

module.exports = typeDefs;
