import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Table from 'react-bootstrap/Table';


function PatentComponent(props){
    let [patentList,setPatentList]=useState([]);
    const [from,setFrom]=useState(null);
    const [to,setTo]=useState(null);

    const fetchPatentList=()=>{
        fetch("/api/patent").then((res)=>res.json())
        .then((data)=>{
           setPatentList(data);     
        })
    }
    
    const filterData=()=>{
        console.log("filter")
        fetch("/api/patent/"+from+"/"+to)
        .then((res)=>res.json())
        .then((data)=>setPatentList(data))             
    }

    useEffect(() => {
        fetchPatentList(); 
   },[])
   
        return(
            
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Patents/Copyrights Published/Granted</h5> 

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
                
                <Table id="patents" responsive >
                   
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title of the Patent</th>
                            <th>Application Number</th>
                            <th>Inventors</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {(patentList!=null)?
                            patentList.map((item,index)=>                                
                                (
                                <tr key={index}>       
                                    <td>{index+1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.applicationNumber}</td>
                                    <td>{item.inventors}</td>
                                    <td>{new Date(item.date).toDateString()}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )
                            ):<tr></tr>
                        }
                    </tbody>
                    
                </Table>
                <ReactHTMLTableToExcel 
                id="test-table-xls-button"
                className="download-table-xls-button btn-primary rounded p-1 float-right"
                table="patents"
                filename="Patents"
                sheet="Patents"
                buttonText="Download Patents Table"/>
                
            </div>:''
        )
}
export default PatentComponent;