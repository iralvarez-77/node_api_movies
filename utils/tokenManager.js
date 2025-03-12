import jwt from 'jsonwebtoken';

export const generateAccessToken = id => {
	const expiraIn = '15m';
	try {
		const token = jwt.sign({ id }, process.env.PRIVATE_KEY_ACCESS, { expiresIn });
		return { token, expiraIn };
	} catch (error) {
		console.log('👀 👉🏽 ~  error:', error);
	}
};

export const generateRefreshToken = (id, res) => {
  const expiraIn = "7d"
  try {
    const token = jwt.sign({id}, process.env.PRIVATE_KEY_REFRESH, {expiresIn})

    res.cookie("refresh-token", token, {
      httoOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
    
  }
}

