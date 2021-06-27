import React, { Component } from "react";
import { getUser } from "../../actions/userActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateUser extends Component {
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
      update_At: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      username,
      fullName,
      password,
      confirmPassword,
      create_At,
    } = nextProps.user;

    this.setState({
      id,
      username,
      fullName,
      password,
      confirmPassword,
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
    };

    this.props.createUser(updateUser, this.props.history);
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
              <h5 className="display-4 text-center">Update User Info</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Username"
                    name="username"
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
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label>Account Creation Date:</label>
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Account Created"
                    name="create_At"
                    value={this.state.create_At}
                    onChange={this.onChange}
                    disabled
                  />
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

UpdateUser.propTypes = {
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { getUser })(UpdateUser);
