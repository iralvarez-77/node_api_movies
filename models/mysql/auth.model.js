import pool from "../../database.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthModel {
  static async signUp({ userName, email, password }) {
		try {
			
			const hash = await bcrypt.hash(password, 10);

			const result = await pool.query(
				"INSERT INTO users(userName, email, password) VALUES(?,?,?);",
				[userName, email, hash]
			);
			const userId = result.insertId
			
			const data = {
				userId,
				userName,
				email,
			};
			
			return data
		} catch (error) {
			console.log('👀 👉🏽 ~  errorDetectado:', error);
			throw error
		}
	}

  static async signIn( email, password ) {
    try {

      const [userFound] = await pool.query(
        "SELECT * FROM users  WHERE email = ? LIMIT 1;",
        [email]
      );

      if (userFound.length === 0) {
        const error = new Error("User not found");
        error.statusCode = 404;  
        throw error;
      }

      const isMatch = await bcrypt.compare(password, userFound[0].password)

      if (!isMatch) { 
        const error = new Error("invalid credentials")
        error.statusCode = 400
        throw error
      }
      const token = await jwt.sign({userId: userFound[0].userId }, process.env.PRIVATE_KEY, {expiresIn: "15m"});

      const { password: _, ...userWithoutPassword } = userFound[0];

      return {
        user: userWithoutPassword,
        token
      };
  
    } catch (error) {
      console.log('👀 👉🏽 ~  errorUserFound:', error)
      throw error
    }
  }

  static async tokenRefresh( ) {
    try {

      
      // const token = await jwt.sign({userId: userFound[0].userId }, process.env.PRIVATE_KEY_REFRESH, {expiresIn: "7d"});

      // const { password: _, ...userWithoutPassword } = userFound[0];

      // return {
      //   user: userWithoutPassword,
      //   token
      // };
  
    } catch (error) {
      console.log('👀 👉🏽 ~  errorUserFound:', error)
      throw error
    }
  }
}