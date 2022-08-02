import { yupResolver } from "@hookform/resolvers/yup";
import FileUploader from "components/form/FileUploader";
import Input from "components/form/Input";
import Select from "components/form/Select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook, fetchBookCategory } from "store/bookSlice";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import {
  downloadImage,
  insertTable,
  updateBook,
  uploadImage,
} from "services/supabaseFunction";
import { useNavigate, useParams } from "react-router-dom";
import { bookSchema } from "constants/formSchema";

const AddEditBook = ({ isEdit }) => {
  const navigate = useNavigate();
  const { book } = useSelector((state) => state.book);
  const [bookData, setBookData] = useState(null);
  const { book_category } = useSelector((state) => state.book);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchBookCategory());
    dispatch(fetchBook());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      const bookDetail = book.find((item) => item.id === +params.id);
      setBookData(bookDetail);
      if (bookData?.cover)
        downloadImage("cover", bookData.cover, setImagePreview);
      reset(bookData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookSchema),
  });

  const submitForm = (data) => {
    let fileName;
    if (data.cover instanceof File) {
      const file = data.cover;
      const fileExt = file.name.split(".").pop();
      fileName = `${uuidv4()}.${fileExt}`;
      uploadImage("cover", fileName, file);
    } else {
      fileName = data.cover;
    }
    const slug = data.title.split(" ").join("-").toLowerCase();
    const currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const newBookData = {
      ...data,
      slug,
      cover: fileName,
      created_at: isEdit ? bookData.created_at : currentDate,
      updated_at: currentDate,
    };
    delete newBookData.book_category;
    if (isEdit) {
      updateBook(newBookData, params.id);
    } else {
      insertTable("book", newBookData);
    }
    console.log(newBookData)
    reset();
    navigate("/dashboard/book");
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
                {isEdit ? 'Update Book' : 'Add Book'}
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

export default AddEditBook;
