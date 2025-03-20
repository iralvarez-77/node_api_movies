import { EpisodesModel } from "../models/mysql/episodes.model.js";
import { catchedAsync } from "../utils/catchedAsync.js";
import {sentResponse} from "../utils/sentResponse.js"

export const getEpisode = catchedAsync( async (req, res) => {
  
    const { id } = req.params;
    const episode = await EpisodesModel.getEpisodeById(id);
    sentResponse(res, 200, episode)
})

