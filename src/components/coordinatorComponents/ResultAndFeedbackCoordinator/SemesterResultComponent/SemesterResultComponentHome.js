import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ResultAdditionModal from './SemesterResultAdditionModal';
import ResultEditModal from './SemesterResultEditModal';
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
            fetch("/api/semesterResult/"+fid,{
                method: 'DELETE',  
            }).then((res)=>res.json())
            .then((data)=>console.log(data))
            alert("Removed Successfully");
            fetchFdpList();
        }

        const fetchFdpList=()=>{
            fetch("/api/SemesterResult").then((res)=>res.json()) 
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
                <h5  className="pt-5 pb-5">Semester Results</h5>
                <Table responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Semester</th>
                            <th>A Section</th>
                            <th>B Section</th>
                            <th>C Section</th>
                            <th>Overall</th>
                            <th>Academic year</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(fdpList!=null)?
                                fdpList.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.semester}</td>
                                        <td>{item.aSec}</td>
                                        <td>{item.bSec}</td>
                                        <td>{item.cSec}</td>
                                        <td>{item.overall}</td>
                                        <td>{item.year}</td>
                                        <td><Button variant="primary" onClick={()=> { setEditItem(item);setEditModalShow(true);}}>Edit</Button>{' '}</td>
                                        <td><Button variant="danger" onClick={()=>removeFdp(`${item._id}`)}>Remove</Button>{' '}</td>
                                    </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <Button style={{float:'right'}} variant="primary" onClick={() => setModalShow(true)}>Add FDP</Button>
                <ResultAdditionModal
        show={modalShow}
        onHide={()=>fetchFdpList()}
      />
      <ResultEditModal
        show={editModalShow}
        onHide={()=>fetchFdpList()}
        editItem = {editItem}
      />  
            </div>:''
        )
}
export default FdpComponent;