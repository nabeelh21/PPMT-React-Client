import React, { Component } from "react";
import { getUser, updateUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class ChangePassword extends Component {
  //set state
  constructor() {
    super();

    this.state = {
      id: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      create_At: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { id, username, fullName, create_At } = nextProps.user;

    this.setState({
      id,
      username,
      fullName,
      create_At,
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateUser = {
      id: this.state.id,
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      create_At: this.state.create_At,
    };
    this.props.updateUser(updateUser, this.props.history);
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.getUser(username, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Change Password</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Username"
                    name="username"
                    autoComplete="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.fullName,
                    })}
                    placeholder="Full Name"
                    name="fullName"
                    autoComplete="name"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    autoComplete="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Confirm New Password:</label>
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.confirmPassword,
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    autoComplete="password"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.user.user,
});

export default connect(mapStateToProps, { getUser, updateUser })(
  ChangePassword
);
