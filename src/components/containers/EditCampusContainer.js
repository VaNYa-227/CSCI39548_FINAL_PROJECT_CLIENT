import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { EditCampusView } from '../views';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';


class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "", 
          imageUrl: "https://institute.careerguide.com/wp-content/uploads/2020/07/14up-colleges-remote-facebookJumbo-1024x536.jpg",
          address: "",
          description: null,
          redirect: false, 
          redirectId: null,
          id: null
        };
    }

    componentDidMount() {
        this.props.fetchCampus(window.location.pathname.slice(-1));

        this.setState({
          name: this.props.campus.name,
          imageUrl:this.props.campus.imageUrl,
          address: this.props.campus.address,
          description: this.props.campus.description,
          redirect: false, 
          redirectId: null,
          id: this.props.campus.id
        })
    }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let editedCampus = {
            name: this.state.name,
            imageUrl: this.state.imageURL,
            address: this.state.address,
            description: this.state.description,
            id: window.location.pathname.slice(-1)
        };
        
        await this.props.editCampus(editedCampus);

        this.setState({
          name: "", 
          imageUrl: "https://institute.careerguide.com/wp-content/uploads/2020/07/14up-colleges-remote-facebookJumbo-1024x536.jpg",
          address: null,
          description: null,
          redirect: true, 
          redirectId: window.location.pathname.slice(-1)
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        return (
          <EditCampusView 
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}  
            campus={this.props.campus}
            editCampus={this.props.editCampus}  
            fetchCampus={this.props.fetchCampus}  
          />
        );
    }
}

const mapState = (state) => {
    return {
      campus: state.campus,
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (campus) => dispatch(fetchCampusThunk(campus)),
    })
}

export default connect(mapState, mapDispatch)(EditCampusContainer);