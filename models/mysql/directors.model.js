import pool from "../../database.js"

export class DirectorsModel {
	static async newDirector({name}) {
		try {
			
			const [result] = await pool.query(
				'INSERT INTO directors (name) VALUES (?);',
				[name]
			);

			return { id: result.insertId, name };

		} catch (error) {
			console.log('👀 👉🏽 ~  errorNewDirector:', error);
		}
	}

}
