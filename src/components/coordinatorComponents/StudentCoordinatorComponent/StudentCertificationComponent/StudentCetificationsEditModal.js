import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function StudentCertificationEditModal(props) {

    const [courseName,setCourseName]=useState('');
    const [name,setName]=useState('');
    const [rollNo,setRollNo]=useState('');
    const [score,setScore]=useState('');
    const [type,setType]=useState('');
    const [topper,setTopper]=useState('');
    const [monthFrom,setMonthFrom]=useState('');
    const [monthTo,setMonthTo]=useState('');
    const [year,setYear]=useState('');
    
    const EditAward =async (id)=>{
     const res=await fetch("/api/studentCertifications/"+id,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              courseName:(courseName?courseName:props.editItem.courseName), name:(name?name:props.editItem.name),rollNo:(rollNo?rollNo:props.editItem.rollNo), score:(score?score:props.editItem.score),type:(type?name:props.editItem.type),topper:(topper?topper:props.editItem.topper),'cycle':((monthFrom?monthFrom:props.editItem.cycle.split("-")[0])+"-"+(monthTo?monthTo:props.editItem.cycle.split("-")[1])),year:(year?year:props.editItem.year)
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
               Workshops/Seminars/Trainings Attended
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Course Name:</label>
              <input className="col-sm-6" type='textbox' defaultValue={props.editItem.courseName} onChange={ e => {setCourseName(e.target.value)}}/>
              <label className='col-sm-4'>Name:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.name} onChange={ e => setName(e.target.value)}/>
              <label className='col-sm-4'>Roll No:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.rollNo} onChange={ e => setRollNo(e.target.value)}/>
              <label className='col-sm-4'>Final Score:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.score} onChange={e=>setScore(e.target.value)}/>   
              <label className='col-sm-4'>Certificate Type:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.type} onChange={ e => setType(e.target.value)}/>
              <label className='col-sm-4'>Topper:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.topper} onChange={ e => setTopper(e.target.value)}/>
              <label className='col-sm-4' >Cycle From:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.cycle!==undefined?props.editItem.cycle.split('-')[0]:props.editItem.cycle} onChange={ e => setMonthFrom(e.target.value)}>
                <option value="">Select Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <label className='col-sm-4' >Cycle To:</label>
              <select className='col-sm-6' type='textbox' defaultValue={props.editItem.cycle!==undefined?props.editItem.cycle.split('-')[1]:props.editItem.cycle} onChange={ e => setMonthTo(e.target.value)}>
                <option value="">Select Month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <label className='col-sm-4'>Year:</label>
              <input className='col-sm-6' type='textbox' defaultValue={props.editItem.year} onChange={ e => setYear(e.target.value)}/>
            </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditAward(props.editItem._id) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default StudentCertificationEditModal;