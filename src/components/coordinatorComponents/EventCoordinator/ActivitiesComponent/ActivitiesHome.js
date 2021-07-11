import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ActivitiyAdditionModal from './ActivitiesAddtionModal';
import ActivityEditModal from './ActivitiesEditModal';
function ActivityComponent(props){
        const [modalShow, setModalShow] = useState(false);
        let [fdpList,setFdpList]=useState(null);
        const [editModalShow, setEditModalShow] = useState(false);
        const [editItem,setEditItem] = useState('');
        
        const removeFdp=(fid)=>{
            let res=window.confirm("Row will be deleted");
        if(res===false){
            return;
        }
            fetch("/api/activities/"+fid,{
                method: 'DELETE',  
            }).then((res)=>res.json())
            .then((data)=>console.log(data))
            alert("Removed Successfully");
            fetchFdpList();
        }

        const fetchFdpList=()=>{
            fetch("/api/activities").then((res)=>res.json()) 
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
                <h5  className="pt-5 pb-5">Technical Symposiums/Students Chapter/Club Activities conducted</h5>
                <Table responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Winner</th>
                            <th>Runner</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(fdpList!=null)?
                                fdpList.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.date}</td>
                                        <td>{item.winner}</td>
                                        <td>{item.runner}</td>
                                        <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                        <td><Button variant="danger" onClick={()=>removeFdp(`${item._id}`)}>Remove</Button>{' '}</td>
                                    </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <Button style={{float:'right'}} variant="primary" onClick={() => setModalShow(true)}>Add Data</Button>
                <ActivitiyAdditionModal
        show={modalShow}
        onHide={()=>fetchFdpList()}
      />
      <ActivityEditModal
        show={editModalShow}
        onHide={()=>fetchFdpList()}
        editItem = {editItem}
      />  
            </div>:''
        )
}
export default ActivityComponent;