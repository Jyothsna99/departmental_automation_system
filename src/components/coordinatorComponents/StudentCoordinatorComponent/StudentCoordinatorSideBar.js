import React,{useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../../Style";
import WorkShopsAttendedComponent from './WorkshopsAttenedComponent/WorkShopsAttendedHome';
import StudentActivitiesComponent from './StudentActivitiesComponent/StudentActivitiesHome';
import StudentCertificationsComponent from './StudentCertificationComponent/StudentCertificationsHome';
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
        }
    ]
    const [list,setList]=useState(initialList);
    
    const handle=(e,id)=>{
        e.preventDefault();
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
                        <ListGroup href="#" onClick={(e)=>handle(e,list[0].id)}  className={ list[0].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Workshops/Seminars/ Trainings Attended</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[1].id)}  className={ list[1].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Co-Curricular/Extra-Curricular / Social Service Activities participated</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[2].id)}  className={ list[2].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Certifications</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
               {<WorkShopsAttendedComponent display={list[0].display}/>}
               {<StudentActivitiesComponent display={list[1].display}/>}
               {<StudentCertificationsComponent display={list[2].display}/>}
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;