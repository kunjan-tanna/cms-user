import React from "react";
import { Card, CardBody, Row, Col, CardHeader, CardTitle } from "reactstrap";
import { Button, Form, Input, Label, FormGroup, CustomInput } from "reactstrap";
import * as localActions from "../../../redux/actions/posts/index";
import * as globalActions from "../../../redux/actions/categories/index";
import * as tagActions from "../../../redux/actions/tags/index";
import { connect } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import Select from "react-select";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { history } from "../../../history";
import chroma from "chroma-js";
import axios from "../../../configs/axiosConfig";
import moment from "moment";

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color ? chroma(data.color) : "#7367f0";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : "#7367f0"),
      },
    };
  },
};

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tags: [],
      date: new Date().toLocaleDateString(),
      formData: {},
      userdata: this.props.userInfo,
      erroMsg: false,
    };
    console.log("Dateee-------------", this.state.date);
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
      () => console.log("Name Input", this.state.formData)
    );
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
    //()=>console.log('-------FILE--',event.target.files[0])
  };

  //handle CKEditor
  handleCKEditor = (event, editor, name) => {
    console.log("event", event);
    const data = editor.getData();
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          content: data,
        },
      }),
      console.log("Content", this.state.formData)
    );
  };

  //handle select
  handleSelect = (name, data) => {
    //  console.log('categories',typeof(data))
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: data.value,
      },
    }));
  };

  handleCreatableSelectTags = (name, data) => {
    // console.log('DATA',typeof([name]))
    const tags = data && data.map((item) => item.value);
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: tags,
      },
    }));
  };

  //Handle Form Submit
  handleFormSubmit = () => {
    this.props
      .dispatch(localActions.addPost(this.state.formData))
      .then((res) => {
        console.log("ADD POST Data", res);
        if (res.data) {
          // Add success message in Toast
          toast.success("Add Post Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            history.push("/blog");
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
    this.props.dispatch(globalActions.getCategory());
    this.props.dispatch(tagActions.getTag());
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        ["authorBy"]: this.state.userdata._id,
        ["publishedAt"]: this.state.date,
      },
    }));
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const updatedObject = {};

    // category
    if (
      nextProps.categories &&
      nextProps.categories.length &&
      nextProps.categories !== prevState.categories
    ) {
      const categories = nextProps.categories.map((item) => {
        return {
          label: item.categoryName,
          value: item._id,
          color: "#7367f0",
        };
      });
      // console.log('nextprops',nextProps.categories)
      Object.assign(updatedObject, { categories: categories });
    }
    // Tags
    if (
      nextProps.tags &&
      nextProps.tags.length &&
      nextProps.tags !== prevState.tags
    ) {
      const tags = nextProps.tags.map((item) => {
        return {
          label: item.tagName,
          value: item._id,
          //color: '#7367f0'
        };
      });
      // console.log('----nexProps.tag',typeof(nextProps.tags))
      Object.assign(updatedObject, { tags: tags });
    }
    return Object.keys(updatedObject).length !== 0 ? updatedObject : null;
  }

  //handle Reset
  handleReset = () => {
    this.setState({ formData: {} });
  };

  render() {
    const fname = this.state.userdata.firstName;
    const lname = this.state.userdata.lastName;
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Add Blog</CardTitle>
            </CardHeader>
            <CardBody style={{ height: "1000px" }}>
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
                        <Label for="title">Title</Label>
                        <Input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Title Name"
                          onChange={this.handleInput}
                          //value={this.state.formData && this.state.formData.?this.state.formData.tagName:''}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                          //value={this.state.formData && this.state.formData.message?this.state.formData.message:''}
                          type="textarea"
                          name="description"
                          id="description"
                          rows="3"
                          cols="3"
                          required
                          placeholder="Message"
                          onChange={this.handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="content">Content</Label>
                        <CKEditor
                          editor={ClassicEditor}
                          onInit={(editor) => {
                            //Inialize our app
                          }}
                          onChange={this.handleCKEditor}
                          // config={{
                          //   simpleUpload: {
                          //     uploadUrl: 'http://127.0.0.1/my-upload-endpoint'
                          // }
                          // }}
                          cloudServices={{
                            tokenUrl: "https://example.com/cs-token-endpoint",
                            uploadUrl:
                              "https://your-organization-id.cke-cs.com/easyimage/upload/",
                          }}
                          toolbar={"imageUpload"}
                        />
                        {/* {console.log('DATATATTA',ReactHtmlParser(this.state.data))} */}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="publishedAt">PublishedAt</Label>
                        <Input
                          //value={this.state.formData && this.state.formData.message?this.state.formData.message:''}
                          type="date"
                          name="publishedAt"
                          id="publishedAt"
                          disabled
                          defaultValue={
                            moment(this.state.date).format("YYYY-MM-DD")
                              ? moment(this.state.date).format("YYYY-MM-DD")
                              : ""
                          }
                          placeholder="PublishAt"
                          // onChange={this.handleInput}
                        />
                      </FormGroup>
                    </Col>

                    <Col sm="12">
                      <FormGroup>
                        <Label for="image">Image</Label>
                        <CustomInput
                          type="file"
                          id="image"
                          name="image"
                          onChange={this.handleavtar}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="Categories">Categories</Label>
                        <Select
                          isClearable={false}
                          styles={colourStyles}
                          options={this.state.categories}
                          className="React"
                          classNamePrefix="select"
                          id="categoryId"
                          name="categoryId"
                          onChange={(data) =>
                            this.handleSelect("categoryId", data)
                          }
                        />
                        {/* {console.log('hdhdhdhhd',this.state.categories)} */}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="Tags">Tags</Label>
                        <CreatableSelect
                          isMulti
                          isClearable={true}
                          options={this.state.tags}
                          className="React"
                          classNamePrefix="select"
                          id="tagId"
                          required
                          name="tagId"
                          onChange={(data) =>
                            this.handleCreatableSelectTags("tagId", data)
                          }
                          //onChange={this.handleChange}
                        />
                        {/* {console.log('tags',this.state.tags)} */}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="authorName">Author By</Label>
                        <Input
                          type="disabled"
                          disabled
                          value={fname + " " + lname}
                          id="authorBy"
                          name="authorBy"

                          //onChange={this.handleInput}
                          //   value={this.state.formData && this.state.formData.categoryName?this.state.formData.categoryName:''}
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
                        Add Post
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
  return {
    categories: state.global.categories,
    tags: state.global.tags,
    userInfo: state.auth.login.userInfo,
  };
};
export default connect(mapStateToProps)(AddPost);
