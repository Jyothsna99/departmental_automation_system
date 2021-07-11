import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function LectureOrganizedComponent(props){
    let [fdpList,setFdpList]=useState(null);
    const [from,setFrom]=useState(null);
    const [to,setTo]=useState(null);

    const filterData=()=>{
        console.log("filter")
        fetch("/api/studentActivities/"+from+"/"+to)
        .then((res)=>res.json())
        .then((data)=>setFdpList(data))             
    }

    const fetchFdpList=()=>{
        fetch("/api/StudentActivities").then((res)=>res.json())
        .then((data)=>{
           setFdpList(data);     
        }) 
    }

    useEffect(() => {
        fetchFdpList(); 
        setFdpList([]);
   },[])
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Co-Curricular/Extra-Curricular / Social Service Activities participated</h5>
                <div className="row pb-3 pt-3">
                <div className="col-sm-1"></div>
                    <label className=" pt-1 pr-2 pl-5">From:</label>
                    <input className="col-sm-2" type="date" value={from} onChange={ e => setFrom(e.target.value)}></input>
                    <div className="col-sm-1"></div>
                    <label className="pt-1 pr-2 pl-5">To:</label>
                    <input className="col-sm-2" type="date" value={to} onChange={ e => setTo(e.target.value)}></input>
                    <div className="col-sm-2"></div>
                    <Button variant="primary" onClick={filterData}>Filter</Button>               
                </div>
                <Table id="studentActivities" responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                                <th>Name of the Event</th>
                                <th>Name of the Student</th>
                                <th>Prize</th>
                                <th>Name of the Symposium / Tech fest/ Training Programme</th>
                                <th>Organized By</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(fdpList!=null)?
                                fdpList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.eventName}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.prize}</td>
                                    <td>{item.nameOfProgram}</td>
                                    <td>{item.organizedBy}</td>
                                    <td>{new Date(item.from).toDateString()}</td>
                                    <td>{new Date(item.to).toDateString()}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
  
                <ReactHTMLTableToExcel 
            id="test-table-xls-button"
            className="download-table-xls-button btn-primary rounded p-1 float-right"
            table="studentActivities"
            filename="studentActivities"
            sheet="tablexls"
            buttonText="Download Table"/>
            </div>:''
        )
}
export default LectureOrganizedComponent;