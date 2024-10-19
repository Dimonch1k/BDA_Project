import "../../../styles/components/Catalog.scss";
import AddBook from "./AddBook";
import SearchBar from "./SearchBar";
import SortingSelector from "./SortingSelector";

const Catalog = ({ sortingMap, setCurrentSort, currentSort }) => {
  const sortingNames = Object.keys(sortingMap);

  return (
    <div className="catalog">
      {/* Add new Book form */}
      <div>
        <AddBook />
      </div>

      {/* Search bar and Sorting */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <SearchBar />

        {/* Books sorting */}
        <SortingSelector
          sortingNames={sortingNames}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
      </div>
    </div>
  );
};

export default Catalog;
