import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  Media,
} from "reactstrap";
import { Button, Form, Input, Label, FormGroup, CustomInput } from "reactstrap";
import * as localActions from "../../../redux/actions/posts/index";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import * as globalActions from "../../../redux/actions/categories/index";
import * as tagActions from "../../../redux/actions/tags/index";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import moment from "moment";
import chroma from "chroma-js";
import * as IMG from "../../../configs/ImgConfig";
import { history } from "../../../history";

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
class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.postId
          ? this.props.location.state.postId // you will get the edit Id here
          : "",
      commentId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.commentId
          ? this.props.location.state.postId // you will get the edit Id here
          : "",
      formData: {},
      userdata: this.props.userInfo,
      categories: [],
      tags: [],
      checked: true,
      erroMsg: false,
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
  //handle checked
  onCheckChange = (e) => {
    e.persist();
    console.log("---checked switch", typeof e.target.checked);
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [e.target.name]: e.target.checked,
        },
      }),
      () => console.log("-------SWITCH FORMDATA--", e.target.name)
    );
  };
  // //handle CKEditor
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
      () => console.log("Name content", this.state.formData)
    );
  };
  //handle select
  handleSelect = (name, data) => {
    //  console.log('categories',typeof(data))
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: data.value,
        },
      }),
      () => {
        console.log("---HANDLE--", this.state.formData, name, data.value);
      }
    );
  };
  handleChange = (tag, newValue) => {
    console.log(newValue);
    const tags = newValue && newValue.map((item) => item.value);
    this.setState({ value: newValue });
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [tag]: tags,
        },
      }),
      () => {
        console.log(
          "---TAGS UPDATES--",
          this.state.formData,
          tag,
          newValue,
          tags
        );
      }
    );
    //()=>{console.log("---TAGS UPDATES--",this.state.formData,tag,newValue,tags)}
    //console.log(`action: ${actionMeta.action}`);
  };
  //Handle Form Submit
  handleFormSubmit = () => {
    let objId = this.state.postId;
    this.props
      .dispatch(localActions.updatePost(objId, this.state.formData))
      .then((res) => {
        console.log("Update Data POST", res);
        if (res.data) {
          // Add success message in Toast
          toast.success("Update Post Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setTimeout(() => {
            history.push("/post");
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
    this.props
      .dispatch(localActions.getPostId(this.state.postId))
      .then((res) => {
        console.log("BY Id", res);
        if (res) {
          this.setState({ formData: res.data }); //() => {console.log();}
          this.addTag();
        }
      });
  }
  addTag = () => {
    {
      console.log("----this.value", this.state.formData.tagId);
    }
    // {console.log('----this.tags',this.state.tags)}
    let tags = [];
    //let key = 1;
    this.state.tags.map((x) => {
      this.state.formData.tagId.map((y) => {
        // console.log("------------",this.state.formData.tag)
        if (y == x.value) {
          tags.push(x);
        }
      });
    });
    // tags.map(tag => {
    //   tag.key = key;
    // })
    // console.log('yaaaaayy',tags)
    this.setState({
      value: tags,
    });
    // this.setState = ({
    //   value : [...this.state.value, tags]
    // })
  };
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
    // const fname = this.state.formData.authorBy.firstName
    // console.log(fname)
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Update Post</CardTitle>
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
                          value={
                            this.state.formData && this.state.formData.title
                              ? this.state.formData.title
                              : ""
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                          value={
                            this.state.formData &&
                            this.state.formData.description
                              ? this.state.formData.description
                              : ""
                          }
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
                        {/* <Input
                        //value={this.state.formData && this.state.formData.message?this.state.formData.message:''}
                        type="textarea"
                        name="content"
                        id="content"
                        rows="3"
                        cols="3"
                        required
                        placeholder="Message"
                        onChange={this.handleInput}
                        /> */}
                        <CKEditor
                          editor={ClassicEditor}
                          data={
                            this.state.formData && this.state.formData.content
                              ? this.state.formData.content
                              : ""
                          }
                          //name="content"

                          onChange={this.handleCKEditor}
                        />
                        {/* {console.log('DATATATTA',ReactHtmlParser(this.state.data))} */}
                      </FormGroup>
                    </Col>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="publishedAt">PublishedAt</Label>
                        <Input
                          value={
                            this.state.formData &&
                            moment(this.state.formData.publishedAt).format(
                              "YYYY-MM-DD"
                            )
                              ? moment(this.state.formData.publishedAt).format(
                                  "YYYY-MM-DD"
                                )
                              : ""
                          }
                          type="date"
                          name="publishedAt"
                          id="publishedAt"
                          disabled
                          placeholder="PublishAt"
                          onChange={this.handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-0" sm="12">
                      <Media className="d-sm-flex d-block">
                        <Media className="mt-md-1 mt-0" left>
                          <Media
                            className="rounded mr-2"
                            src={
                              IMG.default.baseURL +
                              "/" +
                              this.state.formData.image
                            }
                            alt="Please Upload image"
                            height="112"
                            width="112"
                          />
                        </Media>
                        <Media body>
                          <div className="mt-4">
                            <CustomInput
                              accept="image/*"
                              src={this.state.formData.image}
                              type="file"
                              id="image"
                              name="image"
                              onChange={this.handleavtar}
                            />
                            {/* {console.log('Image',this.state.formData.image)} */}
                          </div>
                        </Media>
                      </Media>
                    </Col>
                    {/* <Col sm="12">
                    <FormGroup>
                        
                        <Media
                          className="rounded mr-2"
                          object
                          src={IMG.default.baseURL+'/'+this.state.formData.image}
                          alt="Generic placeholder image"
                          height="112"
                          width="112"
                        />
                         <Media body>
                         <CustomInput
                          type="file"
                          id="image"
                          name="image"
                          onChange={this.handleavtar}
                        />
                         </Media>
                        
                      </FormGroup>
                    </Col> */}
                    <Col sm="12">
                      <FormGroup>
                        <Label for="Categories">Categories</Label>
                        <Select
                          isClearable={false}
                          styles={colourStyles}
                          value={
                            this.state.categories &&
                            this.state.categories.filter(
                              (item) =>
                                item.value === this.state.formData.categoryId
                            )
                          }
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
                          //key={this.addTag}
                          onChange={(newValue) =>
                            this.handleChange("tagId", newValue)
                          }
                          options={this.state.tags}
                          value={this.state.value}
                          name="tagId"
                        />
                        {/* {console.log('tags',this.state.tags)} */}
                      </FormGroup>
                    </Col>
                    {/* <Col sm="12">
                      <FormGroup>
                        <Label for="Status">Status</Label> <br />
                        <CustomInput
                          type="switch"
                          id="status"
                          name="status"
                          checked={
                            this.state.formData && this.state.formData.status
                              ? this.state.formData.status
                              : ""
                          }
                          onChange={this.onCheckChange}
                        />
                      </FormGroup>
                    </Col> */}
                    {/* <Col sm="12">
                      <FormGroup>
                        <Label for="authorName">Author By</Label>
                        <Input
                          type="disabled"
                          disabled
                          //value={fname + " " + lname}
                          id="authorBy"
                          name="authorBy"

                          //onChange={this.handleInput}
                          //   value={this.state.formData && this.state.formData.categoryName?this.state.formData.categoryName:''}
                        />
                      </FormGroup>
                    </Col> */}
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
                        Update Post
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
export default connect(mapStateToProps)(EditPost);
