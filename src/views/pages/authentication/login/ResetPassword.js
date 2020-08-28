import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
} from "reactstrap";
import fgImg from "../../../../assets/img/pages/forgot-password.png";
import { history } from "../../../../history";
import "../../../../assets/scss/pages/authentication.scss";
import { connect } from "react-redux";
import { resetPass } from "../../../../redux/actions/auth/resetPassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../assets/scss/plugins/extensions/toastr.scss";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPass: "",
      userInfo: this.props.userInfo,
    };
  }
  //handleInput
  handleInput = (event) => {
    event.persist();
    this.setState(
      (prevState) => ({
        newPass: {
          ...prevState.newPass,
          [event.target.name]: event.target.value,
        },
      }),
      () => console.log("Name Input", event.target.value)
    );
  };
  //Handle Form Submit
  handleFormSubmit = (resetLink) => {
    // console.log("ResetLink---------", resetLink);
    // console.log("FORMDATA===", this.state.newPass);
    const obj = {
      resetLink: resetLink,
      newPass: this.state.newPass.password,
    };

    this.props
      .dispatch(resetPass(obj))
      .then((res) => {
        // console.log('RRRRRR',res)
        if (res.data) {
          // Add success message in Toast
          toast.success("Your Password hab been Changed", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            history.push("/pages/login");
          }, 3000);
        } else {
          // show error message in Toast
          toast.error("USER with a ResetLink does not exists", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((error) => {
        // show error message in Toast
        toast.error("USER with a ResetLink does not exists", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setTimeout(() => {
          history.push("/pages/forgot-password");
        }, 3000);
      });
  };
  render() {
    const search = this.props.location.search;
    const resetLink = search.split("=")[1];
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center"
              >
                <img src={fgImg} alt="fgImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-1">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Recover your password</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    Please enter your <strong>New Password</strong>
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        this.handleFormSubmit(resetLink);
                      }}
                    >
                      <FormGroup className="form-label-group">
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          //value={this.state.newPass}
                          onChange={this.handleInput}
                        />

                        <Label>Password</Label>
                      </FormGroup>
                      <div className="float-md-center d-block mb-1">
                        <Button.Ripple
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                          //   onClick={e => {
                          //     e.preventDefault()
                          //     history.push("/dashboard")
                          //   }}
                        >
                          Recover Password
                        </Button.Ripple>
                        <ToastContainer />
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(ResetPassword);
