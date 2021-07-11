import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function WorkshopAttendedEditModal(props) {

    const [regNo,setRegNo]=useState('');
    const [stuName,setStuName]=useState('');
    const [type,setType]=useState('');
    const [name,setName]=useState('');
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');
 
    const EditAward =async (id)=>{
     const res=await fetch("/api/workshopAttended/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              regNo:(regNo?regNo:props.editItem.regNo), stuName:(stuName?stuName:props.editItem.stuName), type:(type?type:props.editItem.type),name:(name?name:props.editItem.name),from:(from?from:props.editItem.from),to:(to?to:props.editItem.to)
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
               Workshops/Seminars/Trainings Attended
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Reg.No.:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.regNo} onChange={ e => setRegNo(e.target.value)}/>
              <label className='col-sm-4'>Issued By:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.stuName} onChange={ e => setStuName(e.target.value)}/>
              <label className='col-sm-4'>Type of the Program:</label>
              <select className='col-sm-6' defaultValue={props.editItem.type} onChange={ e => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option>Workshop</option>
                <option>Training</option>
                <option>Seminar</option>
              </select>    
              <label className='col-sm-4'>Name of the Program:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.name} onChange={ e => setName(e.target.value)}/>
              <label className='col-sm-4'>From:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.from} onChange={ e => setFrom(e.target.value)}/>
              <label className='col-sm-4' >To:</label>
              <input className='col-sm-6' type='date' defaultValue={props.editItem.to} onChange={ e => setTo(e.target.value)}/><br/>
            </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default WorkshopAttendedEditModal;