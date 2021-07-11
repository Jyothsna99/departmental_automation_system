import React,{useEffect,useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function StudentWorkshopAttendedComponent(props){
    let [studentList,setStudentList]=useState([]);
    const [to,setTo]=useState(null);
    const [from,setFrom]=useState(null);
    const [name,setName]=useState(null);
    const [type,setType]=useState(null);
    const [uniqueProgramList,setUniqueProgramList]=useState([]); 
    let programList=[];

    const fetchWorkshopAttendedList=()=>{
            fetch("/api/workshopAttended").then((res)=>res.json())
            .then((data)=>{
                 console.log("data",data);
                 setStudentList(data);
                 for(var i=0;i<data.length;i++){                    
                     if(!programList.includes(data[i].name)){
                         programList.push(data[i].name)
                     } 
                }
                setUniqueProgramList(programList);
            })
    }

    const filterData=()=>{
        fetch("/api/workshopAttended/"+name+"/"+type+"/"+from+"/"+to)
        .then((res)=>res.json())
        .then((data)=>setStudentList(data))             
    }
    useEffect(() => {
         setStudentList([]);
         setUniqueProgramList([]);
         fetchWorkshopAttendedList();
    },[])
   
        return(
            props.display?
            <div className="container-fluid">
            <h5  className="pt-5 pb-5">Workshops/Seminars/Trainings Attended</h5> 
            <div className="row pb-3 pt-3">
                <select className="col-sm-2 p-1" name="subjects" value={name} onChange={ e => setName(e.target.value)}>
                    <option >Select Name of the Program</option>
                    {(uniqueProgramList!=null)?
                            uniqueProgramList.map((item,index)=>(
                              <option>{item}</option>
                            )):""
                    }
                </select>
                <div className="col-sm-1"></div>
                    <input className="col-sm-2 p-1" type="date" value={from} onChange={ e => setFrom(e.target.value)}></input>
                    <div className="col-sm-1"></div>
                    <input className="col-sm-2 p-1" type="date" value={to} onChange={ e => setTo(e.target.value)}></input>
                    <div className="col-sm-1"></div>
               
                    <select className="col-sm-2 p-1" value={type} onChange={ e => setType(e.target.value)}>
                        <option>Select Type</option>
                        <option>Workshop</option>
                        <option>Training</option>
                        <option>Seminar</option>
                    </select>
                    <div className="pr-1"></div>
                    <Button variant="primary" onClick={filterData}>Filter</Button>
                
                
                    
                </div>             
                
                <Table id="syllabusStatus" responsive>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Reg.No.</th>
                            <th>Name of the Student</th>
                            <th>Type of the Program</th>
                            <th>Name of the Program</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {(studentList!=null)?
                            studentList.map((item,index)=>(
                                <tr key={index}>       
                                    <td>{item.sNo}</td>
                                    <td>{item.regNo}</td>
                                    <td>{item.stuName}</td>
                                    <td>{item.type}</td>
                                    <td>{item.name}</td>
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
                    table="syllabusStatus"
                    filename="syllabus-status"
                    sheet="tablexls"
                    buttonText="Download syllabus status"/>
                
            </div>:''
        )
}
export default StudentWorkshopAttendedComponent;