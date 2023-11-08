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
