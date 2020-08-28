import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { Button, Form, Input, Label, FormGroup, CustomInput } from "reactstrap";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      erroMsg: false,
    };
    // console.log('PROPS',this.props)
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

  //Handle Form Submit
  handleFormSubmit = () => {
    //
    // console.log('FORMDATA===',this.state.formData)
    if (this.state.formData.categoryName) {
      // console.log(this.props.addData)
      this.props.addData(this.state.formData);
      //close the model
      this.props.toggleModal();
    } else {
      this.setState({ erroMsg: true });
      // show error message in Toast
      toast.error("Please fill the Category Name", {
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
                        <Label for="categoryName">Category Name</Label>
                        <Input
                          type="text"
                          id="categoryName"
                          name="categoryName"
                          placeholder="Category Name"
                          onChange={this.handleInput}
                          value={
                            this.state.formData &&
                            this.state.formData.categoryName
                              ? this.state.formData.categoryName
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
                        Add Category
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
export default connect(mapStateToProps)(AddCategory);
