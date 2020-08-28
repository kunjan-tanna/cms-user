import React from "react";
import axios from "../../configs/axiosConfig";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Collapse,
  Spinner,
  Button,
} from "reactstrap";
import {
  ThumbsUp,
  MessageSquare,
  ChevronDown,
  RotateCw,
  X,
  Check,
} from "react-feather";
import classnames from "classnames";
import * as globalActions from "../../redux/actions/categories/index";
import * as PostActions from "../../redux/actions/posts/index";
import * as tagActions from "../../redux/actions/tags/index";
import { connect } from "react-redux";
import * as IMG from "../../configs/ImgConfig";
import { history } from "../../history";
import Select from "react-select";
import cardImg from "../../assets/img/pages/content-img-4.jpg";

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tags: [],
      counter: 0,
      rowData: [],
      abc: [],
      searchVal: "",
      sortType: "asc",
      color: "white",
      selectedValue: "",
      token: this.props.token,
    };
    console.log("PROPS-------------", this.state.token);
  }

  //handle select
  handleSelect = (name, data) => {
    //  console.log('categories',typeof(data))
    this.setState(
      {
        selectedValue: data.value,
      },
      () => {
        console.log("---HANDLE--", this.state.selectedValue, data.value);
      }
    );
    // this.setState(
    //   (prevState) => ({
    //     formData: {
    //       ...prevState.formData,
    //       [name]: data.value
    //     }
    //   }),()=>{console.log("---HANDLE--",this.state.formData,name,data.value)})
  };

  handleCreatableSelectTags = (name, data) => {
    // console.log('DATA',typeof([name]))
    const tags = data && data.map((item) => item.value);
    // console.log('DATAAAAA',typeof(tags))

    //const abc = name & name.map(index => index+1)
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [name]: tags,
        },
      }),
      () => {
        console.log("---TAGS--", this.state.formData, tags);
      }
    );
  };
  componentDidMount() {
    this.props.dispatch(globalActions.getCategory());
    this.props.dispatch(tagActions.getTag());
    this.props.dispatch(PostActions.getPost()).then((res) => {
      console.log("get POST----", res);
      let rowData = res.data.filter((item) => {
        if (item.status && item.status == true) {
          //   return item.title.toLowerCase().includes(this.state.search.toLowerCase())
          // console.log('FILTER',filterData)
          return item;
        }
      });
      // console.log('ROWDATA',rowData)
      // rowData.map((item,index)=>{
      //   //console.log(item,index)
      //   item.count=index+1
      // })
      this.setState({ rowData });
    });
  }
  // filterData = () => {
  //   this.state.rowData.filter((data) => {
  //     console.log("DATA------", data);
  //     // const sorted = data.sort((a,b)=>{
  //     //   console.log('aaa',a)
  //     // })
  //     return (
  //       data.title.toLowerCase().indexOf(this.state.searchVal.toLowerCase()) !==
  //       -1
  //     );
  //   });
  //   this.setState({ data: this.state.rowData }, () =>
  //     console.log("DATAAAA", this.state.data)
  //   );
  // };
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
  updateSearchQuery = (val) => {
    console.log("aabbababba", val);
    if (val) {
    }
    this.setState({
      searchVal: val,
    });
  };

  likePost = (id) => {
    console.log("POSTIDDD", id);
    const obj = {
      postId: id,
    };
    // Add a request interceptor
    axios.interceptors.request.use((config) => {
      const token = `Bearer ${this.state.token}`;
      config.headers.Authorization = token;

      return config;
    });
    // const config = {
    //   headers: { Authorization: `Bearer ${this.state.token}` },
    // };
    this.props.dispatch(PostActions.updateLikePost(obj)).then((res) => {
      console.log("LIKESSSSS", res);
      let abc = res.data;
      // let rowData = this.state.rowData.map((item) => {
      //   console.log("ROOOSSS", item);
      //   if (item._id == res.data._id) {
      //     return item;
      //   }
      // });
      // // let rowData = res.data.filter((item) => {
      // //   if (item.status && item.status == true) {
      // //     //   return item.title.toLowerCase().includes(this.state.search.toLowerCase())
      // //     // console.log('FILTER',filterData)
      // //     return item;
      // //   }
      // // });
      this.setState({ abc }, () =>
        console.log("DAATTATdjvbasjff", this.state.abc)
      );
    });
  };
  render() {
    console.log("ABCEEEEE", this.state.abc);
    let filteredData = this.state.rowData.filter((data) => {
      // console.log("DATA------", data);
      // const sorted = data.sort((a,b)=>{
      //   console.log('aaa',a)
      // })
      return (
        data.title.toLowerCase().indexOf(this.state.searchVal.toLowerCase()) !==
        -1
      );
    });
    const Data =
      filteredData &&
      filteredData.map((item) => {
        console.log("Itemmsddasda", item);
        if (item._id === this.state.abc._id) {
          return this.state.abc;
        } else {
          return item;
        }
      });

    // const sorted = filteredData && filteredData.map((item) => item.categoryId);
    // // console.log('item--===',sorted)
    // // const categories = item.categoryId.sort((a,b)=>{
    // //   console.log('Sort',a)
    // // })
    // const abc = sorted.sort((a, b) => {
    //   // console.log('SORTING',a)
    //   const isReversed = this.state.sortType === "asc" ? 1 : -1;
    //   // console.log('REserverdd',isReversed * a.categoryName.localeCompare(b.categoryName))
    //   return isReversed * a.categoryName.localeCompare(b.categoryName);
    // });
    // const data = abc && abc.map((item) => item._id);
    // console.log('Categorieess',data)

    // const sorted = this.state.categories.sort((a,b)=>{
    //   console.log('SOrt',a)
    // //   // const isReversed = (this.state.sortType === 'asc') ? 1 : -1;
    // //   // // console.log('REserverdd',isReversed * a.label.localeCompare(b.label))
    // //   // return isReversed * a.label.localeCompare(b.label)
    //  })
    return (
      <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardHeader>
              <CardTitle>Blogs</CardTitle>
              <div className="d-flex flex-wrap flot-right">
                <Button.Ripple
                  color="primary"
                  outline
                  onClick={() => this.props.history.push("/add/post")}
                >
                  Add Blog
                </Button.Ripple>
              </div>
            </CardHeader>
            <CardBody>
              <div className="d-flex flex-wrap justify-content-between mb-1">
                <div className="table-input mr-1">
                  {/* <Input
                      placeholder="search..."
                      onChange={e => this.updateSearchQuery(e.target.value)}
                      value={this.state.value}
                    /> */}
                </div>
                <div className="export-btn">
                  <Input
                    placeholder="search..."
                    onChange={(e) => this.updateSearchQuery(e.target.value)}
                    value={this.state.value}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        {Data &&
          Data.map((item, index) => {
            // console.log("ITEM---", item);
            const username =
              item.authorBy.firstName + " " + item.authorBy.lastName;
            const categories = item.categoryId.categoryName;

            // console.log('Categggg',categories)
            // const sorted = categories.sort((a,b)=>{
            //   console.log('SOrt',a)
            //   // const isReversed = (this.state.sortType === 'asc') ? 1 : -1;
            //   // // console.log('REserverdd',isReversed * a.label.localeCompare(b.label))
            //   // return isReversed * a.label.localeCompare(b.label)
            // })
            return (
              <Col lg="4" sm="12" key={index}>
                <Card>
                  <CardHeader className="justify-content-between">
                    <div className="card-heading">
                      <CardTitle className="w-100">{item.title}</CardTitle>
                      <p>{item.description}</p>
                      {/* {console.log('abbabababab',sorted)} */}
                    </div>
                    {/* <div className="icon mb-5">
            <MoreVertical className="float-right" size="20" />
          </div> */}
                  </CardHeader>
                  <CardBody>
                    <img
                      src={IMG.default.baseURL + "/" + item.image}
                      alt="Social Card"
                      className="img-fluid"
                    />
                    <div className="d-flex justify-content-start mt-2">
                      <div className="icon-like mr-2">
                        <ThumbsUp
                          className="success"
                          type="button"
                          onClick={() => {
                            this.likePost(item._id);
                          }}
                        />
                        <span className="align-middle ml-50">
                          {item.likes.length} likes
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <i>Author By:&nbsp;&nbsp;</i>
                      <span className="text-success">{username}</span>
                    </div>
                    <hr />
                    <Col
                      className="d-flex justify-content-center flex-wrap"
                      sm="12"
                    >
                      <Button.Ripple
                        className="mr-1"
                        color="primary"
                        type="submit"
                        onClick={() =>
                          history.push({
                            pathname: "/view/blog",
                            state: { postId: item ? item._id : "" },
                          })
                        }
                      >
                        Read More
                      </Button.Ripple>
                    </Col>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.global.categories,
    tags: state.global.tags,
    token: state.auth.login.accessToken,
  };
};

export default connect(mapStateToProps)(Blog);
