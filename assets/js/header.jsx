import React from 'react';
import _ from 'lodash';
import api from './api';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

function curLogin() {
  let email = $("#email").val();
  let pass = $("#password").val();
  api.create_session(email, pass);
}

function Header(props) {
  let head = null;
  if (props.session) {
    head = <div className="form-inline my-2">
      <p>{props.session.user_name} |   </p><button onClick={() => api.delete_session()} className="btn btn-primary">Logout</button>
    </div>;
  } else {
    head = <div className="form-inline my-2">
    <input type="email" placeholder="email" id="email" />
    <input type="password" placeholder="password" id="password" />
    <button className="btn btn-primary" onClick={curLogin}>Login</button>
    <Link to="/register" className="btn btn-secondary">Register</Link>
    </div>;
  }
  return <div className="row my-2">
    <div className="col-4">
      <h1><Link to={"/"} onClick={() => api.fetch_tasks()}>Task Tracker</Link></h1>
    </div>
    <div className="col-2">
      <p><Link to={"/users"} onClick={() => api.fetch_users()}>Users</Link></p>
    </div>
    <div className="col-6">
      {head}
    </div>
  </div>;
}

export default connect((state) => {return {session: state.session};})(Header);