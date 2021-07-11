import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import StudentCertificationsAdditionModal from './StudentCertificationsAdditionModal';
import StudentCertificationsEditModal from './StudentCetificationsEditModal';
function StudentCertificationsHome(props){
    
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');
    let [waList,setWaList]=useState(null);

    const removeFaculty=(id)=>{
        let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
        fetch("/api/studentCertifications/"+id,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchCertificationsList();

    }

    const fetchCertificationsList=()=>{
        fetch("/api/studentCertifications").then((res)=>res.json())
        .then((data)=>{
           console.log(data);
           setWaList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }
    useEffect(() => {
        fetchCertificationsList();   
    },[])
   
   
        return(
            props.display?
            <div className="container-fluid">
                <div className="p-5"></div>
                <div className="row">
                    <div className="col-sm-10">Add Data by uploading the file with .xlsx format.<b>Headers in the file should be <i>"S.No."</i><span>,</span><i>"Course Name"</i><span>,</span><i>"Name"</i><span>,</span><i>"Name"</i><span>,</span><i>"Roll No"</i><span>,</span><i>"Final Score"</i><span>,</span><i>"Certification Type"</i><span>,</span><i>"Topper"</i>.Otherwise the data in the file will not be added</b></div>
                    <Button variant="primary" onClick={() => setModalShow(true)}>Add Data</Button>
                </div>
               
                <h5  className="pt-5 pb-3">Certifications</h5> 
                    
                <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>course Name</th>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Final Score</th>
                                <th>Certification Type</th>
                                <th>Topper</th>
                                <th>Cycle</th>
                                <th>Year</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(waList!=null)?
                            waList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.name}</td>
                                    <td>{item.rollNo}</td>
                                    <td>{item.score}</td>
                                    <td>{item.type}</td>
                                    <td>{item.topper}</td>
                                    <td>{item.cycle}</td>
                                    <td>{item.year}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeFaculty(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    </tbody>
                </Table>
                    <StudentCertificationsAdditionModal
                        show={modalShow}
                        onHide={()=>fetchCertificationsList()}
                    />
                    <StudentCertificationsEditModal
        show={editModalShow}
        onHide={()=>fetchCertificationsList()}
        editItem = {editItem}
      />  
            </div>:''
        )
}
export default StudentCertificationsHome;