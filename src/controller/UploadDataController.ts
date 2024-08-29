import { Request, Response } from "express";
import { schemaValidation } from "../utils/Validation";
import Reading from "../model/ReadingModel";

export const sendReading = async (req: Request, res: Response) => {
  try {
    // Validando dados
    await schemaValidation.validate(req.body, { abortEarly: false });

    // Recebendo dados do corpo da requisição
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Verificando se existe uma leitura no mês para este tipo de medição
    const existingReading = await Reading.findOne({
      customer_code,
      measure_type,
      measure_datetime: {
        $gte: new Date(
          new Date(measure_datetime).getFullYear(),
          new Date(measure_datetime).getMonth(),
          1
        ),
        $lte: new Date(
          new Date(measure_datetime).getFullYear(),
          new Date(measure_datetime).getMonth() + 1,
          1
        ),
      },
    });

    if (existingReading) {
      return res.status(409).json({ error: "Leitura do mês já realizada" });
    }

    const newReading = new Reading({
      image,
      customer_code,
      measure_type,
      measure_datetime,
    });

    await newReading.save();

    return res.status(201).json({ success: true, data: newReading });
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "ValidationError") {
        return res.status(400).json({ messege: err.message });
      }
    }
    console.error("Erro ao processar a leitura:", err);
    return res.status(500).json({ error: "Error processing the image" });
  }
};
