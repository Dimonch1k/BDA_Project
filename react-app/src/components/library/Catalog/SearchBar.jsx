import React, { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { FaArrowRightLong } from "react-icons/fa6";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { setSearchTerm } = useStateContext();

  const handleSearch = () => {
    setSearchTerm(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="catalog__search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setInputValue(e.target.value)}
        className="catalog__search-input"
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <button onClick={handleSearch} className="catalog__search-btn-enter">
        <FaArrowRightLong />
      </button>
    </div>
  );
}

export default SearchBar;
