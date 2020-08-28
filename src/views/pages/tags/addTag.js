import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { Button, Form, Input, Label, FormGroup, CustomInput } from "reactstrap";
import * as localActions from "../../../redux/actions/categories/index";
import { connect } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";

class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      erroMsg: false,
    };
    console.log("PROPS", this.props);
  }
  //
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
    //
    console.log("FORMDATA===", this.state.formData);
    if (this.state.formData.tagName) {
      // console.log(this.props.addData)
      this.props.addTagData(this.state.formData);
      //close the model
      this.props.toggleModal();
    } else {
      this.setState({ erroMsg: true });
      // show error message in Toast
      toast.error("Please fill the Tag Name", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  //handle Reset
  handleReset = () => {
    this.setState({ formData: {} });
  };
  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
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
                          placeholder="Category Name"
                          onChange={this.handleInput}
                          value={
                            this.state.formData && this.state.formData.tagName
                              ? this.state.formData.tagName
                              : ""
                          }
                        />
                        {/* <CreatableSelect
                              isMulti
                              isClearable={true}
                              //options={this.state.tags}
                              className="React"
                              classNamePrefix="select"
                              id="tagName"
                              name="tagName"
                              onChange={(data) =>
                                this.handleCreatableSelectTags('tagName', data)
                              }
                              //onChange={this.handleChange}                             
                            /> */}
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
                        Add Tag
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
export default connect(mapStateToProps)(AddTag);
