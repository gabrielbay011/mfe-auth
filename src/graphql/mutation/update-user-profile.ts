import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile(
    $id: uuid!
    $name: String!
    $last_name: String!
    $amount: numeric!
  ) {
    updateUser(
      pk_columns: { id: $id }
      _set: { name: $name, last_name: $last_name, amount: $amount }
    ) {
      id
    }
  }
`;
