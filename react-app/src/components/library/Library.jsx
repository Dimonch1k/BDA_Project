import React, { useCallback, useEffect, useState } from "react";
import CatalogSettings from "./Catalog-Settings/Catalog.jsx";
import Book from "./Book/Book";

import "../../styles/components/library/Library.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooksItems,
  selectAllBooks,
} from "../../store/slices/bookSlice.js";

const sortingMap = {
  Title: (a, b) => a.title.localeCompare(b.title),
  Author: (a, b) => a.author.localeCompare(b.author),
  Genre: (a, b) => a.genre[0].localeCompare(b.genre[0]),
};

const Library = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  console.log(books);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    if (bookStatus === "idle") {
      dispatch(fetchBooksItems());
    }
  }, [bookStatus, dispatch]);

  // Searching Book
  const [currentSort, setCurrentSort] = useState("Title");
  const [currentSearch, setCurrentSearch] = useState("");

  const searchTerm = String(currentSearch || "").toLowerCase();

  const filteredAndSortedBooks = () => {
    return books
      .filter((book) => {
        return (
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.genre[0].toLowerCase().includes(searchTerm)
        );
      })
      .sort(sortingMap[currentSort]);
  };

  const renderBooks = () => {
    return filteredAndSortedBooks().map((book) => (
      <Book key={book.id} book={book} />
    ));
  };

  if (bookStatus === "loading")
    return <div className="loading">Loading...</div>;

  if (bookStatus === "failed")
    return <div className="error">Error: {error}</div>;

  return (
    <>
      <div className="container">
        <CatalogSettings
          sortingMap={sortingMap}
          setCurrentSort={setCurrentSort}
          setCurrentSearch={setCurrentSearch}
          currentSort={currentSort}
        />
        <div className="book-list">{renderBooks()}</div>
      </div>
    </>
  );
};

export default Library;
