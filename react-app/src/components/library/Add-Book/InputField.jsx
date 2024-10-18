import { Input } from "antd";
import { ErrorMessage, Field } from "formik";
import React from "react";

const InputField = ({ label, name, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <Field name={name} as={Input} {...props} />
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

export default InputField;
