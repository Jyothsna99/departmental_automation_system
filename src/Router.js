import React,{useState} from "react"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import HodHomeComponent from './components/hodComponents/HodHomeComponent';
import FacultyHomeComponent from './components/facultyComponents/FacultyHomeComponent';
import ForgotComponent from './components/ForgotComponent';
import StudentCoordinatorHome from "./components/coordinatorComponents/StudentCoordinatorComponent/StudentCoordinatorHome";
import PlacementCoordinatorHomeComponent from "./components/coordinatorComponents/PlacementCoordinator/PlacementCoordinatorHome";
import EventCoordinatorHomeComponent from "./components/coordinatorComponents/EventCoordinator/EventCoordinatorHome";
import ResultAndFeedbackCoordinatorComponent from './components/coordinatorComponents/ResultAndFeedbackCoordinator/ResultAndFeedbackHome';

function App() {

    const [authenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            
            <Switch>

                <Route path="/" exact component={() => <LoginComponent setAuthenticated={p => {setAuthenticated(p);}}/>}/>
                <Route path="/faculty/:id" exact component={authenticated?FacultyHomeComponent:()=><LoginComponent setAuthenticated={p => {setAuthenticated(p);}}/>}/>
                <Route path="/hod" exact component={authenticated?HodHomeComponent:()=><LoginComponent setAuthenticated={p => {setAuthenticated(p);}}/>}/>
                <Route path="/forgot/:user" exact component={ForgotComponent}/>
                <Route path="/coordinator/PlacementCoordinator/:cid" exact component={authenticated?PlacementCoordinatorHomeComponent:()=><LoginComponent setAuthenticated={p => {setAuthenticated(p);}}/>}/>
                <Route path="/coordinator/EventCoordinator/:cid" exact component={authenticated?EventCoordinatorHomeComponent:()=><LoginComponent setAuthenticated={p => {setAuthenticated(p);}}/>}/>
                <Route path="/coordinator/StudentCoordinator/:cid" exact component={authenticated?StudentCoordinatorHome:()=><LoginComponent setAuthenticated={p => {setAuthenticated(p);}}/>}/>
                <Route path="/coordinator/ResultandFeedbackCoordinator/:cid" exact component={authenticated?ResultAndFeedbackCoordinatorComponent:()=><LoginComponent setAuthenticated={p => {setAuthenticated(p);}}/>}/>
                <Route component={() => <LoginComponent setAuthenticated={p => {setAuthenticated(p)}}/>}/>

            </Switch>   
  
        </Router>
    )
}

export default App