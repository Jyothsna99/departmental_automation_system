import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FdpAdditionModal from './FdpOrganizedAdditionModal';
import FdpEditModal from './FdpOrganizedEditModal';
function FdpComponent(props){
        const [modalShow, setModalShow] = useState(false);
        let [fdpList,setFdpList]=useState(null);
        const [editModalShow, setEditModalShow] = useState(false);
        const [editItem,setEditItem] = useState('');
        
        const removeFdp=(fid)=>{
            let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
            fetch("/api/fdpOrganized/"+fid,{
                method: 'DELETE',  
            }).then((res)=>res.json())
            .then((data)=>console.log(data))
            alert("Removed Successfully");
            fetchFdpList();
        }

        const fetchFdpList=()=>{
            fetch("/api/fdpOrganized").then((res)=>res.json()) 
            .then((data)=>{
            setFdpList(data);     
            }) 
            setModalShow(false);
            setEditModalShow(false);
        }

        useEffect(() => {
            fetchFdpList();
       },[])

        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Faculty Development Programs/Workshops Organized</h5>
                <Table responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>FDP/Workshop Name</th>
                            <th>Organized By</th>
                            <th>Venue</th>
                            <th>Resource Person</th>
                            <th>Date</th>
                            <th>No.of Participants</th>
                            <th>Student/Faculty</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(fdpList!=null)?
                                fdpList.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.org}</td>
                                        <td>{item.venue}</td>
                                        <td>{item.resourcePerson}</td>
                                        <td>{new Date(item.date).toDateString()}</td>
                                        <td>{item.nop}</td>
                                        <td>{item.stuFac}</td>
                                        <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                        <td><Button variant="danger" onClick={()=>removeFdp(`${item._id}`)}>Remove</Button>{' '}</td>
                                    </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <Button style={{float:'right'}} variant="primary" onClick={() => setModalShow(true)}>Add FDP</Button>
                <FdpAdditionModal
        show={modalShow}
        onHide={()=>fetchFdpList()}
      />
      <FdpEditModal
        show={editModalShow}
        onHide={()=>fetchFdpList()}
        editItem = {editItem}
      />  
            </div>:''
        )
}
export default FdpComponent;