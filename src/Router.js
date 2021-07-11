import React from "react"
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
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/faculty/:id" exact component={FacultyHomeComponent}/>
                <Route path="/hod" exact component={HodHomeComponent}/>
                <Route path="/forgot/:user" exact component={ForgotComponent}/>
                <Route path="/coordinator/PlacementCoordinator/:cid" exact component={PlacementCoordinatorHomeComponent}/>
                <Route path="/coordinator/EventCoordinator/:cid" exact component={EventCoordinatorHomeComponent}/>
                <Route path="/coordinator/StudentCoordinator/:cid" exact component={StudentCoordinatorHome}/>
                <Route path="/coordinator/ResultandFeedbackCoordinator/:cid" exact component={ResultAndFeedbackCoordinatorComponent}/>
                
            </Switch>   
        </Router>
    )
}

export default App