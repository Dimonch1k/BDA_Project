import React, { useCallback, useEffect, useState } from "react";
import AddBook from "./Add-Book/Add-Book";
import Sorting from "./Sorting/Sorting";
import Book from "./Book/Book";

import "../../styles/components/library/Library.scss";

const sortingMap = {
  Title: (a, b) => a.title - b.title,
  Author: (a, b) => b.author - a.author,
  Genre: (a, b) => a.genre - b.genre,
};

const Library = () => {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [currentFilter, setCurrentFilter] = useState("All");

  const [currentSort, setCurrentSort] = useState("Title");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://freetestapi.com/api/v1/books");
        const data = await response.json();

        const limitedBooks = data.slice(0, 10);
        setBooks(limitedBooks);

        books.map((book) => console.log(book));


        localStorage.setItem("books", JSON.stringify(limitedBooks));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);


  const renderBooks = () => {
    return books.sort(sortingMap[currentSort]).map((book) => (
      <Book key={book.id}
        image={book.cover_image}
        title={book.title}
        author={book.author}
        genre={book.genre}
        description={book.description} />
    ));
  };

  return (
    <>
      <div className="container">
        <div className="catalog-settings">
          {/* Add new Book */}
          <AddBook />

          {/* Sorting */}
          <Sorting setCurrentSort={setCurrentSort} currentSort={currentSort} sortingMap={sortingMap} />

          {/* Filter */}
        </div>

        <div className="book-list">
          {renderBooks()}
        </div>
      </div>
    </>
  );
};

export default Library;
