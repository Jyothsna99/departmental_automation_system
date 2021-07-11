import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import InternshipAdditionModal from './InternshipComponentAdditionModal';
import InternshipEditModal from './InternshipComponentEditModal';
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
        fetch("/api/internships/"+id,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchPlacementsList();

    }

    const fetchPlacementsList=()=>{
        fetch("/api/internships").then((res)=>res.json())
        .then((data)=>{
           setWaList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }
    useEffect(() => {
         fetchPlacementsList();   
    },[])
   
   
        return(
            props.display?
            <div className="container-fluid">
                <div className="p-5"></div>
                <div className="row">
                    <div className="col-sm-10">Add Data by uploading the file with .xlsx format.<b>Headers in the file should be <i>"SNO"</i><span>,</span><i>"ROLLNO"</i><span>,</span><i>"NAME"</i><span>,</span><i>"CLASS&SECTION"</i><span>,</span><i>"COMPANY NAME"</i><span>,</span><i>"Dates"</i>.Otherwise the data in the file will not be added</b></div>
                    <Button variant="primary" onClick={() => setModalShow(true)}>Add Data</Button>
                </div>
               
                <h5  className="pt-5 pb-3">Internships</h5> 
                    
                <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Roll No</th>
                                <th>Name of the Student</th>
                                <th>Class And Section</th>
                                <th>Company Name</th>
                                <th>Dates</th>
                                <th>Batch</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(waList!=null)?
                            waList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.rollNo}</td>
                                    <td>{item.name}</td>
                                    <td>{item.class}</td>
                                    <td>{item.company}</td>
                                    <td>{item.dates}</td>
                                    <td>{item.batch}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeFaculty(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    </tbody>
                </Table>
                    <InternshipAdditionModal
                        show={modalShow}
                        onHide={()=>fetchPlacementsList()}
                    />
                    <InternshipEditModal
        show={editModalShow}
        onHide={()=>fetchPlacementsList()}
        editItem = {editItem}
      />  
            </div>:''
        )
}
export default StudentCoordinatorHome;