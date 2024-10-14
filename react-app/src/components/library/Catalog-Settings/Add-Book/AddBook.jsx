import React, { useState } from "react";
import { Button, Modal, Input, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addBook } from "../../../../store/slices/bookSlice";
import * as Yup from "yup";

import "../../../../styles/components/library/Add-Book/Add-Book.scss";

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
        className="full-size-icon-button"
      >
        <PlusCircleOutlined className="full-size-icon" />
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

              <div style={{ marginTop: "10px" }}>
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
