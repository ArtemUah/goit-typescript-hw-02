import { useState, useEffect } from 'react'
import SearchBar from './SearchBar/SearchBar'
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMore from './LoadMoreBtn/LoadMoreBtn';
import fetchPhotos from '../photo-api';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import Modal from 'react-modal';
import ImageModal from './ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import { ModalInterface, Photo } from './types';

Modal.setAppElement('#root');
function App() {
const [photos, setPhotos]=useState<Photo[]>([]);
const [query, setQuery] = useState<string | number>('');
const [page, setPage] = useState<number>(1);
const [error, setError] = useState<boolean>(false);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [loadMore, setLoadMore]= useState<boolean>(false);
const [totalPages, setTotalPages] = useState<number>(0);

const handleSearch = (newQuery: string | number): void => {
  setError(false);
if(newQuery.toString().trim()=== '') {
  toast.error('Please, input your search query');
};
  setQuery(newQuery);
  setPhotos([]);
  setLoadMore(false);
  setPage(1);
};

const handleLoadMore = ():void => {
    setPage(page + 1);
}

useEffect(()=>{
  if(query.toString().trim() === ''){
    return;
  }
  async function getPhotos () {
    try {
      setIsLoading(true);
      setLoadMore(false);
      const data = await fetchPhotos(query, page);
      console.log(data)
      setPhotos((prevState)=>{
        return [...prevState, ...data.results];
      });
  
      setTotalPages(data.total_pages);
      if(data.total_pages === 1 || page === totalPages){
        setLoadMore(false);
      } else {
        setLoadMore(true)
      }

      if(data.total_pages === 0) {
        toast.error('There is no results');
        setLoadMore(false);
            }

    } catch (error) {
      setError(true);
      setLoadMore(false);
    }
    finally {
      setIsLoading(false);
    }
  };
  getPhotos();
},[query, page]);

const [opened, setOpened] = useState<boolean>(false)
const [openPhoto, setOpenPhoto]= useState<Photo | null>(null);

const handleChoosePhoto = (id:string): void => {
const chosenPhoto = photos.filter(photo=> photo.id === id);
setOpenPhoto({...chosenPhoto[0]});
setOpened(true);
console.log(openPhoto);
}

const closeModal = () => {setOpened(false)}



  return (
    <>
      <SearchBar onSearch={handleSearch}/>
      <Toaster
  position="top-left"
  reverseOrder={false}
  toastOptions={{duration: 1000}}
/>
      {error && <ErrorMessage/>}
      {photos.length >0 && <ImageGallery itemList={photos} onChoosePhoto={handleChoosePhoto}/>}
      {isLoading && <Loader/>}
      {loadMore && <LoadMore onClick={handleLoadMore}/>}
      <ImageModal isOpen={opened} item={openPhoto} closeModal={closeModal} />
    </>
  )
}

export default App
