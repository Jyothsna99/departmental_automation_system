import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function StudentCertificationEditModal(props) {
    const [name,setName]=useState('');
    const [date,setDate]=useState('');
    const [winner,setWinner]=useState('');
    const [runner,setRunner]=useState('');
    
    const EditAward =async (id)=>{
     const res=await fetch("/api/activities/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              name:(name?name:props.editItem.name), date:(date?date:props.editItem.date),winner:(winner?winner:props.editItem.winner),runner:(runner?runner:props.editItem.runner)
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
               Technical Symposiums/Students Chapter/Club Activities conducted
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Event Name:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.name} onChange={ e => {setName(e.target.value)}}/>
              <label className='col-sm-4'>Date:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.date} onChange={ e => setDate(e.target.value)}/>
              <label className='col-sm-4'>Winner:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.winner} onChange={ e => setWinner(e.target.value)}/>
              <label className='col-sm-4' >Runner:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.runner} onChange={ e => setRunner(e.target.value)}/>
             </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default StudentCertificationEditModal;