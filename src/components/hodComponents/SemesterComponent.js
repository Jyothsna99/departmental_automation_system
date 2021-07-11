import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function SemesterComponent(props){
    let [placementList,setPlacementList]=useState(null);
    const [year,setYear]=useState(null);
    const [uniqueBatchList,setUniqueBatchList]=useState(null);
    let batchList=[];
    const filterData=()=>{
        fetch("/api/semesterResult/"+year)
        .then((res)=>res.json())
        .then((data)=>setPlacementList(data))             
    }

    const fetchPlacementList=()=>{
        fetch("/api/semesterResult").then((res)=>res.json())
        .then((data)=>{
           setPlacementList(data);
           for(var i=0;i<data.length;i++){
                if(!batchList.includes(data[i].year)){
                    batchList.push(data[i].year)
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
                <h5  className="pt-5 pb-5">Semester Results</h5>
                <div className="row pb-3 pt-3">
                <div className="col-sm-1"></div>
                <select className="col-sm-2" value={year} onChange={ e => setYear(e.target.value)}>
                        <option value="">Select Academic Year</option>
                        {(uniqueBatchList!=null)?
                            uniqueBatchList.map((item,index)=>(
                              <option value={item}>{item}</option>
                            )):""
                        }
                    </select>
                    <div className="col-sm-2"></div>
                    <Button variant="primary" onClick={filterData}>Filter</Button>               
                </div>
                <Table id="semester" responsive>
                <thead>
                        <tr>
                            <th>S.No.</th>
                                <th>Semester</th>
                                <th>A Section</th>
                                <th>B Section</th>
                                <th>C Section</th>
                                <th>Overall</th>
                                <th>Academic year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(placementList!=null)?
                                placementList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.semester}</td>
                                    <td>{item.aSec}</td>
                                    <td>{item.bSec}</td>
                                    <td>{item.cSec}</td>
                                    <td>{item.overall}</td>
                                    <td>{item.year}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
  
                <ReactHTMLTableToExcel 
            id="test-table-xls-button"
            className="download-table-xls-button btn-primary rounded p-1 float-right"
            table="semester"
            filename="semester"
            sheet="tablexls"
            buttonText="Download Semester Results Table"/>
            </div>:''
        )
}
export default SemesterComponent;