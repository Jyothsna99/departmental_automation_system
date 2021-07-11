import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {Required} from '../../../../Style';
import XLXS from 'xlsx';

function InternshipAdditionModal(props) {
    const [start,setStart]=useState('');
    const [end,setEnd]=useState('');

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
            if(start===''||end===''){
              alert("Please fill all the required fields");
            }else if(window.dataParse===undefined){
              alert('Please upload file');
            }
            else if(window.dataParse[0][0]!=="SNO" || window.dataParse[0][1]!=="ROLLNO" || window.dataParse[0][2]!=="NAME"||window.dataParse[0][3]!=="CLASS&SECTION"||window.dataParse[0][4]!=="COMPANY NAME"||window.dataParse[0][5]!=="Dates"){
                alert("Data in the excel sheet is not valid. Please check headers in the file matches with specified headers or not.")
            }else{
                for(var i=1;i<window.dataParse.length;i++){
                    const res=fetch("/api/internships",{
                        method:"POST",
                        headers:{
                          "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                          "sNo":window.dataParse[i][0],"rollNo":window.dataParse[i][1],"name":window.dataParse[i][2],"class":window.dataParse[i][3],"company":window.dataParse[i][4],"dates":window.dataParse[i][5],"batch":start+"-"+end
                        })
                    });
                }
                window.alert("Data Added Successfully");
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
          Internships
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
              <label className='col-sm-4'>Start year:<Required>*</Required></label>
              <input className='col-sm-6' type='textbox' placeholder="YYYY Example:2017" value={start} onChange={ e => setStart(e.target.value)}/>
              <label className='col-sm-4'>End year:<Required>*</Required></label>
              <input className='col-sm-6' type='textbox' placeholder="YYYY Example:2021" value={end} onChange={ e => setEnd(e.target.value)}/>
              <label className='col-sm-8' >Upload file<b>[only upload files with xlsx format.Headers in the file should be <i>"SNO"</i><span>,</span><i>"ROLLNO"</i><span>,</span><i>"NAME"</i><span>,</span><i>"CLASS&SECTION"</i><span>,</span><i>"COMPANY NAME"</i><span>,</span><i>"Dates"</i>.Otherwise the data in the file will not be added</b></label>
              <input className='col-sm-4' type='file' onChange={ e => setFile(e)}/>

          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={PostData}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default InternshipAdditionModal;