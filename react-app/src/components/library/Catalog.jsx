import AddBook from "./Add-Book/AddBook";
import SearchBar from "./SearchBar";

const Catalog = ({
  sortingMap,
  setCurrentSort,
  currentSort,
  setSearchTerm,
}) => {
  const handleChange = (value) => setSearchTerm(value.target.value.trim());
  const sortingNames = Object.keys(sortingMap);
  const handleSetCurrentSort = (sortingName) => {
    setCurrentSort(sortingName);
  };

  return (
    <div className="flex items-center gap-1.5 mb-5 px-5 h-12">
      {/* Add new Book form */}
      <AddBook />
      {/* Search bar */}
      <SearchBar />

      {/* Books sorting */}
      <div className="relative">
        <select
          className="appearance-none outline-none cursor-pointer bg-gray-100 border border-gray-300
           rounded px-5 py-2 shadow-md text-center transition-all hover:bg-gray-200 hover:border-gray-400 
           hover:shadow-md focus:bg-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          onChange={(e) => handleSetCurrentSort(e.target.value)}
        >
          {sortingNames.map((sortingName) => (
            <option key={sortingName} className={currentSort && "active"}>
              {sortingName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Catalog;
