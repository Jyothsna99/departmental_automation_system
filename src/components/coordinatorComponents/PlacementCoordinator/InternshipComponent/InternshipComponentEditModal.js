import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function StudentCertificationEditModal(props) {
    const [rollNo,setRollNo]=useState('');
    const [name,setName]=useState('');
    const [classS,setClass]=useState('');
    const [company,setCompany]=useState('');
    const [dates,setDates]=useState('');
    const [start,setStart]=useState('');
    const [end,setEnd]=useState('');
    
    const EditAward =async (id)=>{
     const res=await fetch("/api/internships/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              rollNo:(rollNo?rollNo:props.editItem.rollNo), name:(name?name:props.editItem.name),'class':(classS?classS:props.editItem.class),company:(company?company:props.editItem.company), dates:(dates?dates:props.editItem.dates),'batch':((start?start:props.editItem.batch.split("-")[0])+"-"+(end?end:props.editItem.batch.split("-")[1]))
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Internship Data edited successfully");
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
               Internship Data
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Roll No:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.rollNo} onChange={ e => {setRollNo(e.target.value)}}/>
              <label className='col-sm-4'>Name:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.name} onChange={ e => setName(e.target.value)}/>
              <label className='col-sm-4'>Class&Section:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.class} onChange={ e => setClass(e.target.value)}/>
              <label className='col-sm-4'>Company Name:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.company} onChange={ e => setCompany(e.target.value)}/>
              <label className='col-sm-4'>Dates:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.dates} onChange={e=>setDates(e.target.value)}/>   
              <label className='col-sm-4'>Start Year:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.batch!==undefined?props.editItem.batch.split('-')[0]:props.editItem.batch} onChange={ e => setStart(e.target.value)}/>
              <label className='col-sm-4'>End Year:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.batch!==undefined?props.editItem.batch.split('-')[1]:props.editItem.batch} onChange={ e => setEnd(e.target.value)}/>
            </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default StudentCertificationEditModal;