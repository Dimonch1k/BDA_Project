import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { addBook } from "../../../store/slices/bookSlice";
import * as Yup from "yup";

import CoverImageUpload from "./CoverImageUpload";
import InputField from "./InputField";

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
    const file = data.cover_image;

    const reader = new FileReader();
    reader.onload = () => {
      const url = URL.createObjectURL(
        new Blob([reader.result], { type: file.type })
      );

      dispatch(addBook({ ...data, cover_image: url }));
      message.success("Book added successfully");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Button
        shape="circle"
        onClick={showModal}
        className="mr-auto p-0 w-auto h-auto min-w-6"
      >
        <PlusCircleOutlined className="size-7" />
      </Button>

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
              {/* Upload Cover Image */}
              <CoverImageUpload setFieldValue={setFieldValue} />

              <InputField name="title" label="Title" />
              <InputField name="author" label="Author" />
              <InputField name="genre" label="Genre" />
              <InputField name="description" label="Description" />

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
