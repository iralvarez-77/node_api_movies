import { DirectorsModel } from "../models/mysql/directors.model.js";
import { catchedAsync } from "../utils/catchedAsync.js";
import {sentResponse} from "../utils/sentResponse.js"

export const createDirector = catchedAsync( async (req, res) => {
    
    const newDirector = await DirectorsModel.newDirector(req.body);
    sentResponse(res, 201, newDirector)
})

