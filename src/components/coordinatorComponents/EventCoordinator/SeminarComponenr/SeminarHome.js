import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import SeminarAdditionModal from './SeminarAdditionModal';
import SeminarEditModal from './SeminarEditModal';

function SeminarComponent(props){
    const [modalShow, setModalShow] = useState(false);
    let [seminarList,setSeminarList]=useState(null);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editItem,setEditItem] = useState('');

    const removeSeminar=(id)=>{
        let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
        fetch("/api/seminar/"+id,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully in seminar table");
        fetchSeminarList();

    }

    const fetchSeminarList=()=>{
        fetch("/api/seminar").then((res)=>res.json())
        .then((data)=>{
           setSeminarList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }
    useEffect(() => {
         fetchSeminarList();   
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Seminars/Guest Lectures Organized</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Topic</th>
                            <th>Resource Person</th>
                            <th>Venue</th>
                            <th>Date</th>
                            <th>Number of participants</th>
                            <th>Faculty/Student</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(seminarList!=null)?
                            seminarList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.resourcePerson}</td>
                                    <td>{item.venue}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.participants}</td>
                                    <td>{item.who}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeSeminar(`${item._id}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }
                    <tr>   
                        <td colSpan='8'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Seminar</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <SeminarAdditionModal
        show={modalShow}
        onHide={()=>fetchSeminarList()}
      />

<SeminarEditModal
        show={editModalShow}
        onHide={()=>fetchSeminarList()}
        editItem = {editItem}
      />  
                
            </div>:''
        )
}
export default SeminarComponent;