import Modal from 'react-modal';
import css from '../ImageModal/ImageModal.module.css'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(73, 66, 70, 0.62)',
    },

    content: {
      width:'450px',
      height: '400px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      overflow: 'hidden',
    },
  };

  

export default function ({isOpen, item, closeModal}) {
   return ( <Modal className={css.container} isOpen={isOpen} onRequestClose={closeModal} 
   style={customStyles}>
    {item.description && <h3>{item.description}</h3>}
    <div className={css.container}>
    <img className={css.img} src={item.urls.full} alt={item.description} />
    
    <h3>Author: {item.user.name}</h3>
     </div>
  </Modal>)
}
