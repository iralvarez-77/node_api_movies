import { DirectorsModel } from "../models/mysql/directors.model.js";

export const createDirector = async (req, res) => {
  try {
    
    const newDirector = await DirectorsModel.newDirector(req.body);
    res.status(201).json(newDirector);
    
  } catch (error) {
  console.log('👀 👉🏽 ~  errorCreateDirectorController:', error)

  }
}

