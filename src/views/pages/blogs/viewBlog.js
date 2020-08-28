import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Row,
  Col,
  Input,
  FormGroup,
  Form,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import classnames from "classnames";
import * as Icon from "react-feather";
import * as localActions from "../../../redux/actions/posts/index";
import * as commActions from "../../../redux/actions/comments/index";
import * as rpcommActions from "../../../redux/actions/rpcomment/index";
import * as globalActions from "../../../redux/actions/categories/index";
import * as likeActions from "../../../redux/actions/likes/index";
import * as tagActions from "../../../redux/actions/tags/index";
import AddComment from "../comments/addComment";
import AddrpComment from "../comments/rpComment";
import { connect } from "react-redux";
import { history } from "../../../history";
import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import { toast } from "react-toastify";
import * as IMG from "../../../configs/ImgConfig";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/pages/users.scss";
import "../../../assets/scss/plugins/extensions/toastr.scss";

class ViewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.postId
          ? this.props.location.state.postId // you will get the edit Id here
          : "",

      categories: [],
      tags: [],
      likeData: [],
      data: [],
      rpData: {},
      userdata: this.props.userInfo,
      showModal: false,
      rowData: [],
      liked: false,
      data: {},
      selectedOption: [],
    };
    console.log("--this.props.commentId--", this.props);
  }
  componentDidMount() {
    this.props.dispatch(globalActions.getCategory());
    this.props.dispatch(tagActions.getTag());
    this.props
      .dispatch(localActions.getPostId(this.state.postId))
      .then((res) => {
        // console.log('BY ID DATA',res.data)
        this.setState({ selectedOption: res.data });
        this.addTag();
      });

    this.props.dispatch(commActions.getCommit()).then((res) => {
      // console.log('componene',res)
      let rowData = res.data.filter((item) => {
        // console.log('ITEEMMMS',item)
        if (item.postId === this.state.postId) {
          return item;
        }
      });
      // console.log('rowData-----',rowData)
      this.setState({ rowData });
    });
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

  addTag = () => {
    // {console.log('----this.value',this.state.selectedOption.tagId)}
    // {console.log('----this.tags',this.state.tags)}
    let tags = [];
    //let key = 1;
    this.state.tags.map((x) => {
      this.state.selectedOption.tagId.map((y) => {
        // console.log("------------",this.state.selectedOption.tagId)
        if (y == x.value) {
          tags.push(x);
        }
      });
    });
    this.setState({
      value: tags,
    });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  //handleInput
  handleInput = (event) => {
    event.persist();
    this.setState((prevState) => ({
      rpData: {
        ...prevState.rpData,
        [event.target.name]: event.target.value,
      },
    }));
  };

  replyComment = () => {
    const Adata =
      this.state.rowData && this.state.rowData.map((item) => item._id);
    console.log("CommentIds", Adata);
    const obj = {
      userId: this.state.userdata._id,
      rpcommentName: this.state.rpData.rpcommentName,
      postId: this.state.postId,
      commentId: Adata,
    };
    this.props
      .dispatch(rpcommActions.addrpCommit(obj))
      .then((res) => {
        console.log("RRRRRR", res);

        if (res.data) {
          // //To get all comments
          this.props.dispatch(rpcommActions.getrpCommit()).then((res) => {
            // console.log("get data-----------", res);

            let data = res.data.filter((item) => {
              console.log("ITEEMMMS", item.commentId);
              console.log("Comment ID", this.state.rowData._id);
              if (item.postId === this.state.postId) {
                if (item.commentId == Adata) {
                  return item;
                }
              }
            });
            console.log("ROW data+++++++++++++++", data);
            this.setState({ data });
          });
        } else {
          // // show error message in Toast
          toast.error("Add Catetgory isn't Successfully", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((error) => {
        //   // show error message in Toast
        toast.error("Add Comments isn't Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  //Add Comment
  addComment = (info) => {
    this.props
      .dispatch(commActions.addCommit(info))
      .then((res) => {
        // console.log('RRRRRR',res)

        if (res.data) {
          //To get all comments
          this.props.dispatch(commActions.getCommit()).then((res) => {
            // console.log('get data-----------',res)
            let rowData = res.data.filter((item) => {
              // console.log('ITEEMMMS',item)
              if (item.postId === this.state.postId) {
                return item;
              }
            });
            // console.log("ROW data+++++++++++++++",rowData)
            this.setState({ rowData });
          });
        } else {
          // // show error message in Toast
          // toast.error("Add Catetgory isn't Successfully", {
          // position: toast.POSITION.BOTTOM_RIGHT
          // })
        }
      })
      .catch((error) => {
        //   // show error message in Toast
        toast.error("Add Comments isn't Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  render() {
    const fname = this.state.userdata.firstName;
    const lname = this.state.userdata.lastName;
    // const label = this.state.data.like ? 'Unlike' : this.state.data.like
    const categories =
      this.state.categories &&
      this.state.categories.filter(
        (item) => item.value === this.state.selectedOption.categoryId
      );
    // console.log('category',this.state.categories)
    const data = categories && categories.map((item) => item.label);
    // console.log('categories', data)
    const tags = this.state.value;
    const tagData = tags && tags.map((item) => item.label);
    return (
      <React.Fragment>
        <Card className="overflow-hidden app-ecommerce-details">
          <CardBody className="pb-0">
            <Row className="mb-1 mt-2">
              <Col
                className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
                sm="12"
                md="5"
              >
                <img
                  src={
                    IMG.default.baseURL + "/" + this.state.selectedOption.image
                  }
                  alt="Post Image"
                  height="250"
                  width="250"
                />
              </Col>
              {/* {console.log('selection',this.state.selectedOption)} */}
              <Col md="7" sm="12">
                <h3>{this.state.selectedOption.title}</h3>
                {/* <p className="text-muted">Author by : &nbsp; {this.state.username.firstName+ ' '+this.state.username.lastName}</p> */}
                <div className="d-flex flex-wrap">
                  <h3 className="text-primary">
                    {this.state.selectedOption.description}
                  </h3>
                </div>
                <hr />
                <span>
                  {ReactHtmlParser(this.state.selectedOption.content)}
                </span>
                <hr />
                <Row>
                  <Col>
                    <div>Categories</div>
                    <span>{data}</span>
                  </Col>
                  <Col>
                    <div>Tags</div>
                    <span>{tagData}</span>
                  </Col>
                </Row>

                <hr />
                <p className="my-50">
                  <span>Published At</span>
                  <span className="mx-50">-</span>
                  <span>
                    {moment(this.state.selectedOption.publishedAt).format(
                      "YYYY-MM-DD"
                    )}
                  </span>
                </p>
                {/* <hr />
                <Button.Ripple
                  className="mr-1"
                  color="primary"
                  type="submit"
                  //onClick={this.props.leadId}
                >
                  Like
                </Button.Ripple> */}
              </Col>
            </Row>
          </CardBody>
          <Row className="item-features">
            <Col>
              <CardHeader>
                <CardTitle>
                  <Icon.MessageSquare size={20} />
                  &nbsp;Comments
                </CardTitle>
                <div className="d-flex flex-wrap">
                  <Button.Ripple
                    color="primary"
                    outline
                    onClick={this.toggleModal}
                  >
                    Add Comments
                  </Button.Ripple>
                </div>
              </CardHeader>
            </Col>
            <Col sm="12">
              {this.state.rowData &&
                this.state.rowData.map((item, index) => {
                  // console.log("item", item);
                  const username =
                    item.userId.firstName + " " + item.userId.lastName;
                  return (
                    <Row key={index}>
                      <Col sm="12">
                        <Card>
                          <CardBody>
                            <Row className="mx-0" col="12">
                              <Col className="pl-0" sm="12">
                                <Media className="d-sm-flex d-block">
                                  <Media className="mt-md-1 mt-0" left>
                                    <img
                                      className="rounded-circle mt-25"
                                      src={
                                        IMG.default.baseURL +
                                        "/" +
                                        item.userId.avtar
                                      }
                                      height="28"
                                      width="28"
                                      alt="User Image"
                                    />
                                  </Media>
                                  <Media body>
                                    <Row>
                                      <Col sm="12" className={"mt-2"}>
                                        <div className="users-page-view-table">
                                          <div className="d-flex user-info">
                                            <div className="user-info-title font-weight-bold">
                                              UserName
                                            </div>

                                            <div>
                                              <span className="text-success">
                                                {username}
                                              </span>
                                            </div>
                                            {/* {console.log(this.state.selectedOption)} */}
                                          </div>
                                          <div className="d-flex user-info">
                                            <div className="user-info-title font-weight-bold">
                                              {item.commentName}
                                            </div>
                                          </div>
                                          <div className="d-flex user-info">
                                            <div className="user-info-title font-weight-bold">
                                              Created At:
                                            </div>
                                            <div className="text-truncate">
                                              <span>
                                                {moment(item.createdAt).format(
                                                  "YYYY-MM-DD"
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="d-flex user-info">
                                            <div className="user-info-title font-weight-bold">
                                              <Button.Ripple
                                                size="sm"
                                                color="primary"
                                                type="submit"
                                                //onClick={this.toggleModal1}
                                              >
                                                Reply to
                                              </Button.Ripple>
                                            </div>
                                          </div>
                                          <Row>
                                            <Form
                                              onSubmit={(e) => {
                                                e.preventDefault();
                                                this.replyComment();
                                              }}
                                            >
                                              <Col sm="12">
                                                <Row>
                                                  <Col sm="12">
                                                    <FormGroup>
                                                      <Input
                                                        type="disabled"
                                                        disabled
                                                        value={
                                                          fname + " " + lname
                                                        }
                                                        id="userId"
                                                        name="userId"
                                                        placeholder="Username"
                                                        //onChange={this.handleInput}
                                                        //   value={this.state.formData && this.state.formData.categoryName?this.state.formData.categoryName:''}
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                  <Col sm="12">
                                                    <FormGroup>
                                                      <Input
                                                        type="textarea"
                                                        rows="3"
                                                        name="rpcommentName"
                                                        placeholder="Reply a Comment"
                                                        id="add-comment"
                                                        onChange={
                                                          this.handleInput
                                                        }
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                  <Col sm="12">
                                                    <FormGroup>
                                                      <Button.Ripple
                                                        size="sm"
                                                        color="primary"
                                                        type="submit"
                                                        //onClick={this.handleClick}
                                                      >
                                                        Post Comment
                                                      </Button.Ripple>
                                                    </FormGroup>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Form>
                                          </Row>
                                        </div>
                                      </Col>
                                    </Row>
                                    <hr />
                                    <Label>Reply Section</Label>

                                    {this.state.Data &&
                                      this.state.Data.map((item, index) => {
                                        const username =
                                          item.userId.firstName +
                                          " " +
                                          item.userId.lastName;
                                        return (
                                          <Media className="pb-2" key={index}>
                                            <Media left href="#">
                                              <img
                                                className="rounded-circle mt-2"
                                                src={
                                                  IMG.default.baseURL +
                                                  "/" +
                                                  item.userId.avtar
                                                }
                                                height="28"
                                                width="28"
                                                alt="User Image"
                                              />
                                            </Media>
                                            <Media body>
                                              <Row>
                                                <Col sm="12" className={"mt-2"}>
                                                  <div className="users-page-view-table">
                                                    <div className="d-flex user-info">
                                                      <div className="user-info-title font-weight-bold">
                                                        UserName
                                                      </div>

                                                      <div>
                                                        <span className="text-success">
                                                          {username}
                                                        </span>
                                                      </div>
                                                      {/* {console.log(this.state.selectedOption)} */}
                                                    </div>
                                                    <div className="d-flex user-info">
                                                      <div className="user-info-title font-weight-bold">
                                                        {item.rpcommentName}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex user-info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Created At:
                                                      </div>
                                                      <div className="text-truncate">
                                                        <span>
                                                          {moment(
                                                            item.createdAt
                                                          ).format(
                                                            "YYYY-MM-DD"
                                                          )}
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Col>
                                              </Row>
                                            </Media>
                                          </Media>
                                        );
                                      })}
                                  </Media>
                                </Media>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  );
                })}
            </Col>
          </Row>
          <Modal
            isOpen={this.state.showModal}
            toggle={this.toggleModal}
            className="modal-dialog-centered modal-sm"
          >
            <ModalHeader toggle={this.toggleModal} className="bg-primary">
              Add Comments
            </ModalHeader>
            <ModalBody>
              <AddComment
                toggleModal={this.toggleModal}
                postId={this.state.postId}
                userInfo={this.state.userdata}
                addComment={this.addComment}
              />
            </ModalBody>
          </Modal>
        </Card>
      </React.Fragment>
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
export default connect(mapStateToProps)(ViewBlog);
