import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useParams} from 'react-router-dom';
import {Required} from '../../../Style';

function LessonPlanAdditionModal(props) {
    const [fid,setFid]=useState('');
    const [courseName,setCourseName]=useState('');
    const params = useParams();
    const [lessonFile,setLessonFile]=useState("");
    const PostCertification =async ()=>{
      if(lessonFile===''){
        alert('please upload file');
        return;
      }if(lessonFile.name.slice(-3,)!=='xls'){
        alert('please upload file with .xls format');
        return;
      }else if(lessonFile.size>1000000){
        alert('file size should be less than 1MB');
        return;
      }
      let formData = new FormData();
      formData.append('fid', fid);
      formData.append('courseName', courseName);
      formData.append('lessonFile', lessonFile);
      const res=await fetch("/api/lessonPlan",{
        method:"POST",
        body:formData       
      });
      const data=await res.json();
      if(res.status===400 || res.status===500){
        console.log("error");
        window.alert(data.error);

      }else{
        window.alert("Lesson Plan Added successfully");
        setCourseName('');
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
            Lesson Plan Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Course Name:<Required>*</Required></label>
              <input className="col-sm-6" type='textbox' value={courseName} onChange={ e => {setCourseName(e.target.value); setFid(params.id)}}/>
              <label className='col-sm-4' >Upload Lesson Plan:<b>[only upload files with xls format and file size should be less than 1MB]</b></label>
              <input className='col-sm-6' type='file' name='lessonFile' onChange={ e => setLessonFile(e.target.files[0])}/>

             </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostCertification()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default LessonPlanAdditionModal;