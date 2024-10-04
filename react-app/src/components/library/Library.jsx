import React from "react";
import AddBook from "./Add-Book/Add-Book";

const filterMap = {
  All: () => true,
  Expires: (product) => product.expire,
  "In Stock": (product) => !product.expire,
};

const sortingMap = {
  "A-Z": (a, b) => a.price - b.price,
  "": (a, b) => b.price - a.price,
  "In stock": (a, b) => a.expire - b.expire,
  Expires: (a, b) => b.expire - a.expire,
};

const Library = () => {
  return (
    <>
      <div className="container">
        <div className="catalog-settings">
          {/* Add new Book */}
          <AddBook />

          {/* Sorting */}

          {/* Filter */}
        </div>
      </div>
    </>
  );
};

export default Library;
