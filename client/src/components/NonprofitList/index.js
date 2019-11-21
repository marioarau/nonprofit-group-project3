//import  React , { Component } from "react";
import  React  from "react";
import Modal from 'react-modal';
import "./style.css";
import Axios from "axios";

export function NonprofitList({ nonprofits }) {
    return (
        <ul className="list-group">{nonprofits.map(item => {
            return (<NonprofitListItem item={item} key={item.id} />)
        })
        }</ul>
    );
};

export function NonprofitListItem({ item }) 
{
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [JobModalId,JobId] = React.useState("");
    const [modalForm,setModalForm] = React.useState({
      donationAmount: "",
    })

    if (!item) {
        return null;
    }
    var subtitle;

    const { id,
        orgName,
        city,
        state,
        zip,
        orgFocus,
        url,
        clickEvent,
        NonprofitId
    } = item;
    console.log("NonprofitListItem item: ", item);
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

      function openModal(item , id) {
        setIsOpen(true);
        //console.log('address' , item.address);
        JobId(id);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }

      function closeModal(){
        setIsOpen(false);
      }

      var handleFavoriteSubmit = (event) => {
        event.preventDefault()
        console.log(event);
        console.log('Nonprofit Id: ',JobModalId)
        console.log("Donation Amount: " ,modalForm.donationAmount)
        const values = {
          NonprofitId : JobModalId,
          UserId : 2,
          donationAmt : modalForm.donationAmount
        }
        Axios.post('/api/favorite' ,  values)
        .then(() => {
          setIsOpen(false);
          setModalForm({
            ...modalForm,
            donationAmount: ""
          })
        }).catch( error => {
          console.log("error.response: ", error.response)
        })
      }

      var donationChange = (event) => {
        const {value} = event.target
        // console.log(value)
        setModalForm({
          ...modalForm,
          donationAmount: value
        })
      }
    
    
    var DeleteFavorite = (item , id) => {
      console.log("id: ", id);
      console.log("deleteFavorite item.id: ", item.id);
      var favoriteId = 1; //item.id;
      Axios.get('/api/delete-favorite/favoriteId/'+favoriteId)
      .then(() => {

      }).catch( error => {
          console.log("error.response: ", error.response)
      })
    } 
 
    return (
        <div>
            <li className="list-group-item m-2">

                <div className="float-right">
                    {!NonprofitId ? (
                        <button
                            className="btn btn-success"
                            onClick={event => openModal(item, id)} >Save
                        </button>
                    ) : (
                            <button
                                className="btn btn-primary"
                                onClick={event => clickEvent(event, id)}>Edit
                        </button>
                        )
                    }
                    <button id="delete" className="btn btn-danger ml-2 mr-2" onClick={event => DeleteFavorite(item, id)}>Delete</button>
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
            
            <a className="closeButton" onClick={closeModal}>X</a>
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Donation Amount </h2> 
          
            <form onSubmit={handleFavoriteSubmit}>
              <input  name="NonprofitId" type="hidden" value={`JobModalId`}/>
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


