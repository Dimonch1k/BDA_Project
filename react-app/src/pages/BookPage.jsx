import "../styles/pages/BookPage.scss";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Typography, Card, Rate, Modal, message } from "antd";
import { fetchBooksItems, selectAllBooks } from "../store/slices/bookSlice";
import {
  borrowBook,
  selectBorrowedBooks,
} from "../store/slices/borrowBookSlice";
import { selectUser } from "../store/slices/userSlice";

const { Title, Paragraph } = Typography;

const BookPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(selectAllBooks);
  const book = books.find((p) => p.id === Number(id));
  const borrowedBooks = useSelector(selectBorrowedBooks);
  const user = useSelector(selectUser);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchBooksItems());
    }
  }, [books, dispatch]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!borrowedBooks.includes(book.id)) {
      message.error("You can only leave feedback after borrowing this book.");
    } else {
      setFeedback("");
      setRating(0);
      message.success("Feedback submitted successfully.");
    }
  };

  const handleBorrowClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      dispatch(borrowBook(book.id));
      message.success("Book borrowed successfully!");
    }
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    navigate("/library/sign-in");
  };

  const handleModalCancel = () => setIsModalOpen(false);
  if (!book) {
    return <div className="text-center text-red-500">Book not found</div>;
  }

  return (
    <div className="book-page">
      <Card className="book-page__card">
        <img
          src={book.image}
          alt={book.title}
          className="book-page__card__image"
        />
        <div className="book-page__card__content">
          <Title level={1} className="book-page__card__content__title">
            {book.title}
          </Title>
          <Paragraph className="book-page__card__content__paragraph">
            {book.body}
          </Paragraph>
          <Button
            type="primary"
            className="book-page__card__content__button"
            onClick={handleBorrowClick}
            disabled={borrowedBooks.includes(book.id)}
          >
            {borrowedBooks.includes(book.id)
              ? "Already Borrowed"
              : "Borrow Book"}
          </Button>
        </div>
      </Card>

      <Card className="book-page__feedback">
        <div className="book-page__feedback__content">
          <Title level={2} className="book-page__feedback__title">
            Leave Feedback
          </Title>
          <form
            onSubmit={handleFeedbackSubmit}
            className="book-page__feedback__form"
          >
            <Input.TextArea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Write your feedback here..."
              rows={4}
              required
              disabled={!borrowedBooks.includes(book.id)}
            />
            <Rate
              allowHalf
              value={rating}
              onChange={setRating}
              className="mb-4"
              disabled={!borrowedBooks.includes(book.id)}
            />
            <Button
              type="primary"
              htmlType="submit"
              disabled={!borrowedBooks.includes(book.id)}
              className="book-page__feedback__button"
            >
              Submit Feedback
            </Button>
          </form>

          <div className="book-page__feedback__list">
            <Title level={2} className="book-page__feedback__title">
              Existing Feedbacks
            </Title>
            <ul className="list-disc pl-5 text-gray-700">
              {book.feedback &&
                book.feedback.map((f, index) => (
                  <li key={index} className="book-page__feedback__list__item">
                    <span className="font-medium">{`Feedback ${
                      index + 1
                    }:`}</span>{" "}
                    {f}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Card>

      <Modal
        title="Sign In Required"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Go to Sign-In"
        cancelText="Cancel"
        className="book-page__modal"
      >
        <p className="book-page__modal__text">
          You need to be signed in to borrow this book. Do you want to sign in
          now?
        </p>
      </Modal>
    </div>
  );
};

export default BookPage;
