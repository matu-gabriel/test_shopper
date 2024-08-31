import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const fileManager = new GoogleAIFileManager(
  process.env.GEMINI_API_KEY as string
);

export const processImage = async (filePath: string) => {
  try {
    // Fazer upload do arquivo de imagem
    const uploadResponse = await fileManager.uploadFile(filePath, {
      mimeType: "image/jpeg",
      displayName: "UploadedImage",
    });

    const fileUri = uploadResponse.file.uri;

    console.log("File URI:", fileUri);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: "Preciso que me extraia e me mostre apenas o valor contido na imagem, sem mais nenhum texto",
      },
    ]);
    console.log("API Response:", result.response.text());
    const measureValue = await result.response.text();

    return {
      uri: fileUri,
      measureValue,
    };
  } catch (error) {
    console.error("Erro ao gerar descrição da imagem:", error);
    throw error;
  }
};

export const saveTempImage = (buffer: Buffer, filename: string): string => {
  const tempDir = path.join(__dirname, "../temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const filePath = path.join(tempDir, filename);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};
