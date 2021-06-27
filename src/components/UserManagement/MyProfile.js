import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, getUser } from "../../actions/userActions";
import { logout } from "../../actions/securityActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class MyProfile extends Component {
  //set state
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      create_At: "",
    };
  }

  onDeleteClick(username) {
    if (
      window.confirm(
        "Are you sure? This will delete your account and all your data!"
      )
    ) {
      this.props.deleteUser(username);
      this.logout();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { username, fullName, create_At } = nextProps.user;

    this.setState({
      username,
      fullName,
      create_At,
    });
  }

  componentDidMount() {
    const { user } = this.props.security;
    this.props.getUser(user.username, this.props.history);
  }

  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">My Profile</h5>
            <hr />
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="Username"
                name="username"
                value={this.state.username}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="Full Name"
                name="fullName"
                value={this.state.fullName}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Account Created On:</label>
              <input
                type="date"
                className="form-control form-control-lg "
                placeholder="Created On"
                name="create_At"
                value={this.state.create_At}
                disabled
              />
            </div>
            <Link to={`/changePassword/${this.state.username}`}>
              <button>
                <i className="fa fa-edit pr-1"> Change Password</i>
              </button>
            </Link>{" "}
            <button
              onClick={this.onDeleteClick.bind(this, this.state.username)}
            >
              <i className="fa fa-minus-circle pr-1"> Delete My Account</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MyProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  user: state.user.user,
});

export default connect(mapStateToProps, { deleteUser, logout, getUser })(
  MyProfile
);
