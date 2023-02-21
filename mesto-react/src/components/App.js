//import logo from './logo.svg';
//import profilePhoto from '../images/Avatar.png'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import React from "react";
//import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        //console.log(data)
        setCurrentUser(data)
        //console.log(currentUser.avatar)
      })
      .catch((err) => {
        console.log(`Ошибка. Запрос не выполнен ${err}`);
      })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => {
        console.log(`Ошибка. Запрос не выполнен ${err}`);
      })
  }, []);


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    //console.log(card)
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
    else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((data) => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
  }

  function handleSubmitProfile(profileInfo) {
    api.editProfile(profileInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
  }

  function handleUpdateAvatar(link) {
    api.changeAvatar(link.avatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
  }

  function hadleAddPlace(data) {
    api.addNewCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <>
          <Header />
          <Main
            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleSubmitProfile} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={hadleAddPlace} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
