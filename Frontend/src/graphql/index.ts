export const SIGNUP = `
  mutation signUp($name: String!, $email: String!,  $password: String!) {
    signUp(email: $email, name: $name, password: $password)
  }
  `;

export const LOGIN = `
  mutation signIn($email: String!, $password: String!, $role: String) {
    signIn(email: $email, password: $password, role: $role)
  }
  `;

export const GET_USERS = `
  query Users {
    users {
      email
      id
      name
    }
  }
  `;

export const DELETE_USER = `
  mutation DeleteUser($id: String) {
    deleteUser(id: $id) {
      id
    }
  }
  `;
