import React,{useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../../Style";
import FdpComponent from './fdpOrganizedComponent/FdpOrganizedHome';
import SeminarComponent from './SeminarComponenr/SeminarHome';
import ActivityComponent from './ActivitiesComponent/ActivitiesHome';

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
                        <ListGroup href="#" onClick={(e)=>handle(e,list[0].id)}  className={ list[0].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>FDPs/Workshops Organized</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[1].id)}  className={ list[1].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Seminars/Guest Lectures Organized</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[2].id)}  className={ list[2].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Technical Symposiums/Students Chapter/Club Activities conducted</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
                <FdpComponent display={list[0].display}/>
                <SeminarComponent display={list[1].display}/>
                <ActivityComponent display={list[2].display}/>
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;