import "../styles/components/ContactForm.scss";
import { message } from "antd";
import { Formik, Form, Field } from "formik";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const sendEmail = (values) => {
    emailjs
      .send(
        "service_lgg8taa",
        "template_c6pbcim",
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message,
        },
        "wBZ5V_gmujUfEBsVu"
      )
      .then(
        (response) => {
          message.success("Message sent successfully!");
        },
        (error) => {
          message.error("Failed to send the message.");
        }
      );
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      onSubmit={(values, { resetForm }) => {
        sendEmail(values);
        resetForm();
      }}
    >
      {() => (
        <Form className="contact-form">
          <div className="mb-8">
            <label className="contact-form__label" htmlFor="name">
              Your Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="contact-form__field"
            />
          </div>

          <div className="mb-8">
            <label className="contact-form__label" htmlFor="email">
              Your Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              className="contact-form__field"
            />
          </div>

          <div className="mb-8">
            <label className="contact-form__label" htmlFor="message">
              Message
            </label>
            <Field
              as="textarea"
              id="message"
              name="message"
              rows="4"
              placeholder="Your message here..."
              className="contact-form__field"
            />
          </div>

          <button type="submit" className="contact-form__send-btn">
            Send Message
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
