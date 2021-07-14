import React,{ useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function SubjectEditModal(props) {

    const [courseCode,setCourseCode]=useState(props.editItem.courseCode);
    const [courseName,setCourseName]=useState(props.editItem.courseName);
    const [semester,setSemester]=useState(props.editItem.semester);
    const [subjectType,setSubjectType]=useState(props.editItem.subjectType);
    const [regulation,setRegulation]=useState(props.editItem.regulation);

    const EditSubject =async (courseCode)=>{
        console.log("AFTER EDIT ");
        console.log(props.editItem);
        console.log(courseCode);
        console.log(courseName);
        console.log(semester);


        const res=await fetch("/api/subject/"+courseCode,{
            method:"PUT",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              courseName:(courseName?courseName:props.editItem.courseName),semester:(semester?semester:props.editItem.semester),subjectType:(subjectType?subjectType:props.editItem.subjectType),regulation:(regulation?regulation:props.editItem.regulation)
            })
          });
          const data=await res.json();
          if(res.status===400){
            window.alert(data.error);
    
          }else{
            window.alert("Subject updated successfully");
            setCourseName('');
            setSemester('');

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
                 Subject Details
               </Modal.Title>
             </Modal.Header>
          <Modal.Body>
          <form method="POST"> 
          <label className='col-sm-4'>Course Code:</label>
          <input className='col-sm-6' type='textbox' value={props.editItem.courseCode} />    
          <label className='col-sm-4'>Course Name:</label>
          <input className='col-sm-6' type='textbox' defaultValue={props.editItem.courseName} onChange={ e => setCourseName(e.target.value)}/>
          <label className='col-sm-4'>Semester:</label>
          <input className='col-sm-6' type='textbox' defaultValue={props.editItem.semester} onChange={ e => setSemester(e.target.value)}/>
          <label className='col-sm-4'>Subject Type:</label>
          <select className="col-sm-6" defaultValue={props.editItem.subjectType} onChange={ e => setSubjectType(e.target.value)}>
                  <option>Select Subject Type</option>
                  <option>regular</option>
                  <option>laboratory</option>
                  <option>professional elective</option>
                  <option>open elective</option>
              </select>
          <label className='col-sm-4'>Regulation:</label>
          <input className='col-sm-6' type='textbox' defaultValue={props.editItem.regulation} onChange={ e => setRegulation(e.target.value)}/>
      </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => { EditSubject(props.editItem.courseCode) }}>Submit</Button>
    </Modal.Footer>
  </Modal>
    );
  }
  export default SubjectEditModal;