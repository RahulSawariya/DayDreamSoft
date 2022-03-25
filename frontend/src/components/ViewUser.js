import React from "react";
import Axios from 'axios';
import {Link,Navigate,NavLink} from 'react-router-dom';
import $, { event } from "jquery";
import dt from 'datatables.net-responsive-dt';
import Modal from 'react-modal'
import ImageUploader from "react-images-upload";


export default class ViewUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RedirectState: false,
      server: '',
      ExistingUsers:[],
      u_id:'',
      formAction:'ADD',
      task_id:'',

      modelIsOpenForAddTask:false,
      modelIsOpenForEdit:false,
      modelIsOpenForComplete:false,
      modelIsOpenForResponse:false,
      
      title:'',
      date:'',
      picture:'',

      response:'',
    }
    this.ondrop = this.ondrop.bind(this)
  }

  ondrop(pictures) {
    this.setState({
        picture: pictures
    })
    console.log(this.state.picture)
}

AddTask = (event) => {
  event.preventDefault();
  event.persist();
  if (this.state.formAction == "ADD") {
    const fd = new FormData();

    fd.append('auth_email',localStorage.getItem('email'))
    fd.append('auth_token',localStorage.getItem('token'))
    fd.append('u_id',localStorage.getItem('u_id'));
    fd.append('taskimg', this.state.picture[0]);
    fd.append('title', this.title.value);
    fd.append('date', this.date.value);

        
// console.log(fd);

    Axios.post(this.state.server+'/CreateTaskController.php',fd)
            .then(function (res) {
                // alert(res.data.Msg);
                // console.log(res.data);
                if (res.data.success == 1) {
                    alert(res.data.Msg);
                    console.log(res);
                    console.log(res.data);
                    // window.location.reload();
                }
                else {
                    alert(res.data.Msg);
                    console.log(res);
                    console.log(res.data);
                    // window.location.reload();
                }
            }
                .bind(this))
            .catch(function (error) {
                console.log(error);
            });
    
}
this.setState({modelIsOpenForSubmit:false});
}

  componentDidMount() {
    const server = window.$name;
    this.setState({ server: server });
    let value = localStorage.getItem('token');
    // alert(value); 
    if(value==null){
        this.setState({RedirectState:true});
        this.state.RedirectState = true;
        // alert(this.state.RedirectState);
    }

    Axios.post(window.$name + 'ViewTaskController.php',
      {
        auth_email: localStorage.getItem('email'),
        auth_token: localStorage.getItem('token'),
        u_id: localStorage.getItem('u_id'),
      })
      .then(function (res) {
        if (res.data.valid == true) {
          console.log(res.data.value.users);
          this.setState({ExistingUsers:res.data.value.users});
          var dataTable = $('#table').DataTable({
            responsive: true,
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                //debugger;
                var index = iDisplayIndexFull + 1;
                $("td:first", nRow).html(index);
                return nRow;
            },
            columnDefs: [
                { "className": "dt-center", "targets": "_all" },
                { responsivePriority: 1, targets: -1 },
                { responsivePriority: 2, targets: 1 },
                { responsivePriority: 3, targets: 0 }
            ]
        });
        $("#searchbox").on("keyup search input paste cut", function () {
            dataTable.search(this.value).draw();
        });
        }
        else if (res.data.valid == false) {
          // console.log(res.data.value.msg);
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

  FillForm = (data) =>{
    // console.log(data)
    this.setState({
      task_id:data,
      modelIsOpenForComplete:true});
  }

  EditUser = (event) => {
    // alert(this.state.user_id);
    event.preventDefault();
    event.persist();
    Axios.post(this.state.server + 'EditUserController.php',
      {
        auth_email: localStorage.getItem('email'),
        auth_token: localStorage.getItem('token'),
        user: this.state.user,
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value,
        address: this.address.value
      })
      .then(function (res) {
        if (res.data.valid == true) {
          // window.location.reload();
          // alert(res.data.value.msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
        }
        else if (res.data.valid == false) {
          // window.location.reload();
          // alert(res.data.value.Msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
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

  DeleteUser = () => {
    // alert(this.state.user);
    // event.preventDefault();
    // event.persist();
    Axios.post(this.state.server + 'CompleteTaskController.php',
      {
        auth_email: localStorage.getItem('email'),
        auth_token: localStorage.getItem('token'),
        t_id: this.state.task_id,
      })
      .then(function (res) {
        console.log(res)
        if (res.data.valid == true) {
          // window.location.reload();
          // alert(res.data.value.msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
        }
        else if (res.data.valid == false) {
          // window.location.reload();
          // alert(res.data.value.Msg);
          this.setState({
            response:res.data.value.msg,
            modelIsOpenForResponse:true
          })
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
   
    return ((this.state.RedirectState)?(<Navigate to={"/"}></Navigate>):
      <>
 <nav class="navbar navbar-dark bg-primary navbar-expand-lg ">
          <a class="navbar-brand" href="#">USER</a>
          <div class="navbar-nav">
            <NavLink to={"/view_user"} className="nav-item nav-link" activeClassName="active" >View Existing</NavLink>
            <Link class="nav-item nav-link" to={'/signout'}>Logout</Link>
            {/* </div> */}
          </div>
        </nav>
        <body>
     
          <div className="container-fluid" style={{height:"100vh"}}>
          <div className="row d-flex justify-content-end align-items-center mt-4">
            <div className="col-2" >
          <button className="btn btn-success" title="Edit" onClick={()=>this.setState({modelIsOpenForAddTask:true, formAction:'ADD'})}><i class="far fa-plus"></i> Add New Task </button>
          </div>
          </div>

          {this.state.ExistingUsers.length == 0 ? 
          <div class="alert alert-danger mt-4 text-center" >No Data Available !!!</div>
          :
            <div className="row d-flex justify-content-center align-items-center" style={{height:"100%"}}>
            
              <div className="col-10" >
                <div className="card" style={{height:"90vh"}}>
                  <div className="card-header text-center">
                    <div>Exisiting Tasks</div>
                  </div>
                  <div className="card-body" style={{overflow:"auto"}}>
                  <table id="table" class="table table-hover">
  <thead style={{position:"sticky",top:"-16px",background:"white"}}>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Date</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {this.state.ExistingUsers.map((data) =>
    <tr>
      <td></td>
      <td>{data.title}</td>
      <td>{data.date}</td>
      <td> 
        <a target="_blank" href={"../../../uploads/" + data.img} style={{height:"35px",width:"35px"}}>
        <img src={"../../../uploads/" + data.img} alt={data.img}  class="desimg" style={{height:"inherit",width:"inherit"}}/></a>
      </td>
      <td className="d-flex justify-content-around">
        {data.status == '1' ? 
        <button className="btn btn-primary" title="Complete" onClick={()=>this.FillForm(data.id)}><i class="far fa-check"></i> Done</button>
        :
        <button className="btn btn-success" title="Completed">Completed</button>
        }
        </td>
    </tr>
  )}
  </tbody>
</table>
                  </div>
                </div>
              </div>
            </div>
  }
          </div>
        </body>

        <Modal isOpen={this.state.modelIsOpenForAddTask} className="popup-modal-content" overlayClassName="popup-modal" onRequestClose={() => this.setState({ modelIsOpenForAddTask: false })}>
        <span class="closed" type="button" style={{ fontSize: "32px", position: "absolute", zIndex: "1", right: "3%", height: "6.7vh", lineHeight: "6.7vh" }} onClick={() => this.setState({ modelIsOpenForAddTask: false })}>&times;</span>                    
        <div className="card" >
                  <div className="card-header text-center">
                    <div>Add New Task</div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.AddTask}>
                      <div className="row">
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <input defaultValue={this.state.title} type="text" name="title" ref={(val) => this.title = val} className="form-control" placeholder="title" required />
                          </div>
                        </div>
                        <div className="col-6 ">
                          <div className="input-group mb-3">
                            <input defaultValue={this.state.date} type="date" name="date" ref={(val) => this.date = val} className="form-control" placeholder="Date" required />
                          </div>
                        </div>
                      </div>
                      <div className="input-group mb-3">
                      <ImageUploader
                          withIcon={false}
                          withPreview={true} required
                          buttonText="Upload Images"
                          onChange={this.ondrop}
                          imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg", ".jfif"]}
                          maxFileSize={5242880}
                          fileSizeError=" file size is too big"
                      ></ImageUploader>
                      </div>
                      <div className="row d-flex justify-content-around">
                        <button type="submit" className="btn btn-primary col-5">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
        </Modal>

        <Modal isOpen={this.state.modelIsOpenForEdit} className="popup-modal-content" overlayClassName="popup-modal" onRequestClose={() => this.setState({ modelIsOpenForEdit: false })}>
        <span class="closed" type="button" style={{ fontSize: "32px", position: "absolute", zIndex: "1", right: "3%", height: "6.7vh", lineHeight: "6.7vh" }} onClick={() => this.setState({ modelIsOpenForEdit: false })}>&times;</span>                    
        <div className="card" >
                  <div className="card-header text-center">
                    <div>Create New User</div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.EditUser}>
                      <div className="row">
                        <div className="col-6">
                          <div className="input-group mb-3">
                            <input defaultValue={this.state.first_name} type="text" name="first_name" ref={(val) => this.first_name = val} className="form-control" placeholder="First Name" required />
                          </div>
                        </div>
                        <div className="col-6 ">
                          <div className="input-group mb-3">
                            <input defaultValue={this.state.last_name} type="text" name="last_name" ref={(val) => this.last_name = val} className="form-control" placeholder="Last Name" required />
                          </div>
                        </div>
                      </div>
                      <div className="input-group mb-3">
                            <input defaultValue={this.state.email} type="email" name="email" ref={(val) => this.email = val} className="form-control" placeholder="Email" required />
                          </div>
                      <div className="input-group mb-3">
                        <input defaultValue={this.state.address} type="text" name="address" ref={(val) => this.address = val} className="form-control" placeholder="Address" required />
                      </div>
                      <div className="row d-flex justify-content-around">
                        <button type="submit" className="btn btn-primary col-5">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
        </Modal>

        <Modal isOpen={this.state.modelIsOpenForComplete} className="popup-modal-content" overlayClassName="popup-modal" onRequestClose={() => this.setState({ modelIsOpenForComplete: false })}>
        <span class="closed" type="button" style={{ fontSize: "32px", position: "absolute", zIndex: "1", right: "3%", height: "6.7vh", lineHeight: "6.7vh" }} onClick={() => this.setState({ modelIsOpenForComplete: false })}>&times;</span>                    
        <div className="card" >
                  <div className="card-header text-center">
                    <div>Are you sure ?</div>
                  </div>
                  <div className="card-body text-center">
                    <button onClick={()=>this.DeleteUser()} className="btn btn-danger col-5" >Submit</button>
                  </div>
                </div>
        </Modal>

        <Modal isOpen={this.state.modelIsOpenForResponse} className="popup-modal-content" overlayClassName="popup-modal" onRequestClose={() => this.setState({ modelIsOpenForResponse: false })}>
        <div className="card" >
                  <div className="card-header text-center">
                    <div>{this.state.response}</div>
                  </div>
                  <div className="card-body text-center">
                    <button className="btn btn-danger col-5" onClick={()=>{this.setState({modelIsOpenForResponse:false});window.location.reload();}}>OK</button>
                  </div>
                </div>
        </Modal>
      </>
    );
      
  }
}