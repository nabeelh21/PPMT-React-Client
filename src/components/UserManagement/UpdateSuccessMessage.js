import React, { Component } from "react";
import { getUser } from "../../actions/userActions";
import { connect } from "react-redux";

class UpdateSuccessMessage extends Component {
  render() {
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className=" text-center">Password Successfully Updated</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps, { getUser })(UpdateSuccessMessage);
