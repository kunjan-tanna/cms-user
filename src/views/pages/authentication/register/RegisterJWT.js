import React from "react";
import { Form, FormGroup, Input, Label, Button, CustomInput } from "reactstrap";
import * as RegActions from "../../../../redux/actions/auth/registerActions";
import { history } from "../../../../history";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../assets/scss/plugins/extensions/toastr.scss";

class RegisterJWT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
    console.log("ROLEEE", this.props);
  }

  //handleInput
  handleInput = (event) => {
    event.persist();
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [event.target.name]: event.target.value,
      },
    }));
  };

  //handleRadio
  handleRadio = (event) => {
    event.persist();
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [event.target.name]: event.target.value,
      },
    }));
  };

  //handle avatar
  handleavtar = (event) => {
    event.persist();
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [event.target.name]: event.target.files[0],
      },
    }));
  };
  //Handle submit
  handleFormSubmit = () => {
    this.props
      .dispatch(RegActions.RegUsers(this.state.formData))
      .then((res) => {
        console.log("Register Res", res);

        if (!res.data) {
          //Add success message in Toast
          // console.log("ERROR");
          toast.error("Register is not Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          // console.log("Sucess");
          toast.success("Register Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            history.push("/pages/login");
          }, 3000);
        }
      })
      .catch((error) => {
        // show error message in Toast
        toast.error("Register is not Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  render() {
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.handleFormSubmit();
        }}
      >
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={this.handleInput}
            required
          />
          <Label>First Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={this.handleInput}
            required
          />
          <Label>Last Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={this.handleInput}
            required
          />
          <Label>Email</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleInput}
            required
          />
          <Label>Password</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <CustomInput
            type="file"
            id="avtar"
            name="avtar"
            onChange={this.handleavtar}
          />
          <Label>Avtar</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="textarea"
            placeholder="Address"
            name="address"
            onChange={this.handleInput}
          />
          <Label>Address</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="Number"
            placeholder="Phone No."
            name="mobile"
            onChange={this.handleInput}
          />
          <Label>Phone No</Label>
        </FormGroup>
        <Label>Gender</Label> <br />
        <FormGroup style={{ padding: "10px" }} check inline>
          <Label check>
            <Input
              type="radio"
              name="gender"
              value="male"
              onChange={this.handleRadio}
            />{" "}
            Male
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input
              type="radio"
              name="gender"
              value="female"
              onChange={this.handleRadio}
            />{" "}
            Female
          </Label>
        </FormGroup>
        <div className="d-flex justify-content-between">
          {/* <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push("/pages/login")
            }}
          >
            Login
          </Button.Ripple> */}
          <Button.Ripple color="primary" type="submit">
            Register
          </Button.Ripple>
          <ToastContainer />
        </div>
      </Form>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }; // ← Add this
};
export default connect(null, mapDispatchToProps)(RegisterJWT);
