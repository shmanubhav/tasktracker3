import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import api from './api';
import { pipeline } from 'stream';

function TaskList(props) {
  if (props.session == null) {
    return <div><p>Login to view your tasks.</p></div>;
  } else {
    let {tasks, session} = props;
    let taskslist = _.map(tasks, (tt) =>
      <Task key={tt.id} session={session}
            task={tt} />
    );
    return <div className="row">
      {taskslist}
      <Link to={"/new_task"} className="btn btn-primary">Create Task</Link>
    </div>;
    }
}

function Task(props) {
  let {task} = props;

  return <div className="card col-4">
    <div className="card-body">
      <Link className="card-title" to={"/edit_task/"+task.id} onClick={() => {api.get_task(task.id, props.session.token)}}>{task.title}</Link>
      <p className="card-text">
        {task.desc}<br />
        {task.duration * 15} minutes<br />
        {task.completed ? "✓" : "❌"}<br />
        {task.user_id}
      </p>
      <button className="btn btn-danger" onClick={() => { api.delete_task(task.id, props.session.token)}}>Delete</button>
    </div>
  </div>
}

export default connect((state) => {return {tasks: state.tasks, session: state.session};})(TaskList);