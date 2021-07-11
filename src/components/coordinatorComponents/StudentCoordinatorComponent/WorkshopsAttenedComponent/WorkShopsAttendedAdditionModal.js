import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {Required} from '../../../../Style';
import XLXS from 'xlsx';

function FacultyAdditionModal(props) {
    const [type,setType]=useState('');
    const [name,setName]=useState('');
    const [from,setFrom]=useState('');
    const [to,setTo]=useState('');

    const setFile=(e)=>{
        console.log(e);
        var files=e.target.files;
        var f=files[0];
        var reader=new FileReader();
        console.log(f);
        reader.onload=function(e){
            var data=e.target.result;
            const readedData=XLXS.read(data,{type:'binary'});
            const wsname=readedData.SheetNames[0];
            const ws=readedData.Sheets[wsname];
            window.dataParse=XLXS.utils.sheet_to_json(ws,{header:1});
        }
        reader.readAsBinaryString(f);
    }

    const PostData =async (e)=>{
            if(type===''||name===''||from===''||to===''){
              alert("Please fill all the required fields");
            }else if(window.dataParse===undefined){
              alert('Please upload file');
            }
            else if(window.dataParse[0][0]!=="S.No." || window.dataParse[0][1]!=="Reg. No." || window.dataParse[0][2]!=="Name of the Student"){
                alert("Data in the excel sheet is not valid. Please check headers in the file matches with specified headers or not.")
            }else{
                for(var i=1;i<window.dataParse.length;i++){
                    const res=fetch("/api/workshopAttended",{
                        method:"POST",
                        headers:{
                          "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                          "sNo":window.dataParse[i][0],"regNo":window.dataParse[i][1],"stuName":window.dataParse[i][2],"type":type,"name":name,"from":from,"to":to
                        })
                    });
                }
                window.alert("Data Added Successfully");
                setName('');
                setType('');
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
          Workshops/Seminars/Trainings Attended
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Type of the Program:<Required>*</Required></label>
              <select className='col-sm-6' type='textbox' value={type} onChange={ e => setType(e.target.value)}>
                <option>Select Type</option>
                <option>Workshop</option>
                <option>Training</option>
                <option>Seminar</option>
              </select>    
              <label className='col-sm-4'>Name of the Program:<Required>*</Required></label>
              <input className='col-sm-6' type='textbox' value={name} onChange={ e => setName(e.target.value)}/>
              <label className='col-sm-4'>From:<Required>*</Required></label>
              <input className='col-sm-6' type='date' value={from} onChange={ e => setFrom(e.target.value)}/>
              <label className='col-sm-4' >To:<Required>*</Required></label>
              <input className='col-sm-6' type='date' value={to} onChange={ e => setTo(e.target.value)}/><br/>
              <label className='col-sm-8' >Upload file<b>[only upload files with xlsx format.Headers in the file should be <i>"S.No."</i><span>,</span><i>"Reg. No."</i><span>,</span><i>"Name of the Student"</i>.Otherwise the data in the file will not be added]</b></label>
              <input className='col-sm-4' type='file' onChange={ e => setFile(e)}/>

          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={PostData}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default FacultyAdditionModal;