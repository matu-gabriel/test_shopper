import * as Yup from "yup";

const isBase64 = (value: string): boolean => {
  try {
    return Buffer.from(value, "base64").toString("base64") === value;
  } catch (error) {
    return false;
  }
};

export const schemaValidation = Yup.object().shape({
  // image: Yup.mixed()
  //   .required("Image is require")
  //   .test("fileType", "Unsupported File Format", (value) => {
  //     if (!value) return false;
  //     return ["image/jpeg", "image/png"].includes((value as any).mimetype);
  //   }),
  customer_code: Yup.string().required("Customer code is required"),
  measure_datetime: Yup.string().required("Measure datatime is required"),
  measure_type: Yup.string()
    .oneOf(["WATER", "GAS"])
    .required("Measure type is required"),
});

export const validParams = Yup.object().shape({
  measure_uuid: Yup.string().required("Measure UUID is required"),
  confirmed_value: Yup.number()
    .required("Confirmed value is required")
    .integer("Confirmed value must be an integer"),
});
