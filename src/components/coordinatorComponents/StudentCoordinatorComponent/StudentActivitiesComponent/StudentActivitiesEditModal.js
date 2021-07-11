import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function StudentActivitiesAdditionModal(props) {
    const [eventName,setEventName]=useState('');
    const [studentName,setStudentName]=useState('');
    const [prize,setPrize]=useState('');
    const [nameOfProgram,setNameOfProgram]=useState('');
    const [organizedBy,setOrganizedBy]=useState('');
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');

    const EditActivity =async (id)=>{ 
        console.log(props.editItem);
        const res=await fetch("/api/studentActivities/"+id,{
        method:"PUT",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          eventName:(eventName?eventName:props.editItem.eventName), studentName:(studentName?studentName:props.editItem.studentName), prize:(prize?prize:props.editItem.prize), nameOfProgram:(nameOfProgram?nameOfProgram:props.editItem.nameOfProgram),organizedBy:(organizedBy?organizedBy:props.editItem.organizedBy),from:(from?from:props.editItem.from),to:(to?to:props.editItem.to)
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Data updated successfully");
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
          Co-Curricular/Extra-Curricular / Social Service Activities participated
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Name of Event:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.eventName} onChange={ e => {setEventName(e.target.value)}}/>
              <label className='col-sm-4'>Name of the Student:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.studentName} onChange={ e => setStudentName(e.target.value)}/>
              <label className='col-sm-4' >Prize:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.prize} onChange={ e => setPrize(e.target.value)}/>
              <label className='col-sm-4'>Name of the Symposium / Tech fest/ Training Programme</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.nameOfProgram} onChange={ e => setNameOfProgram(e.target.value)}/>
              <label className='col-sm-4'>Organized by:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.organizedBy} onChange={ e => setOrganizedBy(e.target.value)}/>
              <label className='col-sm-4'>Start Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.from} onChange={ e => setFrom(e.target.value)}/>
              <label className='col-sm-4'>End Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.to} onChange={ e => setTo(e.target.value)}/>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditActivity(props.editItem._id) }}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default StudentActivitiesAdditionModal;