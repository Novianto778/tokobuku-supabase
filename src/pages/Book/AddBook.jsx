import { yupResolver } from "@hookform/resolvers/yup";
import FileUploader from "components/form/FileUploader";
import Input from "components/form/Input";
import Select from "components/form/Select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookCategory } from "store/bookSlice";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { insertTable, uploadImage } from "services/supabaseFunction";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required(),
  release_year: yup.string().required(),
  author: yup.string().required(),
  price: yup.number().typeError("price is required").positive().required(),
  discount: yup.number().min(0).max(1).nullable(true).transform((_, val) => val === Number(val) ? val : 0) ,
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
        return value === null || (value && value.size <= 512000);
      }
    )
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) =>
        value === null ||
        (value && ["image/jpeg", "image/jpg", "image/png"].includes(value.type))
    ),
});

const AddBook = () => {
  const navigate = useNavigate()
  const { book_category } = useSelector((state) => state.book);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookCategory());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    const file = data.cover;
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    uploadImage('cover', fileName, file)
    const slug = data.title.split(" ").join("-").toLowerCase();
    const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const bookData = { ...data, slug, cover: fileName, created_at: currentDate, updated_at: currentDate };
    insertTable('book', bookData)
    reset()
    navigate("/dashboard/book")
    
  };

  const imageHandler = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    const fileType = file.type;
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
      fileReader.onload = (e) => {
        const fileUrl = fileReader.result;
        setImagePreview(fileUrl);
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("file should be image");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Add Book</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex gap-x-8 mt-4 mx-8 py-6 md:flex-row flex-col">
          <div className="flex-[2]">
            <h4 className="text-xl font-semibold mb-2">Book Cover</h4>
            <FileUploader
              {...register("cover")}
              name="cover"
              accept="image/*"
              // onChange={imageHandler}
              onChange={(e) => {
                imageHandler(e);
                setValue("cover", e.target.files[0], {
                  shouldValidate: true,
                });
              }}
              image={imagePreview}
              errors={errors.cover?.message}
            />
            <div className="mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary rounded-md text-white font-semibold w-full cursor-pointer"
              >
                Add Book
              </button>
            </div>
          </div>
          <div className="flex-[4]">
            <Input
              {...register("title")}
              spacing={6}
              label="Title"
              type="text"
              placeholder="Enter book title"
              color="yellow-400"
              name="title"
              errors={errors.title?.message}
              rounded={+false}
            />
            <Input
              {...register("release_year")}
              spacing={6}
              label="Release Year"
              type="text"
              placeholder="Enter book release"
              color="yellow-400"
              name="release_year"
              errors={errors.release_year?.message}
              rounded={+false}
            />
            <Input
              {...register("author")}
              spacing={6}
              label="Author"
              type="text"
              placeholder="Enter book author"
              color="yellow-400"
              name="author"
              errors={errors.author?.message}
              rounded={+false}
            />
            <div className="flex gap-x-8">
              <Input
                {...register("price")}
                className="flex-[2]"
                spacing={6}
                label="Price"
                type="number"
                placeholder="Enter book price"
                color="yellow-400"
                name="price"
                errors={errors.price?.message}
                rounded={+false}
              />
              <Input
                {...register("discount")}
                className="flex-[1]"
                spacing={6}
                label="Discount"
                type="number"
                placeholder="Enter book discount"
                color="yellow-400"
                name="discount"
                errors={errors.discount?.message}
                rounded={+false}
                step={0.1}
              />
              <Input
                {...register("stock")}
                className="flex-[1]"
                spacing={6}
                label="Stock"
                type="number"
                placeholder="Enter book stock"
                color="yellow-400"
                name="stock"
                errors={errors.stock?.message}
                rounded={+false}
              />
            </div>
            <div className="flex">
              <Select
                {...register("book_category_id")}
                onChange={(e) =>
                  setValue("book_category_id", +e.target.value, {
                    shouldValidate: true,
                  })
                }
                label="Book Category"
                name="book_category_id"
                spacing={6}
                optionheader="Select book category"
                options={book_category}
                errors={errors.book_category_id?.message}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddBook;
