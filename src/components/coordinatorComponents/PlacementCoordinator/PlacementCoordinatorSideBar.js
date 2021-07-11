import React,{useState} from 'react';
import {ListGroupWrapper,ListGroup,HomeWrapper} from "../../../Style";
import PlacementComponent from './placementComponent/placementComponentHome';
import InternshipComponent from './InternshipComponent/InternshipComponentHome';

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
                        <ListGroup href="#" onClick={(e)=>handle(e,list[0].id)}  className={ list[0].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Placements</ListGroup>
                        <ListGroup href="#" onClick={(e)=>handle(e,list[1].id)}  className={ list[1].display? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'}>Internships</ListGroup>
                    </ListGroupWrapper>:''
                }
            </div>
            <div className={props.display?"col-md-10":"col-md-12"}>
                <PlacementComponent display={list[0].display}/>
                <InternshipComponent display={list[1].display}/>
            </div>
        </HomeWrapper>
    )
}

export default SideBarComponent;