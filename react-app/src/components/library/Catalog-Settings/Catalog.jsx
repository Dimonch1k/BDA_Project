import React, { useState } from "react";
import AddBook from "./Add-Book/AddBook";
import Sorting from "./Sort/Sorting";
import SearchBar from "./Search-Bar/SearchBar";

const CatalogSettings = ({
  sortingMap,
  setCurrentSort,
  currentSort,
  setCurrentSearch,
}) => {
  return (
    <div className="catalog-settings">
      <AddBook />
      <SearchBar setCurrentSearch={setCurrentSearch} />
      <Sorting
        setCurrentSort={setCurrentSort}
        currentSort={currentSort}
        sortingMap={sortingMap}
      />
    </div>
  );
};

export default CatalogSettings;
