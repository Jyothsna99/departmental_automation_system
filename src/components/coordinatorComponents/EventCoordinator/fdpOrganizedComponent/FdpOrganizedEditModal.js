import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function StudentCertificationEditModal(props) {
    const [name,setName]=useState('');
    const [org,setOrg]=useState('');
    const [venue,setVenue]=useState('');
    const [resourcePerson,setResourcePerson]=useState('');
    const [date,setDate]=useState('');
    const [nop,setNop]=useState('');
    const [stuFac,setStuFac]=useState('');
    
    const EditAward =async (id)=>{
     const res=await fetch("/api/fdpOrganized/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              name:(name?name:props.editItem.name), org:(org?org:props.editItem.org),venue:(venue?venue:props.editItem.venue),resourcePerson:(resourcePerson?resourcePerson:props.editItem.resourcePerson), date:(date?date:props.editItem.date),nop:(nop?nop:props.editItem.nop),stuFac:(stuFac?stuFac:props.editItem.stuFac)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("FDP Organized edited successfully");
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
               FDP/Workshop Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>FDP/Workshop Name:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.name} onChange={ e => {setName(e.target.value)}}/>
              <label className='col-sm-4'>Organized By:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.org} onChange={ e => setOrg(e.target.value)}/>
              <label className='col-sm-4'>Venue:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.venue} onChange={ e => setVenue(e.target.value)}/>
              <label className='col-sm-4' >Resource Person:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.resourcePerson} onChange={ e => setResourcePerson(e.target.value)}/>
              <div>
              <label className='col-sm-4' >Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4' >No. of Participants:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.nop} onChange={ e => setNop(e.target.value)}/>
              </div>
              <div>
              <label className='col-sm-4' >Student/Faculty:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.stuFac} onChange={ e => setStuFac(e.target.value)}>
                <option>Select</option>
                <option>Student</option>
                <option>Faculty</option>
              </select>
              </div>
             </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default StudentCertificationEditModal;