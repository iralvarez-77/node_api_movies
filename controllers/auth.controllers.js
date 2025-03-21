import { AuthModel } from '../models/mysql/auth.model.js';
import { catchedAsync } from '../utils/catchedAsync.js';
import { sentResponse } from '../utils/sentResponse.js';
import { setCookie } from '../utils/setCookie.js';
import { AuthErrors } from '../utils/validateErrors.js';

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

export const refresh = catchedAsync( async (req, res) => {
  
    const { refreshToken } = req.cookies;

    if (!refreshToken) 
			throw new AuthErrors("No refresh token provided", 401)

    const accessToken = await AuthModel.tokenRefresh(refreshToken);
		sentResponse(res, 200, accessToken )
})

export const logOut = (_req, res) => {
		
		res.clearCookie('refreshToken');
		sentResponse(res, 200, 'Logout successful')
}
