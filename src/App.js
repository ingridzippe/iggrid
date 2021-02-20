import React from "react";
import { connect } from "react-redux";
import Login from './Login';
import CreateAccount from './CreateAccount';
import Main from './Main';
import GridContext from './GridContext';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  NavLink, 
  Switch,
  useParams
} from "react-router-dom";

const App = ({ match }) => {
  return (
    <div>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route path="/main/:id?" component={Main} />
      </Switch>
    </Router>
    <div className="userid">{"Hello"}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  userid: state.id
})

export default connect(mapStateToProps)(App);
