//import logo from './logo.svg';
//import profilePhoto from '../images/Avatar.png'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from "react";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    //console.log(card)
    setSelectedCard(card);
  }

  return (
    <>
      <Header />
      <Main
        handleEditAvatarClick={handleEditAvatarClick}
        handleEditProfileClick={handleEditProfileClick}
        handleAddPlaceClick={handleAddPlaceClick}
        onCardClick ={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        name={'popupEdit'}
        title={'Редактировать профиль'}
        textButton={'Сохранить'}
        children={
          <><section className="popup__section">
            <input type="text" className="popup__input" id="name" name="name" placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="popup__input-error"></span>
          </section>
            <section className="popup__section">
              <input type="text" className="popup__input" id="job" name="job" placeholder="О себе" required minLength="2" maxLength="200" />
              <span className="popup__input-error"></span>
            </section></>
        }
        onClose={closeAllPopups}
      />
      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        name={'putchAvatar'}
        title={'Обновить аватар'}
        textButton={'Сохранить'}
        children={
          <><section className="popup__section popup__section_putch-avatar">
            <input type="url" className="popup__input" id="avatar" name="avatar" placeholder="Ссылка на аватар" required />
            <span className="popup__input-error"></span>
          </section></>
        }
        onClose={closeAllPopups}
      />
      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        name={'addPopup'}
        title={'Новое место'}
        textButton={'Создать'}
        children={
          <>
            <section className="popup__section">
              <input type="text" className="popup__input" id="new_name" name="name" placeholder="Название" required minLength="2" maxLength="30" />
              <span className="popup__input-error"></span>
            </section>
            <section className="popup__section">
              <input type="url" className="popup__input" id="new_image" name="job" placeholder="Ссылка на картинку" required />
              <span className="popup__input-error"></span>
            </section>
          </>
        }
        onClose={closeAllPopups}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <div className="popup popup_photo" id="photoPopup">
        <div className="popup__container popup__container_photo">
          <button className="popup__close" type="button"></button>
          <img src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg" alt="пример" className="popup__image" />
          <p className="popup__subtitle"></p>
        </div>
      </div>
      <div className="popup" id="deletePopup">
        <div className="popup__container">
          <button className="popup__close" type="button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="submit" className="popup__submit popup__submit_delete">Да</button>
        </div>
      </div>
    </>
  );
}

export default App;
