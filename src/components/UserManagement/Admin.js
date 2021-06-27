import React, { Component } from "react";
import { getUsers, adminDeleteUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Admin extends Component {
  onDeleteClick(username) {
    this.props.adminDeleteUser(username);
  }

  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const { users } = this.props.users;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Manage Users</h1>
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Account Created</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.fullName}</td>
                    <td>{user.create_At}</td>
                    <td>
                      <Link to={"/admin"}>
                        <i
                          onClick={this.onDeleteClick.bind(this, user.username)}
                          className="fa fa-minus-circle pr-1"
                        >
                          {" "}
                          Delete User
                        </i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.user,
});

export default connect(mapStateToProps, { getUsers, adminDeleteUser })(Admin);
