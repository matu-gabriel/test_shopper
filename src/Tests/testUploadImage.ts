import dotenv from "dotenv";
import { processImage } from "../service/AIService";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import fs from "fs";

dotenv.config();

const testProcessImage = async () => {
  const base64Image =
    "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";

  try {
    const result = await processImage(base64Image);
    console.log("Image URI: ", result?.uri);
    // console.log("Description: ", result?.description);
  } catch (error) {
    console.error("Error processing image:", error);
  }
};

testProcessImage();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// const testBase64String

// const imagePath = path.join(__dirname, "../assets/jetpack.jpg");

// const base64String = testBase64String.toString();

// const base64Data = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, "");

// const imageBuffer = Buffer.from(base64Data, "base64");

// const imageString = imageBuffer.toString("base64");

// const model = genAI.getGenerativeModel({
//   // Choose a Gemini model.
//   model: "gemini-1.5-pro",
// });

// const teste = async () => {
//   try {
//     const uploadResponse = await fileManager.uploadFile(imagePath, {
//       mimeType: "image/jpeg",
//       displayName: "Test Image",
//     });

//     console.log("Upload Response:", uploadResponse);
//     console.log("File URI:", uploadResponse.file.uri);

//     const result = await model.generateContent([
//       {
//         fileData: {
//           mimeType: uploadResponse.file.mimeType,
//           fileUri: uploadResponse.file.uri,
//         },
//       },
//       {
//         text: "Describe how this product might be manufactured.",
//       },
//     ]);

//     console.log(result.response.text());
//   } catch (err) {
//     console.error("Error during image upload:", err);
//   }
// };

// teste();

// function fileToGenerativePart(path: string, mimeType: string) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//       mimeType,
//     },
//   };
// }

// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = "Mostrar resposta em portugues";

//   const imageParts = [fileToGenerativePart(imagePath, "image/jpeg")];
//   // console.log("ImageParts ", imageParts);

//   const result = await model.generateContent([prompt]);
//   console.log("Result ", result);

//   const response = await result.response;
//   console.log("Response ", response);

//   const text = response.text();
//   console.log(text);
// }

// run();
