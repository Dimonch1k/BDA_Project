import React, { useCallback, useEffect, useState } from "react";
import CatalogSettings from "./Catalog-Settings/Catalog.jsx";
import Book from "./Book/Book";

import "../../styles/components/library/Library.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooksItems } from "../../slices/booksSlice";

const sortingMap = {
  Title: (a, b) => a.title.localeCompare(b.title),
  Author: (a, b) => a.author.localeCompare(b.author),
  Genre: (a, b) => a.genre[0].localeCompare(b.genre[0]),
};

const Library = () => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [currentSort, setCurrentSort] = useState("Title");
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/books");
        const data = await response.json();

        const limitedBooks = data.slice(0, 10);
        setBooks(limitedBooks);

        localStorage.setItem("books", JSON.stringify(limitedBooks));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // console.log(Object.keys(currentSearch));
  // console.log(currentSearch);

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

  // const dispatch = useDispatch();
  // const {
  //   items: booksItems,
  //   status,
  //   error,
  // } = useSelector((state) => state.books);

  // useEffect(() => {
  //   if (status === "idle") {
  //     dispatch(fetchBooksItems());
  //   }
  // }, [status, dispatch]);

  // if (status === "loading") return <div>Loading...</div>;

  // if (status === "failed") return <div>Error: {error}</div>;

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
