import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {Required} from '../../../../Style';
import XLXS from 'xlsx';

function FacultyAdditionModal(props) {
    const [monthFrom,setMonthFrom]=useState('');
    const [monthTo,setMonthTo]=useState('');
    const [year,setYear]=useState('');

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
            if(monthFrom===''||monthTo===''||year===''){
                alert("Please fill all the required fields");
            }else if(window.dataParse===undefined){
                alert('Please upload file');
            }
            else if(window.dataParse[0][0]!=="S.No." || window.dataParse[0][1]!=="Course Name" || window.dataParse[0][2]!=="Name"|| window.dataParse[0][3]!=="Roll No" ||window.dataParse[0][4]!=="Final Score" || window.dataParse[0][5]!=="Certificate Type" ||window.dataParse[0][6]!=="Topper" ){
                alert("Data in the excel sheet is not valid. Please check headers in the file matches with specified headers or not.")
            }else{
                for(var i=1;i<window.dataParse.length;i++){
                    console.log(year);
                    //console.log(window.dataParse[i][0],window.dataParse[i][1],window.dataParse[i][2],window.dataParse[i][3],window.dataParse[i][4],window.dataParse[i][5],window.dataParse[i][6]);
                    const res=fetch("/api/studentCertifications",{
                        method:"POST",
                        headers:{
                          "Content-type":"application/json"
                        },
                        body:JSON.stringify({
                          "sNo":window.dataParse[i][0],"courseName":window.dataParse[i][1],"name":window.dataParse[i][2],"rollNo":window.dataParse[i][3],"score":window.dataParse[i][4],"type":window.dataParse[i][5],"topper":window.dataParse[i][6],"cycle":monthFrom+"-"+monthTo,"year":year
                        })
                    });
                }
                window.alert("Data Added Successfully");
                setMonthFrom('');
                setMonthTo('');
                setYear('');
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
          Certifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
          <label className="col-sm-4">Cycle From:<Required>*</Required></label>
          <select className='col-sm-6' type='textbox' value={monthFrom} onChange={ e => setMonthFrom(e.target.value)}>
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
              <label className='col-sm-4' >Cycle To:<Required>*</Required></label>
              <select className='col-sm-6' type='textbox' value={monthTo} onChange={ e => setMonthTo(e.target.value)}>
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
              <label className="col-sm-4">Year:<Required>*</Required></label>
              <input className="col-sm-6" type="textbox" placeholder="YYYY" value={year} onChange={e=>setYear(e.target.value)}/>
              <label className='col-sm-8' >Upload file<b>[only upload files with xlsx format. Headers in the file should be <i>"S.No."</i><span>,</span><i>"Course Name"</i><span>,</span><i>"Name"</i><span>,</span><i>"Name"</i><span>,</span><i>"Roll No"</i><span>,</span><i>"Final Score"</i><span>,</span><i>"Certification Type"</i><span>,</span><i>"Topper"</i>.Otherwise the data in the file will not be added</b></label>
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