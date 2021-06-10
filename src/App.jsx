import React, { useState } from 'react';
import { userData } from './userData';
import './App.css';



const Card = (props) => {
  return (
    <div className="card" onClick={() => props.handleShowModal(props.user)}>
      <h3>{props.user.name}</h3>
      <p>age: {props.user.age}</p>
      <p>gender: {props.user.gender}</p>
      <p>balance: {props.user.balance}</p>
      <img src={props.user.picture} alt="" />
    </div>
  )
}

const UserList = (props) => {
  return (
    <div className="cards">
      {props.users.map(user => <Card handleShowModal={props.handleShowModal} user={user} />)}
    </div>
  )
}

const Search = (props) => {
  console.log(props)
  return (
    <input
      type="text"
      placeholder='Pick your name'
      onChange={props.handleChange}
      value={props.value}
    />
  )
}

const Sorting = (props) => {
  console.log(props)
  return (
    <select value={props.value} onChange={props.sorting}>
      <option value="value1">без сортировки</option>
      <option value="value2" >по возрастанию</option>
    </select>
  )
}

const Modal = (props) => {

  return (
    <div className="modal" onClick={props.close} >
      <div className="modal__window" onClick={e => e.stopPropagation()}>
        {/* {props.item.name} */}
        <p>{props.item.name}</p>
        <p>id: {props.item._id}</p>
        <p>guid: {props.item.guid}</p>
        <p>balance: {props.item.balance}</p>
        <p>age: {props.item.age}</p>
        <p>eyeColor: {props.item.eyeColor}</p>
        <p>gender: {props.item.gender}</p>
        <p>company: {props.item.company}</p>
        <p>email: {props.item.email}</p>
        <p>phone: {props.item.phone}</p>
        <p>address: {props.item.address}</p>

      </div>
    </div>
  )
}

const App = () => {
  const [state, setState] = useState(userData);
  const [sort, setSort] = useState('value1');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState({ isShow: false, data: {} });

  const handleChange = (e) => {
    const { value } = e.target;
    const result = userData.filter(item => item.name.includes(value))
    setState(result)
    setSearch(e.target.value)
  }

  const sorting = (e) => {
    setSort(e.target.value)
    if (e.target.value === 'value1') {
      setState(userData);
      return;
    }
    const result = [...userData].sort((el1, el2) => {

      if (el1.age == el2.age)
        return 0;
      else if (el1.age > el2.age)
        return 1;
      else if (el1.age < el2.age)
        return -1;
    });
    setState(result)
  }

  const handleShowModal = (item) => {
    setShowModal({
      isShow: true,
      data: item
    })
  }
  const handlCloseModal = (e) => {
    setShowModal({
      isShow: false,
      data: {}
    })
  }

  return (
    <div className="App">
      <div className="main">
        <header>
          <button onClick={() => {
            setSearch('')
            setSort('value1')
            setState(userData)
          }}>clear</button>
          <Sorting sorting={sorting} value={sort} />
          <Search handleChange={handleChange} value={search} />
        </header>
        <UserList users={state} handleShowModal={handleShowModal} />
        {showModal.isShow && <Modal item={showModal.data} close={handlCloseModal} />}
      </div>
    </div>
  );
}



export default App;
