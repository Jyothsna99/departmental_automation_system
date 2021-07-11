import React,{ useState ,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

function CoordinatorAdditionModal(props) {
    const [cid,setCid]=useState('');
    const [type,setType]=useState('');
    let [facultyList,setFacultyList]=useState([]);

    const fetchFaculty=()=>{
        fetch("/api/faculty").then((res)=>res.json())
        .then((data)=>{
             console.log("data",data);
             data.map((item)=>(
                setFacultyList((facultyList) => [...facultyList,{"name":item.name,"fid":item.fid,"email":item.email}])     
             ))
            console.log("facultyList",facultyList)
            
        })
}

    const PostCoordinator =async (e)=>{
            if(cid===''){
                alert('please select coordinator id');
                return;
            }else if(type===''){
                alert('please select coordinator type');
                return;
            }
            const res=await fetch("/api/coordinator",{
              method:"POST",
              headers:{
                "Content-type":"application/json"
              },
              body:JSON.stringify({
                cid,
                "name":facultyList.find(({ fid }) => fid ===cid).name,
                "email":facultyList.find(({ fid }) => fid ===cid).email,
                type
              })
            });
            const data=await res.json();
            if(res.status===400){
              window.alert(data.error);
            }else{
              window.alert("Successfull");
              setCid('');
              setType('');
            }
          }
      

    useEffect(() => {
        setFacultyList([]);
        fetchFaculty();   
   },[])
    
    return (
       <Modal
       {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Coordinator Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST"> 
            <div className="row container-fluid p-3">
                <select required className="col-sm-4" value={cid} onChange={ e => setCid(e.target.value)}>
                        <option>Select Coordinator id</option>
                        {(facultyList!=null)?
                                facultyList.map((item,index)=>(
                                <option>{item.fid}</option>
                                )):""
                        }
                </select>
                <div className="col-sm-4"></div>
                <select className='col-sm-4' type='textbox' value={type} onChange={ e => setType(e.target.value)}>
                    <option>Select Coordinator Type</option>
                    <option>Placement Coordinator</option>
                    <option>Event Coordinator</option>
                    <option>Student Coordinator</option>
                    <option>Result and Feedback Coordinator</option>
                </select><br/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary' type='submit' style={{float:'right'}} onClick={()=>{PostCoordinator()}}>Submit</Button>
        </Modal.Footer>
      </Modal>

    );
  }
  export default CoordinatorAdditionModal;