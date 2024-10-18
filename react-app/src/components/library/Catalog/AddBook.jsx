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

  const handleAddBook = (data) => {
    const file = data.image;

    const reader = new FileReader();
    reader.onload = () => {
      const url = URL.createObjectURL(
        new Blob([reader.result], { type: file.type })
      );
      dispatch(addBook({ ...data, image: url }));
      message.success("Book added successfully");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <button
        onClick={showModal}
        className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
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
            cover_image: null,
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
