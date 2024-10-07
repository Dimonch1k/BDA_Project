import React, { useState } from "react";
import { Button, Modal, Input, Upload } from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import "../../../styles/components/library/Add-Book/Add-Book.scss";

const AddBook = ({ addNewBook }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const validationSchema = Yup.object().shape({
    img: Yup.mixed().required("Cover image is required"),
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
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
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            addNewBook(values);
            resetForm();
            setIsModalOpen(false);
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {/* Upload Cover Image */}
              <div>
                <label>Upload Cover Image</label> <br />
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

              {/* Book Title */}
              <div>
                <label>Title</label>
                <Input
                  name="title"
                  onChange={(e) => setFieldValue("title", e.target.value)}
                />
                <ErrorMessage name="title" component="div" className="error" />
              </div>

              {/* Author */}
              <div>
                <label>Author</label>
                <Input
                  name="author"
                  onChange={(e) => setFieldValue("author", e.target.value)}
                />
                <ErrorMessage name="author" component="div" className="error" />
              </div>

              {/* Genre */}
              <div>
                <label>Genre</label>
                <Input
                  name="genre"
                  onChange={(e) => setFieldValue("genre", e.target.value)}
                />
                <ErrorMessage name="genre" component="div" className="error" />
              </div>

              {/* Description */}
              <div>
                <label>Description</label>
                <Input
                  name="description"
                  onChange={(e) => setFieldValue("description", e.target.value)}
                />
                <ErrorMessage name="description" component="div" className="error" />
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: "10px" }}>
                <Button type="primary" htmlType="submit">
                  Add Book
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddBook;
