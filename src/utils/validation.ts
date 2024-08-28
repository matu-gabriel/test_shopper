import * as Yup from "yup";

export const schemaValidation = Yup.object().shape({
  image: Yup.string()
    .matches(/^data:image\/[a-z]+;base64,/, "Invalid base64 format")
    .required("Image is required"),
  customer_code: Yup.string().required("Customer code is required"),
  measure_datatime: Yup.string().required("Measure datatime is required"),
  measure_type: Yup.string()
    .oneOf(["WATER", "GAS"])
    .required("Measure type is required"),
});
