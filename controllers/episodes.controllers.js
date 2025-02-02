import { EpisodesModel } from "../models/mysql/episodes.model.js";

export const getEpisode = async (req, res) => {
  console.log('👀 👉🏽 ~  req:', req)
  console.log('👀 👉🏽 ~  req:', req.params)
  try {
    const { id } = req.params;
    const episode = await EpisodesModel.getEpisodeById(id);
    console.log('👀 👉🏽 ~  episode:', episode)
    res.status(200).json(episode);
    
  } catch (error) {
  console.log('👀 👉🏽 ~  errorGetEpisodeController:', error)

  }
}

