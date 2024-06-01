import css from '../LoadMoreBtn/LoadMoreBtn.module.css';

export default function LoadMore ({onClick}) {
    return( <button className={css.btn} onClick={(e)=>onClick()}>Load More</button>)
}