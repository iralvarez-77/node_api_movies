import pool from '../../database.js';
import { ClientError } from '../../utils/validateErrors.js';

export class EpisodesModel {
	static async getEpisodeById(id) {
		const query = `
    SELECT 
        e.id AS episode_id,
        e.title AS episode_title,
        e.episode_number,
        s.season_number,
        t.title AS tv_show_title,
        d.id AS director_id,
        d.name AS director_name
    FROM episodes e
    JOIN seasons s ON e.season_id = s.id
    JOIN tv_shows t ON s.tv_show_id = t.id
    JOIN directors d ON e.director_id = d.id
    WHERE e.id = ?;
`;
		
			const [result] = await pool.query(query, [id]);

			if (result.length === 0) throw new ClientError("not found", 404)

			return result[0];
		
	}
}
