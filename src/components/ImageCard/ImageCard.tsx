import React from 'react';
import css from '../ImageCard/ImageCard.module.css';
import { Photo } from '../types';

interface ImageCardProps {
  item: Photo;
}

 const ImageCard: React.FC<ImageCardProps> = ({item}) => {
    return (<div  className={css.item}>
        <img className={css.image} src={item.urls.small} alt={item.description} />
      </div>)
}

export default ImageCard;