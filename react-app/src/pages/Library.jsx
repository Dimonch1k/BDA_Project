import React, { useEffect, useState } from "react";
import CatalogSettings from "../components/library/Catalog/Catalog.jsx";
import Book from "../components/library/Book.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksItems, selectAllBooks } from "../store/slices/bookSlice.js";
import { useStateContext } from "../contexts/ContextProvider.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/animations.css";

const sortingMap = {
  Title: (a, b) => a.title.localeCompare(b.title),
  Author: (a, b) => a.rating.count > b.rating.count,
  Genre: (a, b) => a.category.localeCompare(b.category),
};

const Library = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooksItems());
    }
  }, [bookStatus, dispatch]);

  const [currentSort, setCurrentSort] = useState("Title");
  const { searchTerm, setSearchTerm } = useStateContext();

  const filteredAndSortedBooks = () => {
    return books
      .filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm) ||
          book.rating.count.toLowerCase().includes(searchTerm) ||
          book.category.toLowerCase().includes(searchTerm)
        );
      })
      .sort(sortingMap[currentSort]);
  };

  const renderBooks = () => {
    return (
      <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {filteredAndSortedBooks().map((book) => (
          <CSSTransition key={book.id} timeout={500} classNames="fade">
            <Book book={book} favoriteBook={false} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  };

  if (bookStatus === "loading")
    return <div className="text-lg text-center mt-5">Loading...</div>;

  if (bookStatus === "failed")
    return (
      <div className="w-full text-center text-red-600 text-lg mt-10">
        Error: {error}
      </div>
    );

  return (
    <>
      <div className="container mx-auto py-8 sm:px-0 px-5">
        <CatalogSettings
          sortingMap={sortingMap}
          setCurrentSort={setCurrentSort}
          setSearchTerm={setSearchTerm}
          currentSort={currentSort}
        />
        {renderBooks()}
      </div>
    </>
  );
};

export default Library;
