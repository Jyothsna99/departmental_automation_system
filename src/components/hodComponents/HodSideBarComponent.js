import React,{useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../Style";
import SyllabusStatusComponent from './syllabusStatusComponent/SyllabusStatusHome';
import SubjectDataComponent from './subjectComponent/SubjectDataHome';
import FacultyDataComponent from './facultyDataComponent/FacultyDataHome';
import AwardComponent from './AwardComponent';
import PublishComponent from './PublishComponent';
import CertificationComponent from './CertificationComponent';
import IndustryTrainingComponent from './IndustryTrainingComponent';
import SubjectAllocationComponent from './subjectAllocationComponent/SubjectAllocationHome';
import FacultyFdpComponent from './FacultyFDPComponent';
import GuestLecturesComponent from './GuestLectureComponent';
import PatentComponent from './PatentComponent';
import LessonPlanComponent from './LessonPlanComponent';
import CoordinatorDataComponent from './coordinatorComponent/CoordinatorDataHome';
import WorkShopsAttendedComponent from './StudentWorkshopAttendedComponent';
import FdpOrganizedComponent from './FdpOrganizedComponent';
import GuestLecturesOrganizedComponent from './GuestLectureOrganizedComponent';
import ActivitiesOrganizedComponent from './ActivitiesConductedComponent';
import PlacementComponent from './PlacementComponent';
import InternshipComponent from './InternshipsComponent';
import StudentActivitiesComponent from './StudentsActivitiesComponent';
import StudentCertificationsComponent from './StudentCertifications';
import SemesterComponent from './SemesterComponent';

function SideBarComponent(props){
    const initialList=[
        {
            id:1,
            display:true
        },{
            id:2,
            display:false
        },{
            id:3,
            display:false
        },{
            id:4,
            display:false
        },{
            id:5,
            display:false
        },{
            id:6,
            display:false
        },{
            id:7,
            display:false
        },{
            id:8,
            display:false
        },{
            id:9,
            display:false
        },{
            id:10,
            display:false
        },{
            id:11,
            display:false
        },{
            id:12,
            display:false
        },{
            id:13,
            display:false
        },{
            id:14,
            display:false
        },{
            id:15,
            display:false
        },{
            id:16,
            display:false
        },{
            id:17,
            display:false
        },{
            id:18,
            display:false
        },{
            id:19,
            display:false
        },{
            id:20,
            display:false
        },{
            id:21,
            display:false
        }
    ]
    const [list,setList]=useState(initialList);
    
    const handle=(e,id)=>{
        e.preventDefault();
        console.log("enetered");
        const newList = list.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                display: true,
              };
              return updatedItem;
            }else{
                const updatedItem = {
                    ...item,
                    display: false,
                }; 
                return updatedItem;
            }
        });
        setList(newList);
    }
    
    return(
        <HomeWrapper className="row">
            <div className="col-md-2">
                {props.display?
                    <ListGroupWrapper>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[0].id)}  className={ list[0].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Faculty Data</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[1].id)} className={list[1].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Coordinator Data</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[2].id)}  className={ list[2].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Subject Data</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[3].id)}  className={ list[3].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Subject Allocation</ListGroup>
                        <ListGroup href="#"  onClick={(e)=>handle(e,list[4].id)} className={ list[4].display?'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Lesson Plan</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[5].id)} className={ list[5].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >Syllabus Status</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[6].id)} className={list[6].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Guest Lectures Presented</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[7].id)} className={list[7].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Workshop/FDP Attended</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[8].id)} className={list[8].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Paper published</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[9].id)} className={list[9].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Patents/Copyrights</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[10].id)} className={list[10].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Mooc's/Certifications</ListGroup>           
                        <ListGroup href="#" onClick={(e)=>handle(e,list[11].id)} className={list[11].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Award/Achievements</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[12].id)} className={list[12].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>FDP/Workshop Organized</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[13].id)} className={list[13].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Seminars/Guest Lectures Organized</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[14].id)} className={list[14].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Technical Symposiums/Students Chapter/Club Activities conducted</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[15].id)} className={list[15].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Placements</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[16].id)} className={list[16].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Internships</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[17].id)} className={list[17].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Students Workshops/Seminars/ Trainings Attended</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[18].id)} className={list[18].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Co-Curricular/Extra-Curricular / Social Service Activities participated</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[19].id)} className={list[19].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Student Certifications</ListGroup>
            
                        <ListGroup href="#" onClick={(e)=>handle(e,list[20].id)} className={list[20].display? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Semester Results</ListGroup>
                   
                   
                        <ListGroup href="#" className="list-group-item list-group-item-action">Result Analysis</ListGroup>
                        <ListGroup href="#" className="list-group-item list-group-item-action">Feedback Report</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
               {<FacultyDataComponent display={list[0].display}/>}
               {<CoordinatorDataComponent display={list[1].display}/>}
               {<SubjectDataComponent display={list[2].display}/>}
               {<SubjectAllocationComponent display={list[3].display}/>}
               {<LessonPlanComponent display={list[4].display}/>}
               {<SyllabusStatusComponent display={list[5].display}/>}
               {<GuestLecturesComponent display={list[6].display}/>}
               {<FacultyFdpComponent display={list[7].display}/>}
               {<PublishComponent display={list[8].display}/>}
               {<PatentComponent display={list[9].display}/>}
               {<CertificationComponent display={list[10].display}/>}
               {<AwardComponent display={list[11].display}/>}
               {<FdpOrganizedComponent display={list[12].display}/>}
               {<GuestLecturesOrganizedComponent display={list[13].display}/>}
               {<ActivitiesOrganizedComponent display={list[14].display}/>}
               {<PlacementComponent display={list[15].display}/>}
               {<InternshipComponent display={list[16].display}/>}
               {<WorkShopsAttendedComponent display={list[17].display}/>} 
               {<StudentActivitiesComponent display={list[18].display}/>}
               {<StudentCertificationsComponent display={list[19].display}/>}
               {<SemesterComponent display={list[20].display}/>}
               
              
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;