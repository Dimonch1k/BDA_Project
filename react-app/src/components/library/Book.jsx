import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const navigate = useNavigate();
  const openBook = (bookItem) => navigate(`/library/${bookItem.id}`);

  return (
    <div
      className="relative rounded-md text-white bg-amber-600"
      onClick={() => openBook(book)}
    >
      <div className="relative h-auto w-full overflow-hidden">
        <img src={book.cover_image} alt="book img" className="h-full w-full" />
      </div>

      <div className="px-5 py-3.5">
        <h2 className="font-bold font-playfair text-2xl text-center my-1.5 mb-2.5">
          {book.title}
        </h2>
        <p className="font-lato italic text-lg my-2.5">
          Author: "{book.author}"
        </p>
        <p className="font-raleway font-light my-2.5">Genre: "{book.genre}"</p>
        <p className="font-opensans text-base my-2.5">{book.description}</p>
      </div>
    </div>
  );
};

export default Book;
