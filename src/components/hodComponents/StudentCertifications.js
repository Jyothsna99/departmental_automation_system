import React,{useEffect,useState} from 'react';
import download from 'downloadjs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function CertificationComponent(props){
    let [CertificationList,setCertificationsList]=useState(null);
    let [facultyList,setFacultyList]=useState([]);
    const [year,setYear]=useState(null);
    const [cycle,setCycle]=useState(null); 
    const [uniqueCycleList,setUniqueCycleList]=useState([]); 
    let cycleList=[];
    const [errorMsg,setErrorMsg]=useState('');
    
    const downloadFile = async (id, path,mimetype) => {
          const result = fetch('/api/certification/download/'+id, {
            responseType: 'blob'
          })
          .then((res)=>res.blob())
          .then((data)=>{
            console.log("result",result.data);
            const split = path.split('/');
            const filename = split[split.length - 1];
            console.log(filename);
            setErrorMsg('');
            return download(data,filename,mimetype); 
          })
      };

    const fetchCertificationsList=()=>{
        fetch("/api/studentCertifications").then((res)=>res.json())
        .then((data)=>{
           setCertificationsList(data);
           for(var i=0;i<data.length;i++){
               console.log(cycleList);
                if(!cycleList.includes(data[i].cycle)){
                    cycleList.push(data[i].cycle)
                } 
           }
           setUniqueCycleList(cycleList);
        }) 
    }

    const filterData=()=>{
        if(year===""){
            fetch("/api/studentCertifications/"+null+"/"+cycle)
            .then((res)=>res.json())
            .then((data)=>setCertificationsList(data))
        }else{
            fetch("/api/studentCertifications/"+year+"/"+cycle)
            .then((res)=>res.json())
            .then((data)=>setCertificationsList(data)) 
        }
                    
    }

    useEffect(() => {
        fetchCertificationsList(); 
        setCertificationsList([]);
   },[])
        return(
            props.display?
            <div className="container-fluid">
                <h5  className="pt-5 pb-5">Students Certifications</h5>
                <div className="row pb-3 pt-3">
                    <div className="col-sm-1"></div>
                    <label className=" pt-1 pr-2 pl-5">Year:</label>
                    <input className="col-sm-2" type="textbox" placeholder="YYYY" value={year} onChange={ e => setYear(e.target.value)}></input>
                    <div className="col-sm-1"></div>
                    <select className="col-sm-2" value={cycle} onChange={ e => setCycle(e.target.value)}>
                        <option>Select Cycle</option>
                        {(uniqueCycleList!=null)?
                            uniqueCycleList.map((item,index)=>(
                              <option value={item}>{item}</option>
                            )):""
                        }
                    </select>
                    <div className="col-sm-2"></div>
                    <Button variant="primary" onClick={filterData}>Filter</Button>               
                </div>
                <Table id="certifications">
                <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Course Name</th>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Final Score</th>
                            <th>Certificate Type</th>
                            <th>Topper</th>
                            <th>Year</th>
                            <th>Cycle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(CertificationList!=null)?
                                CertificationList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.name}</td>
                                    <td>{item.rollNo}</td>
                                    <td>{item.score}</td>
                                    <td>{item.type}</td>
                                    <td>{item.topper}</td>
                                    <td>{item.year}</td>
                                    <td>{item.cycle}</td>
                                    
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <Table style={{display:'none'}}>
                <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Course Name</th>
                            <th>Faculty Name</th>
                            <th>Score</th>
                            <th>Issued by</th>
                            <th>Certificate</th>
                            <th>Topper</th>
                            <th>Year</th>
                            <th>Cycle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(CertificationList!=null)?
                                CertificationList.map((item,index)=>(
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.score}</td>
                                    <td>{item.issuedBy}</td>
                                    <td>{item.certificate}</td>
                                    <td>{item.topper}</td>
                                    <td>{item.year}</td>
                                    <td>{item.cycle}</td>
                                </tr>
                                )):<tr></tr>
                            }
                    </tbody>
                </Table>
                <ReactHTMLTableToExcel 
            id="test-table-xls-button"
            className="download-table-xls-button btn-primary rounded p-1 float-right"
            table="certifications"
            filename="studentCertifications"
            sheet="tablexls"
            buttonText="Download Certifications Table"/>
            </div>:''
        )
}
export default CertificationComponent;