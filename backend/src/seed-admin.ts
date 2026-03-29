import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';
import { generateHashedPassword } from './utils/handle-password';

const run = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const hashedPassword = await generateHashedPassword(password);

    const { rows } = await pool.query(
      `INSERT INTO users (name, email, role_id, created_dt, password, is_active, is_email_verified)
       VALUES ('Admin', $1, 1, now(), $2, true, true)
       ON CONFLICT (email) DO UPDATE SET password = $2
       RETURNING id`,
      [email, hashedPassword]
    );

    const userId = rows[0].id;

    await pool.query(
      `INSERT INTO user_profiles
         (user_id, gender, marital_status, phone, dob, join_dt, qualification, experience,
          current_address, permanent_address, father_name, mother_name, emergency_phone)
       VALUES ($1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    );

    console.log(`Admin user seeded: ${email}`);
  } catch (error) {
    console.error('Failed to seed admin user:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

run();
