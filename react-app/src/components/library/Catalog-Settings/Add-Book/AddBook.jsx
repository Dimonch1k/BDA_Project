import React, { useState } from "react";
import { Button, Modal, Input, Upload } from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";

import "../../../../styles/components/library/Add-Book/Add-Book.scss";
import { useDispatch } from "react-redux";
import { addBook } from "../../../../slices/booksSlice";

const InputField = ({ label, name, ...props }) => (
  <div>
    <label>{label}</label>
    <Field name={name} as={Input} {...props} />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

const AddBook = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const validationSchema = Yup.object().shape({
    img: Yup.mixed().required("Cover image is required"),
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
    description: Yup.string().required("Description is required"),
  });

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
            img: null,
            title: "",
            author: "",
            genre: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            dispatch(addBook(values));
            resetForm();
            setIsModalOpen(false);
            setSubmitting(false);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              {/* Upload Cover Image */}
              <div>
                <label>Upload Cover Image</label>
                <Upload
                  name="img"
                  beforeUpload={(file) => {
                    setFieldValue("img", file);
                    return false;
                  }}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                <ErrorMessage name="img" component="div" className="error" />
              </div>

              <InputField name="title" label="Title" />
              <InputField name="author" label="Author" />
              <InputField name="genre" label="Genre" />
              <InputField name="description" label="Description" />

              <div style={{ marginTop: "10px" }}>
                <Button type="primary" htmlType="submit">
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
