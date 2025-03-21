import { AuthModel } from '../models/mysql/auth.model.js';
import { catchedAsync } from '../utils/catchedAsync.js';
import { sentError } from '../utils/sentError.js';
import { sentResponse } from '../utils/sentResponse.js';
import { setCookie } from '../utils/setCookie.js';

export const register = catchedAsync( async (req, res) => {
	
		const user = await AuthModel.signUp(req.body);
		sentResponse(res, 201, {
			message: 'user created successfully',
			data: user,
		})
})

export const login = catchedAsync( async (req, res) => {
	
		const { email, password } = req.body;

		const { user, accessToken, refreshToken } = await AuthModel.signIn(email, password);

		setCookie(res, "refreshToken", refreshToken)
		sentResponse(res, 200, {
			message: 'successfully',
			user,
			accessToken
		})
})

export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) 
      return res.status(401).json({ message: "No refresh token provided" });

    const accessToken = await AuthModel.tokenRefresh(refreshToken);

    res.status(200).json({ accessToken});
  } catch (error) {
    console.log("Error en refresh token:", error);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

export const logOut = (_req, res) => {
	try {
		res.clearCookie('refreshToken');
		res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		console.log('👀 👉🏽 ~  errorControllerLogOut:', error);
	}
};
