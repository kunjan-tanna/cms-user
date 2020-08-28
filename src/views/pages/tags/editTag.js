import React from "react";
import { Card, CardBody, Row, Col, CardHeader, CardTitle } from "reactstrap";
import { Button, Form, Input, Label, FormGroup, CustomInput } from "reactstrap";
import * as localActions from "../../../redux/actions/tags/index";
import { connect } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import { history } from "../../../history";

class EditTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.tagId
          ? this.props.location.state.tagId // you will get the edit Id here
          : "",
      formData: {},
      erroMsg: false,
      value: [],
    };
    console.log("PROPS", this.props);
  }
  //handleInput
  handleInput = (event) => {
    event.persist();
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [event.target.name]: event.target.value,
        },
      }),
      () => console.log("Name Input", event.target.value)
    );
  };
  //Handle Form Submit
  handleFormSubmit = () => {
    let objId = this.state.tagId;
    this.props
      .dispatch(localActions.updateTag(objId, this.state.formData))
      .then((res) => {
        //  console.log('Update Data',res)
        if (res.data) {
          // Add success message in Toast
          toast.success("Update Tag Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            history.push("/tag");
          }, 3000);
        } else {
          // show error message in Toast
          toast.error("Something went wrong", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((error) => {
        // show error message in Toast
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  componentDidMount() {
    this.props
      .dispatch(localActions.getTagById(this.state.tagId))
      .then((res) => {
        console.log("BY Id", res);
        if (res) {
          this.setState({ formData: res.data }); //() => {console.log();}
        }
      });
  }

  //handle Reset
  handleReset = () => {
    this.setState({ formData: {} });
  };
  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Update Tag</CardTitle>
            </CardHeader>
            <CardBody className="pt-2">
              <Col sm="12">
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.handleFormSubmit();
                  }}
                >
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="tagName">Tag Name</Label>
                        <Input
                          type="text"
                          id="tagName"
                          name="tagName"
                          placeholder="Tag Name"
                          onChange={this.handleInput}
                          value={
                            this.state.formData && this.state.formData.tagName
                              ? this.state.formData.tagName
                              : ""
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col
                      className="d-flex justify-content-end flex-wrap mt-2"
                      sm="12"
                    >
                      <Button.Ripple
                        className="mr-1"
                        color="primary"
                        type="submit"
                        //onClick={this.props.leadId}
                      >
                        Update Category
                      </Button.Ripple>
                      <ToastContainer />
                      <Button.Ripple
                        color="flat-warning"
                        onClick={() => this.handleReset()}
                        type="button"
                      >
                        Reset
                      </Button.Ripple>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(EditTag);
