import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import StudentActiviitesAdditionModal from './StudentActivititesAdditionModal';
import StudentActivitiesEditModal from './StudentActivitiesEditModal';
function StudentActivitiesHome(props){
    
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');
    let [studentActivitiesList,setStudentActivitiesList]=useState(null);

    const removeActivity=(id)=>{
        let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
        fetch("/api/studentActivities/"+id,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchStudentsActivitiesList();

    }

    const fetchStudentsActivitiesList=()=>{
        fetch("/api/studentActivities").then((res)=>res.json())
        .then((data)=>{
            setStudentActivitiesList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }
    useEffect(() => {
        fetchStudentsActivitiesList();   
    },[])
   
   
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Co-Curricular/Extra-Curricular / Social Service Activities participated</h5> 
                    
                <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Name of the Event</th>
                                <th>Name of the Student</th>
                                <th>Prize</th>
                                <th>Name of the Symposium / Tech fest/ Training Programme</th>
                                <th>Organized by</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(studentActivitiesList!=null)?
                            studentActivitiesList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.eventName}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.prize}</td>
                                    <td>{item.nameOfProgram}</td>
                                    <td>{item.organizedBy}</td>
                                    <td>{new Date(item.from).toDateString()}</td>
                                    <td>{new Date(item.to).toDateString()}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeActivity(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    </tbody>
                </Table>
                <Button style={{float:'right'}} variant="primary" onClick={() => setModalShow(true)}>Add Data</Button>
                    <StudentActiviitesAdditionModal
                        show={modalShow}
                        onHide={()=>fetchStudentsActivitiesList()}
                    />
                    <StudentActivitiesEditModal
        show={editModalShow}
        onHide={()=>fetchStudentsActivitiesList()}
        editItem = {editItem}
      />  
            </div>:''
        )
}
export default StudentActivitiesHome;