import React,{useEffect,useState} from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import CoordinatorAdditionModal from './CoordinatorAdditionModal';

function CoordinatorDataComponent(props){
    const [modalShow, setModalShow] = useState(false);
    let [coordinatorList,setCoordinatorList]=useState(null);
    const [editItem,setEditItem] = useState('');
    const [editModalShow, setEditModalShow] = useState(false);

    const removeCoordinator=(fid)=>{
        let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
        fetch("/api/faculty/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully");
        fetchCoordinatorList();

        fetch("/api/login/"+fid,{
            method: 'DELETE',  
        }).then((res)=>res.json())
        .then((data)=>console.log(data))
        alert("Removed Successfully in login table");
    }

    const fetchCoordinatorList=()=>{
        fetch("/api/coordinator").then((res)=>res.json())
        .then((data)=>{
           setCoordinatorList(data);     
        }) 
        setModalShow(false);
        setEditModalShow(false);
    }
    useEffect(() => {
         fetchCoordinatorList();   
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Coordinator Data</h5> 
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coordinator ID</th>
                            <th>Coordinator Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Edit Details</th>
                            <th>Remove Coordinator</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(coordinatorList!=null)?
                            coordinatorList.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.cid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.type}</td>
                                    <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                    <td><Button variant="danger" onClick={()=>removeCoordinator(`${item.fid}`)}>Remove</Button>{' '}</td>
                                </tr>
                            )):<tr></tr>
                        }  
                    <tr>   
                        <td colSpan='6'></td>
                        <td><Button variant="primary" onClick={() => setModalShow(true)}>Add Coordinator</Button></td>
                    </tr>
                    </tbody>
                </Table>

                

      <CoordinatorAdditionModal
        show={modalShow}
        onHide={()=>fetchCoordinatorList()}
      />
                
            </div>:''
        )
}
export default CoordinatorDataComponent;