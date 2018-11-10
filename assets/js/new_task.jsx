import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import api from './api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function NewTask(props) {
  return <div className="row">
    <p className="form">
      Title <input className="form-control" id="new-title" type="text" />
      Description<input className="form-control" id="new-desc" type="text" />
      Assign To 
      <select id="assign-to">
        {props.users.map((u, val) => {
          return <option key={val} value={u.id}>{u.name}</option>;
        })}
      </select>

      <Link to="/" id="new-task-button" className="btn btn-primary" onClick={() => { api.create_task(props.session.token); api.fetch_tasks();}}>Create Task</Link>
    </p>
  </div>;
}

export default connect((state) => {return {users: state.users, session: state.session};})(NewTask);