import { FaSearch } from "react-icons/fa";
import css from '../SearchBar/SearchBar.module.css'

export default function ({onSearch}) {
    
    return (
    <header className={css.header}>
        <form className={css.container} 
        onSubmit={(e)=> {
          e.preventDefault();
          onSearch(e.target.elements.input.value);
          e.target.reset();
        }} >
        <button className={css.btn} type="submit" ><FaSearch className={css.icon}/>
</button>
          <input className={css.inputField}
            type="text"
            name='input'
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
}
