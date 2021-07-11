import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function FdpAdditionModal(props) {
    const [semester,setSemester]=useState('');
    const [aSec,setASec]=useState('');
    const [bSec,setBSec]=useState('');
    const [cSec,setCSec]=useState('');
    const [overall,setOverall]=useState('');
    const [start,setStart]=useState('');
    const [end,setEnd]=useState('');

    const PostFdp =async ()=>{ 
      const res=await fetch("/api/semesterResult",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          semester,aSec,bSec,cSec,overall,'year':start+"-"+end
        })
      });
      const data=await res.json();
      if(res.status===400){
        window.alert(data.error);

      }else{
        window.alert("Semester Result added successfully");
        setSemester('');
        setASec('');
        setBSec('');
        setCSec('');
        setOverall('');
        setStart('');
        setEnd('');
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
              <select className="col-sm-6" type='textbox' value={semester} onChange={ e => {setSemester(e.target.value)}}>
                <option value="">Select Semester</option>
                <option>I</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
              </select>
              <label className='col-sm-4'>A Section:</label>
              <input className='col-sm-6' type='textbox' value={aSec} onChange={ e => setASec(e.target.value)}/>
              <label className='col-sm-4'>B Section:</label>
              <input className='col-sm-6' type='textbox' value={bSec} onChange={ e => setBSec(e.target.value)}/>
              <label className='col-sm-4' >C Section:</label>
              <input className='col-sm-6' type='textbox' value={cSec} onChange={ e => setCSec(e.target.value)}/>
              <label className='col-sm-4' >Overall:</label>
              <input className='col-sm-6' type='textbox' value={overall} onChange={ e => setOverall(e.target.value)}/>
              <label className='col-sm-4' >Start year:</label>
              <input className='col-sm-6' placeholder="YYYY Example:2017" type='textbox' value={start} onChange={ e => setStart(e.target.value)}/>
              <label className='col-sm-4' >End year:</label>
              <input className='col-sm-6' placeholder="YYYY Example:2018" type='textbox' value={end} onChange={ e => setEnd(e.target.value)}/>
             </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={() => {
              PostFdp()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default FdpAdditionModal;
