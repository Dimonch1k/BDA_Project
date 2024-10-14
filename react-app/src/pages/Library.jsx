import React, { useEffect, useState } from "react";
import CatalogSettings from "../components/library/Catalog.jsx";
import Book from "../components/library/Book.jsx";

import { useDispatch, useSelector } from "react-redux";
import { fetchBooksItems, selectAllBooks } from "../store/slices/bookSlice.js";

const sortingMap = {
  Title: (a, b) => a.title.localeCompare(b.title),
  Author: (a, b) => a.author.localeCompare(b.author),
  Genre: (a, b) => a.genre[0].localeCompare(b.genre[0]),
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
    return <div className="size-12">Loading...</div>;

  if (bookStatus === "failed")
    return <div className="text-red-600 size-12">Error: {error}</div>;

  return (
    <>
      <div className="container mx-auto py-5">
        <CatalogSettings
          sortingMap={sortingMap}
          setCurrentSort={setCurrentSort}
          setCurrentSearch={setCurrentSearch}
          currentSort={currentSort}
        />
        <div className="grid grid-cols-auto-fill max-[200px] gap-5 row-gap-7.5">
          {renderBooks()}
        </div>
      </div>
    </>
  );
};

export default Library;
