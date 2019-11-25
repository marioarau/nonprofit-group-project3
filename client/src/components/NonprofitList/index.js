//import  React , { Component } from "react";
import React from "react";
import Modal from 'react-modal';
import "./NonprofitList.css";
import Axios from "axios";
import userContext from "../../userContext";

export function NonprofitList(props) {
   
  return (
    <ul className="list-group">{props.nonprofits.map(item => {
      return (<NonprofitListItem showAction={props.showAction} item={item} key={item.id} />)
    })
    }</ul>
  );
};

export function NonprofitListItem(props) {
  const myUser = React.useContext(userContext);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [JobModalId, JobId] = React.useState("");
  const [userid] = React.useState(myUser.id);
  const [modalForm, setModalForm] = React.useState({
    donationAmount: "",
  })

  if (!props.item) {
    return null;
  }
  var subtitle;

  const { id,
    orgName,
    city,
    state,
    zip,
    orgFocus,
    url
  } = props.item;
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  function openModal(item, id) {
    setModalForm({
      ...modalForm,
      donationAmount: item.donationAmt
    })
    
    setIsOpen(true);
    JobId(id);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleFavoriteSubmit(event , id)  {
    
    const values = {
      
      NonprofitId: id,
      UserId: userid,
      donationAmt: 0
    }
    Axios.post('/api/favorite', values)
      .then(() => {
        setIsOpen(false);
        setModalForm({
          ...modalForm,
          donationAmount: ""
        })
      }).catch(error => {
        console.log("error.response: ", error.response)
      })
  }
  
  var handleUpdateFavoriteDonation = (event) => {
    event.preventDefault()
    const values = {
      NonprofitId: JobModalId,
      UserId: userid,
      donationAmt: modalForm.donationAmount
    }
    Axios.post('/api/update-favorite', values)
      .then(() => {
        setIsOpen(false);
        setModalForm({
          ...modalForm,
          donationAmount: ""
        })
      }).catch(error => {
        console.log("error.response: ", error.response)
      })
  }

  var donationChange = (event) => {
    const { value } = event.target
    // console.log(value)
    setModalForm({
      ...modalForm,
      donationAmount: value
    })
  }


  var DeleteFavorite = (item) => {

    var favoriteId = item.fav_id; //item.id;
    Axios.get('/api/delete-favorite/favoriteId/' + favoriteId)
      .then(() => {

      }).catch(error => {
        console.log("error.response: ", error.response)
      })
  }

  return (
    <div>
      <li className="list-group-item m-2">
      {/* <button
                className="btn btn-success"
                onClick={event => openModal(props.item, id)} >Save
              </button> */}
         <div className="float-right">
        {(props.showAction)?
            <React.Fragment>
              <button
              className="btn btn-primary"
              onClick={event => openModal(props.item, id)}>Edit
            </button>

            <button
            id="delete"
            className="btn btn-danger ml-2 mr-2"
            onClick={event => DeleteFavorite(props.item, id)}>Delete
          </button>
            </React.Fragment>
        :  
        <button
          className="btn btn-success"
          onClick={event => handleFavoriteSubmit(props.item, id)} >Save
        </button>
      }
      </div>

        <h4 className="font-weight-bold">{orgName}</h4>

        <h5>Org Focus: {orgFocus}</h5>

        <h5>{city}, {state.toUpperCase()} {zip}</h5>

        {url ? <a href={url} className="btn btn-success" rel="noopener noreferrer" target="_blank">Link to Organization</a> : null}

      </li>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="This is Modal">

        <a href='#' className="closeButton" onClick={closeModal}>X</a>
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Donation Amount </h2>

        <form onSubmit={handleUpdateFavoriteDonation}>
          <input name="NonprofitId" type="hidden" value={`JobModalId`} />
          <input
            name="donationAmt"
            type="number"
            placeholder="Enter Donation Amount."
            value={modalForm.donationAmount}
            onChange={donationChange}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>

    </div>

  )
}

