import jwt from 'jsonwebtoken';

export const generateAccessToken = id => {
	const expiresIn = '15m';
	try {
		const accessToken = jwt.sign({ id }, process.env.PRIVATE_KEY_ACCESS, { expiresIn });
		return { accessToken, expiresIn };
	} catch (error) {
		console.log('👀 👉🏽 ~  error:', error);
	}
};

export const generateRefreshToken = (id) => {
  const expiresIn = "7d"
  try {
    return jwt.sign({id}, process.env.PRIVATE_KEY_REFRESH, {expiresIn})
  
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
    
  }
}

