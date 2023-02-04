function ImagePopup(props){
    return(
        <div className={`popup popup_photo ${props.card ? `popup_opened` : ''}`} id="photoPopup">
        <div className="popup__container popup__container_photo">
          <button className="popup__close" type="button" onClick={props.onClose}></button>
          <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg" alt="пример" className="popup__image" />
          <p className="popup__subtitle">{props.card ? props.card.name : ''}</p>
        </div>
      </div>
    )
}

export default ImagePopup;