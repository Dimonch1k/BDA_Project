import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  toggleFavorite,
  selectFavorites,
} from "../../store/slices/favoritesSlice";
import { FaHeart, FaTimes } from "react-icons/fa";

const Book = ({ book, favoriteBook }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites.some((favBook) => favBook.id === book.id);

  const openBook = (bookItem) => {
    navigate(`/library/${bookItem.id}`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(book));
  };

  const handleRemoveFavorite = (book) => dispatch(toggleFavorite(book));

  return (
    <div
      className="relative bg-gradient-to-br from-green-400 to-yellow-400 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={() => openBook(book)}
    >
      <div className="w-full bg-white h-64 overflow-hidden rounded-t-lg">
        <img
          src={book.image}
          alt="book img"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-5 bg-white">
        <h2 className="text-xl text-center font-semibold text-gray-900 mb-2">
          {book.title}
        </h2>
        <p className="text-gray-700 mb-1">
          <span className="font-bold text-gray-900">Author:</span> {book.author}
        </p>
        <p className="text-gray-700 mb-3">
          <span className="font-bold text-gray-900">Genre:</span>{" "}
          {book.category}
        </p>
        <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>

        {favoriteBook ? (
          <button
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500 transition-colors duration-300 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFavorite(book);
            }}
          >
            <FaTimes size={20} />
          </button>
        ) : (
          <button
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-300 ${
              isFavorite ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleToggleFavorite}
          >
            <FaHeart size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Book;
