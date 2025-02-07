import { AuthModel } from '../models/mysql/auth.model.js';
import { sendErrorResponse } from '../utils/sendError.js';
import { setCookie } from '../utils/setCookie.js';

export const register = async (req, res) => {
	try {
		const user = await AuthModel.signUp(req.body);

		res.status(201).json({
			message: 'user created successfully',
			data: user,
		});
		
	} catch (error) {
		if (error.message === 'DUPLICATE_EMAIL')
			sendErrorResponse(res, 409, 'Email is already registered');

		sendErrorResponse(res, 500, 'Internal Server Error');
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const { user, accessToken, refreshToken } = await AuthModel.signIn(email, password);
		
		setCookie(res, 'accessToken', accessToken)
		setCookie(res, 'refreshToken', refreshToken)
    
		// res.cookie('accessToken', accessToken, {
		// 	httpOnly: true,
		// 	secure: process.env.NODE_ENV === 'production',
		// 	sameSite: 'strict',
		// });
		
		// res.cookie('refreshToken', refreshToken, {
		// 	httpOnly: true,
		// 	secure: process.env.NODE_ENV === 'production',
		// 	sameSite: 'strict',
		// });

		res.status(200).json({
			message: 'successfully',
			data: { user },
		});

	} catch (error) {
		console.log('👀 👉🏽 ~  errorLogin:', error);

		if (error.statusCode === 404) sendErrorResponse(res, 404, error.message);

		if (error.statusCode === 400) sendErrorResponse(res, 400, error.message);
	}
};

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const { accessToken } = await AuthModel.tokenRefresh(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error en refresh token:", error);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

export const logOut = (_req, res) => {
	try {
		res.clearCookie('token');
		res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		console.log('👀 👉🏽 ~  errorControllerLogOut:', error);
	}
};
