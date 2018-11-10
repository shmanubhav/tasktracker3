import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import $ from 'jquery';
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import api from './api';
import UserList from './user_list';
import TaskList from './task_list';
import Header from './header';
import EditTask from './edit_task';
import NewTask from './new_task';
import register from './register';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <TaskList />
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
              <Route path="/new_task" exact={true} render={() =>
                <NewTask />
              } />
              <Route path="/edit_task/:id" exact={true} render={() =>
                <EditTask />
              } />
              <Route path="/register" exact={true} render={() =>
                <Register />
              } />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}