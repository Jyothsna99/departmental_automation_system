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
        fetch("/api/seminar/"+from+"/"+to)
        .then((res)=>res.json())
        .then((data)=>setFdpList(data))             
    }

    const fetchFdpList=()=>{
        fetch("/api/seminar").then((res)=>res.json())
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
                <h5  className="pt-5 pb-5">Seminars/Guest Lectures Organized</h5>
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
                <Table id="lectureOrganized" responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                                <th>Topic</th>
                                <th>Resource Person</th>
                                <th>Venue</th>
                                <th>Date</th>
                                <th>No. of Participants</th>
                                <th>Student/Faculty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(fdpList!=null)?
                                fdpList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.topic}</td>
                                    <td>{item.resourcePerson}</td>
                                    <td>{item.venue}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.participants}</td>
                                    <td>{item.who}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
  
                <ReactHTMLTableToExcel 
            id="test-table-xls-button"
            className="download-table-xls-button btn-primary rounded p-1 float-right"
            table="lectureOrganized"
            filename="lectureOrganized"
            sheet="tablexls"
            buttonText="Download Guest Lectures Organized Table"/>
            </div>:''
        )
}
export default LectureOrganizedComponent;