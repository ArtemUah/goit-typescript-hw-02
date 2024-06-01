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

Modal.setAppElement('#root');

function App() {
const [photos, setPhotos]=useState([]);
const [query, setQuery] = useState('');
const [page, setPage] = useState(1);
const [error, setError] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [loadMore, setLoadMore]= useState(false);
const [totalPages, setTotalPages] = useState(0);

const handleSearch = (newQuery) => {
  setError(false);
if(newQuery.trim()=== '') {
  toast.error('Please, input your search query');
};
  setQuery(newQuery);
  setPhotos([]);
  setLoadMore(false);
  setPage(1);
};

const handleLoadMore = () => {
    setPage(page + 1);
}

useEffect(()=>{
  if(query.trim() === ''){
    return;
  }
  async function getPhotos () {
    try {
      setIsLoading(true);
      setLoadMore(false);
      const data = await fetchPhotos(query, page);

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

const [opened, setOpened] = useState(false)
const [openPhoto, setOpenPhoto]= useState({urls:{
  full: 'none'
}, description: 'none', user: {name:'none'}});

const handleChoosePhoto = (id) => {
const chosenPhoto = photos.filter(photo=> photo.id === id);
setOpenPhoto({...chosenPhoto[0]});
setOpened(true);
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
