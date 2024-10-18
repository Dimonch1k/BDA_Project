import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const SortingSelector = ({ sortingNames, currentSort, setCurrentSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectSort = (sortingName) => {
    setCurrentSort(sortingName);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={selectorRef}>
      <button
        className="inline-flex justify-between w-full rounded-lg px-5 py-3 bg-[#3b82f6] text-white font-semibold
        shadow-lg hover:bg-[#2563eb] focus:outline-none focus:ring-4 focus:ring-[#60a5fa]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort || "Sort by"}
        <span className="ml-2 transform transition-transform duration-300 flex items-center">
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full rounded-lg shadow-lg bg-white z-10">
          {sortingNames.map((sortingName) => (
            <div
              key={sortingName}
              className={`block px-5 py-3 text-gray-900 hover:bg-[#3b82f6] hover:text-white transition-colors 
                duration-200 ease-in-out cursor-pointer rounded-lg ${
                  currentSort === sortingName
                    ? "bg-[#3b82f6] text-white rounded-b-lg"
                    : ""
                }`}
              onClick={() => handleSelectSort(sortingName)}
            >
              {sortingName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortingSelector;
