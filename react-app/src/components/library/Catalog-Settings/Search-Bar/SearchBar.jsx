import React from "react";
import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ setCurrentSearch }) => {
  const handleChange = (value) => setCurrentSearch(value.target.value.trim());

  return (
    <div className="search-bar">
      <Search
        placeholder="Search books by title, author, or genre"
        onChange={(e) => handleChange(e)}
        style={{ width: 300, padding: "0 auto" }}
      />
    </div>
  );
};

export default SearchBar;
