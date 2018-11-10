import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Register(props) {
  let curTask = props.cur_task;
  return <div className="row">
    <div className="form">
      Full Name <input id="new-user-name" className="form-control" type="text" />
      Email <input id="new-user-email" className="form-control" type="email" />
      Password <input id="new-user-password" className="form-control" type="password" />
      <Link to="/" onClick={() => { api.create_user();}} id="register-button" className="btn btn-primary">Register</Link>
    </div>
  </div>
}

export default connect((state) => {return {users: state.users, session: state.session};})(Register);