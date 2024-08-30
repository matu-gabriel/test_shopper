import * as Yup from "yup";

const isBase64 = (value: string): boolean => {
  try {
    return Buffer.from(value, "base64").toString("base64") === value;
  } catch (error) {
    return false;
  }
};

export const schemaValidation = Yup.object().shape({
  image: Yup.string()
    .test("is-base64", "Invalid base64 format", (value) =>
      value ? isBase64(value) : false
    )
    .required("Image is required"),
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
