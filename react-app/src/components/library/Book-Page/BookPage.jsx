import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectAllBooks } from "../../../slices/booksSlice";

// import "../../../styles/components/serverPosts/PostDetail.scss";

const BookPage = () => {
  const { id } = useParams();
  //   const dispatch = useDispatch();
  //   const books = useSelector(selectAllBooks);
  //   const book = books.find((p) => p.id === id);

  //   if (!book) return <div>Loading...</div>;

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  return (
    <div className="book-page">
      {/* <div className="book-page__content">
        <h1 className="book-page__title">{post.title}</h1>
        <p className="book-page__body">{post.body}</p>
      </div>

      <div className="book-page__feedback">
        <h2>Feedback</h2>
        <form
          onSubmit={handleFeedbackSubmit}
          className="book-page__feedback-form"
        >
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            style={{ width: "400px", height: "60px" }}
            placeholder="Write your feedback here..."
            required
          />
          <button className="book-page__submit-btn" type="submit">
            Submit Feedback
          </button>
        </form>
      </div>

      <h2>Existing Feedbacks</h2>
      <ul className="feedbacks">
        {post.feedback &&
          post.feedback.map((f, index) => <li key={index}>{f}</li>)}
      </ul> */}
    </div>
  );
};

export default BookPage;
