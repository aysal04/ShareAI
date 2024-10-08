import { createError } from "../error.js";
import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Call Hugging Face API to generate image
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const resultBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(resultBuffer).toString('base64');

    res.status(200).json({ photo: `data:image/png;base64,${base64Image}` });
    
  } catch (error) {
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error.message
      )
    );
  }
};

