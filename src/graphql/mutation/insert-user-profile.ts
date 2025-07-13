import { gql } from "@apollo/client";

export const INSERT_USER_PROFILE = gql`
  mutation InsertUserProfile($id: uuid!, $name: String!, $last_name: String!) {
    insertUser(objects: { id: $id, name: $name, last_name: $last_name }) {
      affected_rows
    }
  }
`;
