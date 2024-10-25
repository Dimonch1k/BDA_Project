import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { addBook } from "../../../store/slices/bookSlice";
import * as Yup from "yup";

import CoverImageUpload from "./CoverImageUpload";
import InputAddBook from "./InputAddBook";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  description: Yup.string().required("Description is required"),
});

const AddBook = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // const handleAddBook = (data) => {
  //   const file = data.image;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const url = URL.createObjectURL(
  //       new Blob([reader.result], { type: file.type })
  //     );
  //     console.log(url);
  //     dispatch(addBook({ ...data, image: url }));
  //     message.success("Book added successfully");
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  const handleAddBook = (data) => {
    const file = data.image;

    // Validate file extension
    const validExtensions = ["image/png", "image/jpeg", "image/jpg"];
    if (!validExtensions.includes(file.type)) {
      message.error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
      return;
    }

    // Process the image file
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to base64
      const base64Image = reader.result;
      console.log(base64Image);

      // Dispatch the action to add the book with the image in base64
      dispatch(addBook({ ...data, image: base64Image }));
      message.success("Book added successfully");
    };

    reader.readAsDataURL(file);
  };

  // const handleAddBook = (data) => {
  //   const file = data.image[0]; // Assuming the image is the first file in the input

  //   dispatch(addBook({ ...data, image: file }))
  //     .then(() => {
  //       message.success("Book added successfully");
  //       setIsModalOpen(false);
  //     })
  //     .catch((error) => {
  //       message.error("Failed to add book: " + error.message);
  //     });
  // };

  return (
    <>
      <button onClick={showModal} className="catalog__add-book-btn">
        <PlusCircleOutlined className="text-2xl" />
      </button>

      <Modal
        title="Add Book Form"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          initialValues={{
            image: null,
            title: "",
            author: "",
            genre: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            handleAddBook(values);
            resetForm();
            setSubmitting(false);
            setIsModalOpen(false);
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <CoverImageUpload setFieldValue={setFieldValue} />
              <InputAddBook name="title" label="Title" />
              <InputAddBook name="author" label="Author" />
              <InputAddBook name="genre" label="Genre" />
              <InputAddBook name="description" label="Description" />

              <div className="mt-2.5">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Add Book
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddBook;
