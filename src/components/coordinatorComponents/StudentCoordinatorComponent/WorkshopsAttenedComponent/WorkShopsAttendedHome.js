import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import WorkShopsAttendedAdditionModal from './WorkShopsAttendedAdditionModal';
import WorkshopAttendedEditModal from './WorkshopAttendedEditModal';
function StudentCoordinatorHome(props){
    
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');
    let [waList,setWaList]=useState(null);

    const removeFaculty=(id)=>{
        let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
        fetch("/api/workshopAttended/"+id,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchWorkshopAttendedList();

    }

    const fetchWorkshopAttendedList=()=>{
        fetch("/api/workshopAttended").then((res)=>res.json())
        .then((data)=>{
           setWaList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }
    useEffect(() => {
         fetchWorkshopAttendedList();   
    },[])
   
   
        return(
            props.display?
            <div className="container-fluid">
                <div className="p-5"></div>
                <div className="row">
                    <div className="col-sm-10">Add Data by uploading the file with .xlsx format.<b>Headers in the file should be <i>"S.No."</i><span>,</span><i>"Reg. No."</i><span>,</span><i>"Name of the Student"</i>.Otherwise the data in the file will not be added</b></div>
                    <Button variant="primary" onClick={() => setModalShow(true)}>Add Data</Button>
                </div>
               
                <h5  className="pt-5 pb-5">Workshops/Seminars/Trainings Attended</h5> 
                    
                <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Reg. No.</th>
                                <th>Name of the Student</th>
                                <th>Type of the program</th>
                                <th>Name of the program</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(waList!=null)?
                            waList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.regNo}</td>
                                    <td>{item.stuName}</td>
                                    <td>{item.type}</td>
                                    <td>{item.name}</td>
                                    <td>{new Date(item.from).toDateString()}</td>
                                    <td>{new Date(item.to).toDateString()}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeFaculty(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    </tbody>
                </Table>
                    <WorkShopsAttendedAdditionModal
                        show={modalShow}
                        onHide={()=>fetchWorkshopAttendedList()}
                    />
                    <WorkshopAttendedEditModal
        show={editModalShow}
        onHide={()=>fetchWorkshopAttendedList()}
        editItem = {editItem}
      />  
            </div>:''
        )
}
export default StudentCoordinatorHome;