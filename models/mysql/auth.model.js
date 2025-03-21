import pool from '../../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../../utils/tokenManager.js';
import { ClientError } from '../../utils/validateErrors.js';

export class AuthModel {
	static async signUp({ userName, email, password }) {
		try {
			const hash = await bcrypt.hash(password, 10);

			const result = await pool.query(
				'INSERT INTO users(userName, email, password) VALUES(?,?,?);',
				[userName, email, hash]
			);
			const userId = result.insertId;

			const data = {
				userId,
				userName,
				email,
			};

			return data;
		} catch (error) {
			console.log('👀 👉🏽 ~  errorSignUP:', error);
			if (error.code === "ER_DUP_ENTRY") {
				throw { statusCode: 409, message: "the email is already registered" };
		}
		}
	}

	static async signIn(email, password) {
		try {
			const [userFound] = await pool.query(
				'SELECT * FROM users  WHERE email = ? LIMIT 1;',
				[email]
			);

			if (userFound.length === 0) throw new ClientError("User not found", 404)

			const user = userFound[0]

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) throw new ClientError('invalid credentials', 400)
				

      const accessToken = generateAccessToken(user.userId)
      const refreshToken = generateRefreshToken(user.userId)

			const { password: _, ...userWithoutPassword } = user;

			return {
				user: userWithoutPassword,
				accessToken,
        refreshToken
			};
		} catch (error) {
			console.log('👀 👉🏽 ~  errorSignIn:', error);
			throw error;
		}
	}

	static async tokenRefresh(refreshToken) {
		try {

			const { id } = jwt.verify(refreshToken, process.env.PRIVATE_KEY_REFRESH);
			const accessToken = generateAccessToken(id)

			return accessToken;
		} catch (error) {
			console.log('👀 👉🏽 ~ errorRefreshToken:', error);

			throw new Error('Invalid or expired refresh token');
		}
	}
}
