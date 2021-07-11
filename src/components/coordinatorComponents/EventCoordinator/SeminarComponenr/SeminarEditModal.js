import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function StudentCertificationEditModal(props) {
    const [topic,setTopic]=useState('');
    const [resourcePerson,setResourcePerson]=useState('');
    const [venue,setVenue]=useState('');
    const [date,setDate]=useState('');
    const [participants,setParticipants]=useState('');
    const [who,setWho]=useState('');
    
    const EditAward =async (id)=>{
     const res=await fetch("/api/seminar/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              topic:(topic?topic:props.editItem.topic), resourcePerson:(resourcePerson?resourcePerson:props.editItem.resourcePerson),venue:(venue?venue:props.editItem.venue),date:(date?date:props.editItem.date),participants:(participants?participants:props.editItem.participants),who:(who?who:props.editItem.who)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Data edited successfully");
          }

    }

    return (
            <Modal
            {...props}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             centered
           >
             <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
               Seminars/Guest Lectures Organized
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Topic:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.topic} onChange={ e => setTopic(e.target.value)}/>    
              <label className='col-sm-4'>Resource Person:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.resourcePerson} onChange={ e => setResourcePerson(e.target.value)}/>
              <label className='col-sm-4'>Venue:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.venue} onChange={ e => setVenue(e.target.value)}/>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/><br/>
              <label className='col-sm-4' >Participants:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.participants} onChange={ e => setParticipants(e.target.value)}/><br/>
              <label className='col-sm-4' >Faculty/Student:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.who} onChange={ e => setWho(e.target.value)}>
                <option>Select</option>
                <option>Faculty</option>
                <option>Student</option>
              </select>
          </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default StudentCertificationEditModal;