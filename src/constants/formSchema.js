import * as yup from "yup";

export const bookSchema = yup.object().shape({
  title: yup.string().required(),
  release_year: yup.string().required(),
  author: yup.string().required(),
  price: yup.number().typeError("price is required").positive().required(),
  discount: yup
    .number()
    .min(0)
    .max(1)
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : 0)),
  stock: yup
    .number()
    .typeError("stock is required")
    .integer()
    .positive()
    .required(),
  book_category_id: yup
    .number()
    .min(1, "Book category has not been selected")
    .required(),
  cover: yup
    .mixed()
    .test(
      "fileSize",
      "File too large, file must be less than 512 kb",
      (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          if ("size" in value) {
            return value.size <= 512000;
          }
        }
      }
    ),
  // .test(
  //   "fileFormat",
  //   "Unsupported file type",
  //   (value) =>
  //     value === null ||
  //     (value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type))
  // ),
});
