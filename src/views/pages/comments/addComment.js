import React from "react"
import { Card, CardBody, Row, Col ,Button, Form, Input, Label, FormGroup} from 'reactstrap'
import { connect } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
class AddComment extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            formData:{},
            erroMsg:false,
            userdata : this.props.userInfo,
            postId : this.props.postId
        }
        console.log('POSTID',this.state.postId)
    }
    //handleInput 
  handleInput = (event) => {
    event.persist()
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [event.target.name]: event.target.value
      }
    }),()=>console.log('Name Input',this.state.formData))
  }
  //Handle Form Submit
  handleFormSubmit = () =>{
    //
    console.log('FORMDATA',this.state.formdata)
    let obj = {userId:this.state.userdata._id,
              commentName:this.state.formData.commentName,
              postId:this.state.postId}
    console.log('OBJEEE',obj)
      // console.log(this.props.addData)
      this.props.addComment(obj)
      //close the model
         this.props.toggleModal()
  }
  componentDidMount() {
    
    // const username = fname+' '+lname
    // console.log('Auther data---',username)
    // this.setState({formData : username},()=>console.log('abababababbasss',this.state.formData))
  }
    
  //handle Reset
  handleReset = ()=>{
    this.setState({formData: {}})
  }
  render(){
    const fname= this.state.userdata.firstName
    const lname = this.state.userdata.lastName
    return (
        <Row>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Col sm="12">
               <Form
                    onSubmit={(e) => {
                      e.preventDefault()
                      this.handleFormSubmit()
                    }}
                  >
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Label for="commentName">Username</Label>
                        <Input
                          type="disabled"
                          disabled
                          value={fname+' '+lname}
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
                        <Label for="description">Comments</Label>
                        <Input
                        //value={this.state.formData && this.state.formData.message?this.state.formData.message:''}
                        type="textarea"
                        name="commentName"
                        id="commentName"
                        rows="3"
                        cols="3"
                        required
                        placeholder="What are you thinking about?"
                        onChange={this.handleInput}
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
                        Add Comment 
                      </Button.Ripple>
                      <ToastContainer />
                      <Button.Ripple color="flat-warning"
                          onClick={() => this.handleReset()}
                          type="button"
                      >Reset</Button.Ripple>
                      </Col>
                  </Row>
                </Form>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = state => {
    return {
      
    }
  }
export default connect(mapStateToProps)(AddComment)