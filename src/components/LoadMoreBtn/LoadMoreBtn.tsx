import React from "react";
import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMore: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className={css.btn} onClick={(e) => onClick()}>
      Load More
    </button>
  );
};

export default LoadMore;
