import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState("Hello");
  const navigate = useNavigate();

  const navigateTo = (search) => {
    const idItemRegex = /^MLA/gm;

    if (search.match(idItemRegex)) {
      navigate(`/items/${search}`);
      return;
    }
    navigate(`/items?search=${search}`);
  };

  const handlerSearch = (e) => {
    setSearch(e.target.value);

    if (e.key === "Enter") {
      e.preventDefault();
      navigateTo(e.target.value);
    }
  };

  const handlerClickSearch = (e) => {
    e.preventDefault();
    navigateTo(search);
  };

  return (
    <form className="search">
      <input
        className="search__input"
        name="search"
        type="text"
        placeholder="Buscar productos, marcas y más"
        onKeyDown={handlerSearch}
      />
      <button className="search__button" onClick={handlerClickSearch}>
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
};

export default Search;
