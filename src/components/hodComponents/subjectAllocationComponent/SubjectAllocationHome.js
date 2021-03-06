import React,{useState,useEffect} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import SubjectAdditionModal from './SubjectAdditionModal';

function SubjectAllocationComponent(props){
    window.list='';
    const [modalShow, setModalShow] = React.useState(false);
    let [subjectAllocationList,setSubjectAllocationList]=useState(null);
  
 const fetchSubjectAllocationList=()=>{
    fetch("/api/subjectAllocation").then((res)=>res.json())
    .then((data)=>{
       setSubjectAllocationList(data);
       console.log("Subject Allocation list"+subjectAllocationList);
    }) 
    setModalShow(false);
 }

 const removeAllocation=(courseCode)=>{
    let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
    fetch("/api/subjectAllocation/"+courseCode,{
        method: 'DELETE',  
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    alert("Removed Successfully");
    fetchSubjectAllocationList();
}


  useEffect(() => {
       fetchSubjectAllocationList();   
  },[])

        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Subject Allocation</h5> 

                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course code</th>
                            <th>Course Name</th>
                            <th>Faculty ID</th>
                            <th>Faculty name</th>
                            <th>Section</th>
                            <th>Remove Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(subjectAllocationList!=null)?
                            subjectAllocationList.map((item,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item.courseCode}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.facultyID}</td>
                                    <td>{item.facultyName}</td>
                                    <td>{item.section}</td>
                                    <td><Button variant="danger" onClick={()=>removeAllocation(`${item.courseCode}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):""
                        }
                   <tr>   
                        <td colSpan='6'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Allocate Subject</Button></td>
                    </tr>
                    </tbody>
                </Table>

                <SubjectAdditionModal
                    show={modalShow}
                    onHide={() => {
                        fetchSubjectAllocationList();
                    }} 
                />   
            </div>:''
        )
}
export default SubjectAllocationComponent;