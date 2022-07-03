import React from "react";
import avatar from '../images/profile-avatar.jpg';
import {api} from "../utils/Api";
import {useState} from "react";
import Card from "./Card";

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription , setUserDescription ] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  const [ userId, setUserId ] = useState('');



  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
  
  .then(([profile, cards]) => {
    setUserName(profile.name)
    setUserDescription(profile.about)
    setUserAvatar(profile.avatar)
    setCards(cards)
    setUserId(profile._id)
    
  
  })
  
  .catch(err => {
    console.log('Error', err);
    // тут ловим ошибку
  });
  })

  return (
    <main>
    <section className="profile">
      <button onClick={props.onEditAvatar} className="profile__button-edit-avatar">
        {/* <img src={avatar} alt="Жак-Ив Кусто" className="profile__avatar"/> */}
        <img style={{ backgroundImage: `url(${userAvatar})` }} alt="Жак-Ив Кусто" className="profile__avatar"/>
      </button>
      <div className="profile__about">
        {/* <h1 className="profile__title">Жак-Ив Кусто</h1> */}
        <h1 className="profile__title">{userName}</h1>
        <button onClick={props.onEditProfile} className="profile__open-window"></button>
        {/* <p className="profile__subtitle">Исследователь океана</p> */}
        <p className="profile__subtitle">{userDescription}</p>
      </div>
      <button onClick={props.onAddPlace} className="profile__button"></button>
    </section>
    <section className="elements">
    </section>
    {cards.map((card) => (
<Card
card={card}
currentUser={userId}
// onCardClick={props.onCardClick}
key={card._id}
/>
    )
)}
  </main>
)   
}

export default Main;









// function create(props) {
//   console.log('r');
//   return (
//   <>
//     <h1>{props.a}</h1>
//     <p>{props.b}</p>
  
//   </>
//   )
// }

// create("Вася", "Петя")


// function create(rr) {
//   console.log(rr);
// }
// create("Вася")





{/* <div className="element">
<figure className="element__card">
  <img src="./images/elements-karachaevsk.jpg" alt="Карачаевск" className="element__image"/>
  <figcaption>
    <h2 className="element__title">Карачаевск</h2>
  </figcaption>
</figure>
<button className="element__button-like">
</button>
<button className="element__button-delete">
  <img className="element__delete" src="<%=require('./images/element-delete.svg')%>" alt="Удалить"/>
</button>
<span className="element__like-count"></span>
</div> */}

















