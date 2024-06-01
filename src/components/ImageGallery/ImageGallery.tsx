import ImageCard from '../ImageCard/ImageCard';
import css from '../ImageGallery/ImageGallery.module.css'
import { Photo } from '../types';

interface ImageGalleryProps {
    itemList: Photo[];
    onChoosePhoto: (id:string) => void;
}

 const ImageGallery: React.FC<ImageGalleryProps> = ({itemList, onChoosePhoto}) => {
    return (<ul className={css.container}>
        {itemList.map((item)=> {
            return (<li key={item.id} id={item.id} onClick={(e)=>{
                onChoosePhoto(e.currentTarget.id);
            }}>
                <ImageCard item={item}/>
            </li>)
        })}
    </ul>
    )};


    export default ImageGallery;