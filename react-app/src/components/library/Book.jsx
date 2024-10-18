import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const navigate = useNavigate();
  const openBook = (bookItem) => navigate(`/library/${bookItem.id}`);

  return (
    <div
      className="relative rounded-md text-white bg-amber-600"
      onClick={() => openBook(book)}
    >
      <div className="book__img-wrapper">
        <img src={book.image} alt="book img" className="book__img" />
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
