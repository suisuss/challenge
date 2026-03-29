import { processDBRequest } from "../../utils";

interface UserRow {
  id: number;
  email: string;
  role_id: number;
  password: string;
  is_active: boolean;
  is_email_verified: boolean;
}

export const findUserById = async (id: number): Promise<UserRow | undefined> => {
  const query = `
        SELECT
            id,
            email,
            role_id,
            password,
            is_active,
            is_email_verified
        FROM users where id = $1
    `;
  const queryParams = [id];
  const { rows } = await processDBRequest<UserRow>({ query, queryParams });
  return rows[0];
};
