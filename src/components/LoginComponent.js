import React,{ useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input,LoginListGroupWrapper,LoginListGroup} from '../Style';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser,faUsers} from "@fortawesome/free-solid-svg-icons";


function LoginComponent(props) {
    const [hod, setHod] = useState(true);
    const [faculty,setFaculty]=useState(false);
    const [email,setEmail]=useState('');
    const [hoderror,setHodError]=useState('');
    const [facultyerror,setFacultyError]=useState('');
    const [password,setPassword]=useState('');
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [coordinatorChecked,setCoordinatorChecked]=useState(false);
    let [fid,setFid]=useState('');
    let [cid,setCid]=useState('');
    let [hodFid,setHodFid]=useState('');
    let [type,setType]=useState('');

    const handle=(e)=>{
        e.preventDefault();
        setHod(!hod);
        setFaculty(!faculty);
    }
    
   const changeError=()=>{
       setFacultyError("Enter email to use Forgot Password");
   }
    const validate=(flag)=>{  
        console.log(flag,"inValidate")
        if(flag===1){
            if(!isAuthenticated){
                setHodError("Incorrect password");
            } else {
                setHodError("");
            }
        } else{
            console.log("faculty")
            var emailPattern = new RegExp(/[a-z0-9._%+-]+@aec\.edu\.in$/g)
            if (!emailPattern.test(email)) {
                    setFacultyError( 'please enter valid email');
            }
            else if(!isAuthenticated){
                    setFacultyError("Incorrect Email or password");
            } else {
                setFacultyError("");
            }
        }
        
    }


    
    const handleAuthentication = async (flag) =>{
        console.log(flag)
        if(flag===0){
            fetch("/api/fid/"+email).then((res)=> res.json())
            .then((data)=>{setFid(data.fid);
        })
        const res=await fetch("/api/auth",{
            method:"POST",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              email,password
            })
          })
          const data=await res.json();
          if(res.status===400){
            setIsAuthenticated(false);
          }else{
            setIsAuthenticated(true); 
          }

        }else if(flag===2){
            fetch("/api/coordinator/"+email).then((res)=> res.json())
            .then((data)=>{setCid(data.cid);
                setType(data.type.replace(/\s+/g, ''))
        })
        const res=await fetch("/api/auth",{
            method:"POST",
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({
              email,password
            })
          })
          const data=await res.json();
          if(res.status===400){
            setIsAuthenticated(false);
          }else{
            setIsAuthenticated(true); 
          }

        }else{
            
         /*   fetch("/api/fid/hod_cse@aec.edu.in").then((res)=>
            res.json())
            .then((data)=>{
            setHodFid(data.fid);
            console.log("List",data,hodFid);
            })
           */ const res=await fetch("/api/auth",{
                method:"POST",
                headers:{
                  "Content-type":"application/json"
                },
                body:JSON.stringify({
                  "email":"hod_cse@aec.edu.in",password
                })
              })
              const data=await res.json();
              
              if(res.status===400){
                setIsAuthenticated(false);
              }else{
                setIsAuthenticated(true); 
              }

            /*  if(password === "User@01"){
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }*/
        }

        
    }
    

  return(
    <div  style={{"background":"linear-gradient(#10ac84,transparent)",
        "background-color":"#222f3e", height:"100%",position: "absolute",left: 0,width: "100%",overflow: "hidden"}}>
        <div className="row pt-5" >
                <div className="col-sm-12 p-5" ></div>
                <div className="col-sm-3" ></div>
                <div className="row col-sm-6 p-0" style={{"box-shadow":" 0 38px 46px 0 rgba(0, 0, 0, 0.75), 0 6px 20px 0 rgba(0, 0, 0, 0.25)"}}>
                <div className="col-sm-4 p-0">
                    <LoginListGroupWrapper>
                        <LoginListGroup href="#" onClick={handle} 
                            className={ hod? 'list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >
                            <div style={{paddingLeft:"40%",paddingTop:"15%"}}>
                            <span style={{fontSize:"45px"}}>
                                <FontAwesomeIcon icon={faUser}/>
                            </span>
                            <h6 className="pb-5">HOD</h6> 
                        </div>
                        </LoginListGroup>
                        <LoginListGroup href="#" onClick={handle} 
                            className={ faculty? ' list-group-item list-group-item-action active': 'list-group-item list-group-item-action'} >
                            <div style={{paddingLeft:"35%",paddingTop:"15%"}}>
                                <span href="#" style={{fontSize:"45px"}}>
                                    <FontAwesomeIcon icon={faUsers}/>
                                </span>
                                <h6 className="pb-5">Faculty</h6>
                            </div>
                        </LoginListGroup>
                    </LoginListGroupWrapper>
                </div>
                {
                    faculty?
                    <div className="col-sm-8" style={{"box-shadow":"-2px 0 0 0 #16a085",backgroundColor:"#ffffff"}}>
                        <form>
                            <div className="text-center pl-3 pr-3 pt-4 pb-2">
                                <h2>Faculty Login</h2>
                            </div>
                            <div className="form-group pl-3 pr-3">
                                <Input type="text"
                                    placeholder="Email"
                                    value={ email }
                                    onChange={ e => setEmail(e.target.value) }
                                />
                            </div>
                            <div className="form-group pl-3 pr-3 pt-1">
                                <Input 
                                    type="password" 
                                    placeholder="Password"
                                    value={ password }
                                    onChange={ e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group pl-3 pr-3 pt-1">
                                <input
                                    type="checkbox"
                                    onChange = {e => setCoordinatorChecked(!coordinatorChecked)}
                                /> Logging in as coordinator? check this box
                            </div>
                            <div className="form-group pt-3 pb-3 pl-3 pr-3">
                            
                                <Link to={coordinatorChecked?handleAuthentication(2):handleAuthentication(0), isAuthenticated?(coordinatorChecked?"/coordinator/"+type+"/"+cid:"/faculty/"+fid):"/"}><button 
                                    className="col-sm-12" 
                                    style={{backgroundColor:"#16a085",border:"6px",borderRadius:"2px",padding:"6px",color:"white",fontSize:"18px"}}
                                    type="submit"
                                    onClick={()=>{
                                        validate(0);
                                        props.setAuthenticated(isAuthenticated);
                                        }}
                                    >LogIn</button>
                                </Link>     
                            </div> 
                            <div className="text-center pt-2 ">
                                <p>{fid!==""?<a href={"/forgot/"+fid} style={{color:"black"}}>Forgot Password?</a>:<p onClick={changeError}>Forgot Password?</p>}</p>
                            </div> 
                            {
                                facultyerror?<div className="alert alert-danger text-center">
                                        {facultyerror}
                                        </div>:''
                            }                  
                        </form>
                    </div>:''
                }
                {
                        hod?
                        <div className="col-sm-8" style={{"box-shadow":"-2px 0 0 0 #16a085",backgroundColor:"#ffffff"}}>
                            <form>
                                <div className="text-center pl-3 pr-3 pt-5 pb-3">
                                    <h2>HOD Login</h2>
                                </div>
                                <div className="form-group pl-3 pr-3">
                                    <Input 
                                        type="password" 
                                        placeholder="Password"
                                        value={ password }
                                        onChange={ e => setPassword(e.target.value) }
                                    />
                                </div>
                                <div className="form-group pt-2 pb-3 pl-3 pr-3">
                                    <Link to={password==="User@01"?"/hod":"/"}><button 
                                        className="col-sm-12" 
                                        style={{backgroundColor:"#16a085",border:"6px",borderRadius:"2px",padding:"6px",color:"white",fontSize:"18px"}}
                                        type="submit"
                                        onClick={()=>{
                                        validate(1);
                                        props.setAuthenticated(password==="User@01");
                                       }}
                                       >LogIn</button>
                                    </Link> 
                                </div>  
                                {
                                hoderror?<div className="alert alert-danger text-center">
                                        {hoderror}
                                        </div>:''
                            }                  
                            </form>
                        </div>:''
                }
                </div>
                <div className="col-sm-3" ></div>
                </div>
    </div>
  )
}

export default LoginComponent;