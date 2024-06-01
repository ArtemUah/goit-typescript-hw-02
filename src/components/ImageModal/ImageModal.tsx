import Modal from "react-modal";
import css from "../ImageModal/ImageModal.module.css";
import { Photo } from "../types";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(73, 66, 70, 0.62)",
  },

  content: {
    width: "450px",
    height: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

interface ImageModalProps {
  isOpen: boolean;
  item: Photo | null;
  closeModal: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  item,
  closeModal,
}) => {
  return (
    item && (
      <Modal
        className={css.container}
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {item.description && <h3>{item.description}</h3>}
        <div className={css.container}>
          <img
            className={css.img}
            src={item.urls.full}
            alt={item.description}
          />

          <h3>Author: {item.user.name}</h3>
        </div>
      </Modal>
    )
  );
};

export default ImageModal;
