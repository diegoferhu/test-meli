import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("Hello");
  const navigate = useNavigate();

  const handlerSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(e.target.value);
      navigate(`/items?search=${e.target.value}`);
    }
  };
  return (
    <div>
      <form>
        <input
          name="search"
          type="text"
          placeholder="search"
          onKeyDown={handlerSearch}
        />
        Item to search: {search}
      </form>
    </div>
  );
};

export default Search;
