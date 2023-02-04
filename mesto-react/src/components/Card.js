function Card(props) {
    function handleClick() {
        props.onCardClick(props.item);
      }  


    return (
        <div className="grid__item">
            <button type="button" className="grid__trash"></button>
            <img src={props.link} alt={props.name} className="grid__image" onClick={handleClick}/>
            <div className="grid__box">
                <h2 className="grid__title">{props.name}</h2>
                <div className="grid__contaner">
                    <button type="button" className="grid__like"></button>
                    <p className="grid__like-count">{props.likesCount}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;