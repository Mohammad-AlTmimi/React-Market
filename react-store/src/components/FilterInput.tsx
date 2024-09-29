import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


interface FilterInputProps {
  onFilter: (filterText: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search for categories (e.g., Men's Clothing)"
      value={filterValue}
      onChange={handleInputChange}
    />
  );
};

export default FilterInput;
