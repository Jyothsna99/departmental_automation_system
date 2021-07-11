import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function InternshipComponent(props){
    let [placementList,setPlacementList]=useState(null);
    const [batch,setBatch]=useState(null);
    const [uniqueBatchList,setUniqueBatchList]=useState(null);
    let batchList=[];
    const filterData=()=>{
        console.log("filter",batch)
        fetch("/api/internships/"+batch)
        .then((res)=>res.json())
        .then((data)=>setPlacementList(data))             
    }

    const fetchPlacementList=()=>{
        fetch("/api/internships").then((res)=>res.json())
        .then((data)=>{
           setPlacementList(data);
           for(var i=0;i<data.length;i++){
                if(!batchList.includes(data[i].batch)){
                    batchList.push(data[i].batch)
                } 
           }
           setUniqueBatchList(batchList);
        }) 
    }

    useEffect(() => {
        fetchPlacementList(); 
        setPlacementList([]);
   },[])
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Internships Data</h5>
                <div className="row pb-3 pt-3">
                <div className="col-sm-1"></div>
                <select className="col-sm-2" value={batch} onChange={ e => setBatch(e.target.value)}>
                        <option value="">Select Batch</option>
                        {(uniqueBatchList!=null)?
                            uniqueBatchList.map((item,index)=>(
                              <option value={item}>{item}</option>
                            )):""
                        }
                    </select>
                    <div className="col-sm-2"></div>
                    <Button variant="primary" onClick={filterData}>Filter</Button>               
                </div>
                <Table id="internships" responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                                <th>Roll No</th>
                                <th>Name of the Student</th>
                                <th>Class And Section</th>
                                <th>Company Name</th>
                                <th>Dates</th>
                                <th>Batch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(placementList!=null)?
                                placementList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.rollNo}</td>
                                    <td>{item.name}</td>
                                    <td>{item.class}</td>
                                    <td>{item.company}</td>
                                    <td>{item.dates}</td>
                                    <td>{item.batch}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
  
                <ReactHTMLTableToExcel 
            id="test-table-xls-button"
            className="download-table-xls-button btn-primary rounded p-1 float-right"
            table="internships"
            filename="internships"
            sheet="tablexls"
            buttonText="Download Internships Table"/>
            </div>:''
        )
}
export default InternshipComponent;