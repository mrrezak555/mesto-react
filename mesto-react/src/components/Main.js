import profilePhoto from '../images/Avatar.png'
import React from "react";
import { api } from '../utils/Api'
import Card from './Card';

function Main(props) {
    const [userName, setUserName] = React.useState([]);
    const [userDescription, setUserDescription] = React.useState([]);
    const [userAvatar, setUserAvatar] = React.useState([]);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                //console.log(data)
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
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

    return (
        <main>
            <section className="profile">
                <button className="profile__button-avatar" type="button" onClick={props.handleEditAvatarClick} >
                    <img src={userAvatar} alt="Аватар" className="profile__avatar" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.handleEditProfileClick}></button>
                    <p className="profile__occupation">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.handleAddPlaceClick}></button>
            </section>
            <section className="grid">
                {
                    cards.map((item) =>{
                        //console.log(item.likes.length)
                        //console.log(item)
                        return <Card
                        link={item.link}
                        key={item._id}
                        name={item.name}
                        likesCount={item.likes.length}
                        onCardClick={props.onCardClick}
                        item={item}
                        />;
                    })

                }
            </section>
        </main>
    )
}

export default Main;