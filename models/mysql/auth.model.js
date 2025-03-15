import pool from '../../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../../utils/tokenManager.js';

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
			console.log('👀 👉🏽 ~  errorDetectado:', error);
			throw error;
		}
	}

	static async signIn(email, password) {
		try {
			const [userFound] = await pool.query(
				'SELECT * FROM users  WHERE email = ? LIMIT 1;',
				[email]
			);

			if (userFound.length === 0) {
				const error = new Error('User not found');
				error.statusCode = 404;
				throw error;
			}

			const user = userFound[0]

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				const error = new Error('invalid credentials');
				error.statusCode = 400;
				throw error;
			}

      const accessToken = generateAccessToken(user.userId)
      const refreshToken = generateRefreshToken(user.userId)

			const { password: _, ...userWithoutPassword } = user;

			return {
				user: userWithoutPassword,
				accessToken,
        refreshToken
			};
		} catch (error) {
			console.log('👀 👉🏽 ~  errorUserFound:', error);
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
