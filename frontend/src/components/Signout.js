import React from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Signout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      server: ""
    }
  }
  componentDidMount() {
    Axios.post(window.$name + 'LogoutController.php')
      .then((response) => {
        console.log(response);
      })
    localStorage.clear();
  }
  render() {
    return (
        <body>
        <div className="container-fluid" style={{height:"100vh"}}>
          <div className="row d-flex justify-content-center align-items-center" style={{height:"100%"}}>
          
            <div className="col-4" >
              <div className="card" >
              <div className="card-body text-center">
        
You're Successfully Logged Out !!!
      </div>
                <div className="card-footer text-center">


                  <Link to="/" style={{display:"contents"}}><button type="button" className="btn btn-outline-primary col-5">Sign In</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    )
  }
}