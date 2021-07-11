import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function StudentCertificationEditModal(props) {
  const [semester,setSemester]=useState('');
  const [aSec,setASec]=useState('');
  const [bSec,setBSec]=useState('');
  const [cSec,setCSec]=useState('');
  const [overall,setOverall]=useState('');
  const [start,setStart]=useState('');
  const [end,setEnd]=useState('');
    
    const EditAward =async (id)=>{
     const res=await fetch("/api/semesterResult/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              semester:(semester?semester:props.editItem.semester), aSec:(aSec?aSec:props.editItem.aSec),bSec:(bSec?bSec:props.editItem.bSec),cSec:(cSec?cSec:props.editItem.cSec), overall:(overall?overall:props.editItem.overall),'year':((start?start:props.editItem.year.split("-")[0])+"-"+(end?end:props.editItem.year.split("-")[1]))
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Semester Result edited successfully");
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
               Semester Results
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Semester:</label>
              <select className="col-sm-6" type='textbox' defaultValue={props.editItem.semester} onChange={ e => {setSemester(e.target.value)}}>
                <option value="">Select Semester</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
              </select>
              <label className='col-sm-4'>A Section:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.aSec} onChange={ e => setASec(e.target.value)}/>
              <label className='col-sm-4'>B Section:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.bSec} onChange={ e => setBSec(e.target.value)}/>
              <label className='col-sm-4' >C Section:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.cSec} onChange={ e => setCSec(e.target.value)}/>
              <label className='col-sm-4' >Overall:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.overall} onChange={ e => setOverall(e.target.value)}/>
              <label className='col-sm-4' >Start year:</label>
              <input className='col-sm-6' placeholder="YYYY Example:2017" type='textbox' defaultValue={props.editItem.year!==undefined?props.editItem.year.split('-')[0]:props.editItem.year} onChange={ e => setStart(e.target.value)}/>
              <label className='col-sm-4' >End year:</label>
              <input className='col-sm-6' placeholder="YYYY Example:2018" type='textbox' defaultValue={props.editItem.year!==undefined?props.editItem.year.split('-')[1]:props.editItem.year} onChange={ e => setEnd(e.target.value)}/>
             </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default StudentCertificationEditModal;