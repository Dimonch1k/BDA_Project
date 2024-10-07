import "../../../styles/components/library/Book/Book.scss";

const Book = ({ image, title, author, genre, description }) => {

  return (
    <div className="book">
      <div className="book__cover-wrapper">
        <img src={image} alt="book cover" className="book__cover" />
      </div>
      <div className="book__info">
        <h2 className="book__title">{title}</h2>
        <p className="book__author">Author: "{author}"</p>
        <p className="book__genre">Genre: "{genre}"</p>
        <p className="book__description">{description}</p>
      </div>
    </div>
  );
};

export default Book;