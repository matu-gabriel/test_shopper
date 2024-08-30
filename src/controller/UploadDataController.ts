import { Request, Response } from "express";
import { schemaValidation } from "../utils/Validation";
import Reading from "../model/ReadingModel";
import { processImage } from "../service/AIService";

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

    const { uri, id } = await processImage(image);

    const newReading = new Reading({
      image,
      customer_code,
      measure_type,
      measure_datetime,
    });

    await newReading.save();

    return res.status(201).json({ image_url: uri, measure_uuid: id });
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

export const getReadings = async (req: Request, res: Response) => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const filter: any = { customer_code };

    if (measure_type) {
      filter.measure_type = new RegExp(`^${measure_type}$`, "i");
      if (measure_type !== "WATER" && measure_type !== "GAS") {
        return res
          .status(400)
          .json({ error_description: "Tipo de medição não permitida" });
      }
    }

    const readings = await Reading.find(filter);

    const measures = readings.map((reading) => ({
      measure_uuid: reading._id,
      measure_datetime: reading.measure_datetime,
      measure_type: reading.measure_type,
      image_url: reading.image,
    }));

    if (readings.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma leitura encontrada para esse cliente" });
    }

    return res.json({
      customer_code,
      measures,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar leituras", error });
  }
};
