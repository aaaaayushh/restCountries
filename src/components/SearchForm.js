import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const {
    setSearchTerm,
    setSortby,
    countries,
    // sortby,
    setCountries,
  } = useGlobalContext();
  const searchValue = React.useRef("");

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  const searchCountry = () => {
    setSearchTerm(searchValue.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Search</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCountry}
          />
        </div>
        <label htmlFor="sort">Sort By:</label>
        <select onChange={(e) => setSortby(e.target.value)}>
          <option value="name">Country Name</option>
          <option value="population">Population</option>
          <option value="area">Area</option>
        </select>
      </form>
    </section>
  );
};

export default SearchForm;
