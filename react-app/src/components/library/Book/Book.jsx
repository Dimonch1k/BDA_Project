import { useNavigate } from "react-router-dom";
import "../../../styles/components/library/Book/Book.scss";

const Book = ({ book }) => {
  // const navigate = useNavigate();
  // const openBook = (bookItem) => navigate(`/library/${bookItem.id}`);

  return (
    <div
      className="book"
      //  onClick={() => openBook(book)}
    >
      <div className="book__img-wrapper">
        <img src={book.cover_image} alt="book img" className="book__img" />
      </div>
      <div className="book__info">
        <h2 className="book__title">{book.title}</h2>
        <p className="book__author">Author: "{book.author}"</p>
        <p className="book__genre">Genre: "{book.genre}"</p>
        <p className="book__description">{book.description}</p>
      </div>
    </div>
  );
};

export default Book;
