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
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      setIsModalVisible(true);
    } else {
      dispatch(borrowBook(book.id));
      message.success("Book borrowed successfully!");
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate("/library/sign-in");
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (!book) {
    return <div className="text-center text-red-500">Book not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-b from-blue-50 to-blue-100">
      <Card className="mb-8 shadow-lg rounded-3xl bg-white overflow-hidden border border-gray-300 transition-transform transform hover:scale-105">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-72 object-cover transition duration-300 hover:scale-105"
        />
        <div className="p-6">
          <Title
            level={1}
            className="text-center text-4xl font-bold text-gray-800"
          >
            {book.title}
          </Title>
          <Paragraph className="text-center text-gray-600 text-lg mt-2 mb-4">
            {book.body}
          </Paragraph>
          <Button
            type="primary"
            className="mt-4 w-full rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition duration-300"
            onClick={handleBorrowClick}
            disabled={borrowedBooks.includes(book.id)}
          >
            {borrowedBooks.includes(book.id)
              ? "Already Borrowed"
              : "Borrow Book"}
          </Button>
        </div>
      </Card>

      <Card className="mb-8 shadow-lg rounded-3xl bg-white overflow-hidden border border-gray-300 transition-transform transform hover:scale-105">
        <div className="p-6">
          <Title level={2} className="text-2xl font-semibold text-gray-800">
            Leave Feedback
          </Title>
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col">
            <Input.TextArea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Write your feedback here..."
              rows={4}
              className="mb-4 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
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
              className="w-full rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              Submit Feedback
            </Button>
          </form>

          <div className="mt-6">
            <Title level={2} className="text-2xl font-semibold text-gray-800">
              Existing Feedbacks
            </Title>
            <ul className="list-disc pl-5 text-gray-700">
              {book.feedback &&
                book.feedback.map((f, index) => (
                  <li key={index} className="mb-2">
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
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Go to Sign-In"
        cancelText="Cancel"
        className="text-center"
      >
        <p className="text-gray-700">
          You need to be signed in to borrow this book. Do you want to sign in
          now?
        </p>
      </Modal>
    </div>
  );
};

export default BookPage;
