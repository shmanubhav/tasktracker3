import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

function UserList(props) {
  if (props.session == null) {
    return <div><p>Login to view your tasks.</p></div>;
  } else {
    let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
    return <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>;
  }
}

function User(props) {
  let { user } = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.name}</td>
  </tr>;
}

export default connect((state) => {return {users: state.users, session: state.session};})(UserList);