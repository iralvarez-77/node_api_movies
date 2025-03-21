import pool from "../../database.js"

export class MoviesModel {
	static async getAllMovies({genre, orderDirection} = {}) {
		
			let query = "SELECT * FROM movies";
      const params = [];

			if (genre) {
				query += " WHERE genre = ?";
				params.push(genre);
			}

			if (orderDirection) {
				const direction = orderDirection.toUpperCase() === "DESC" ? "DESC" : "ASC";
				query += " ORDER BY year " + direction;
			}

			const [movies] = await pool.query(query, params);
			return movies
	}
}
