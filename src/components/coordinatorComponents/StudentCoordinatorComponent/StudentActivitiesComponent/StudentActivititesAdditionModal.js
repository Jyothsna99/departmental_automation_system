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

    const PostConference =async ()=>{ 
      const res=await fetch("/api/studentActivities",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
           eventName,studentName,prize,nameOfProgram,organizedBy,from,to
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Data added successfully");
        setEventName('');
        setStudentName('');
        setPrize('');
        setNameOfProgram('');
        setOrganizedBy('');
        setFrom('');
        setTo('');
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
              <input className="col-sm-6" type='textbox' value={eventName} onChange={ e => {setEventName(e.target.value)}}/>
              <label className='col-sm-4'>Name of the Student:</label>
              <input className='col-sm-6' type='textbox' value={studentName} onChange={ e => setStudentName(e.target.value)}/>
              <label className='col-sm-4' >Prize:</label>
              <input className='col-sm-6' type='textbox' value={prize} onChange={ e => setPrize(e.target.value)}/>
              <label className='col-sm-4'>Name of the Symposium / Tech fest/ Training Programme</label>
              <input className='col-sm-6' type='textbox' value={nameOfProgram} onChange={ e => setNameOfProgram(e.target.value)}/>
              <label className='col-sm-4'>Organized by:</label>
              <input className='col-sm-6' type='textbox' value={organizedBy} onChange={ e => setOrganizedBy(e.target.value)}/>
              <label className='col-sm-4'>Start Date:</label>
              <input className='col-sm-6' type='date' value={from} onChange={ e => setFrom(e.target.value)}/>
              <label className='col-sm-4'>End Date:</label>
              <input className='col-sm-6' type='date' value={to} onChange={ e => setTo(e.target.value)}/>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostConference();}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default StudentActivitiesAdditionModal;