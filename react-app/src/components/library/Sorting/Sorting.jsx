import React from 'react'

function Sorting({ setCurrentSort, currentSort, sortingMap }) {
  const sortingNames = Object.keys(sortingMap);
  const handleSetCurrentSort = (sortingName) => {
    setCurrentSort(sortingName);
  };

  return (
    <div className="sorting">
      <select
        className="sorting__content"
        onChange={(e) => handleSetCurrentSort(e.target.value)}
      >
        {sortingNames.map((sortingName) => (
          <option key={sortingName} className={currentSort && "active"}>
            {sortingName}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Sorting;