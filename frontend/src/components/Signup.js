import React from "react";
import Axios from 'axios';
// import Redirect from 'react-dom';
import {Link,Navigate} from 'react-router-dom';


export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RedirectState: false,
      server: '',
    }
  }
  componentDidMount() {
    const server = window.$name;
    this.setState({ server: server })
  }
  insertUser = (event) => {
    event.preventDefault();
    event.persist();
    Axios.post(this.state.server + 'SignupController.php',
      {
        email: this.email.value,
        password: this.password.value,
      })
      .then(function (res) {
        // console.log(res.data)
        if (res.data.valid == true) {
          alert(res.data.value.msg);
          localStorage.setItem('token', res.data.value.token);
          localStorage.setItem('email',this.email.value);
          localStorage.setItem('u_id',res.data.value.u_id);
          this.setState({RedirectState:true});
        }
        else if (res.data.valid == false) {
          alert(res.data.value.msg);
        }
        else {
          alert(res);
          console.log(res);
        }
      }
        .bind(this))
        .catch(function (error) {
        console.log(error);
      });

  }
  render() {
    return ((this.state.RedirectState || localStorage.getItem('token')!==null)?(<Navigate to={"/view_user"}></Navigate>):
      <>
        <body>
          <div className="container-fluid" style={{height:"100vh"}}>
            <div className="row d-flex justify-content-center align-items-center" style={{height:"100%"}}>
            
              <div className="col-4" >
                <div className="card" >
                  <div className="card-header text-left">
                    <div>Sign Up</div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.insertUser}>
                      <div className="input-group mb-3">
                        <input type="email" name="email" ref={(val) => this.email = val} className="form-control" placeholder="Email" required />
                      </div>
                      <div className="input-group mb-3">
                        <input type="password" name="password" ref={(val) => this.password = val} className="form-control" placeholder="Password" required />
                      </div>
                      <div className="row d-flex justify-content-around">
                      <Link to="/" style={{display:"contents"}}><button type="button" className="btn btn-outline-primary col-5">Sign In</button></Link>
                        <button type="submit" className="btn btn-primary col-5">Sign Up</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </>
    );
  }
}