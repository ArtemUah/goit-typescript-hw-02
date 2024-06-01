import { FaSearch } from "react-icons/fa";
import css from "../SearchBar/SearchBar.module.css";
import React, { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (id: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <header className={css.header}>
      <form
        className={css.container}
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          onSearch(e.target.input.value);
          e.target.reset();
        }}
      >
        <button className={css.btn} type="submit">
          <FaSearch className={css.icon} />
        </button>
        <input
          className={css.inputField}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
