import pool from "../../database.js"
import { sentResponse } from "../../utils/sentResponse.js";

export class DirectorsModel {
	static async newDirector({name}) {
			
			const [result] = await pool.query(
				'INSERT INTO directors (name) VALUES (?);',
				[name]
			);

			return {id: result.insertId, name}
	}
}
