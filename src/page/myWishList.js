import React, { Component } from 'react';
import API from '../config/api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class myWishList extends Component {

    constructor(props){
        super(props)
        this.state = {
            user : JSON.parse(localStorage.getItem('user')),
        }

    }

    componentDidMount(){
        const data = {
            body : {
                user_id : this.state.user.id
            }
        }

        API.myWishList(data, (response, code)=>{

            if(!response.error){
                this.setState((prev)=>({
                    data: response.data
                }))
            }
        })
    }

    handleDelete = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete this image from you wishlist?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
            if (result.value) {

                Swal.fire(
                  'Deleted!',
                  'Your image has been deleted.',
                  'success'
                )

                alert(id)
              }
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="row profile">
                    <div className="col-md-4">
                        <div className="profile-picture">
                            <img alt="" src="/logo512.png"/>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="text-profile">
                            <h3>Name : {this.state.user.name}</h3>
                            
                            <h3>Email : {this.state.user.email}</h3>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <h2>My Wishlist</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to="/gallery">Back to Gallery</Link>
                    </div>
                </div>

                <div>
                    <div className="row text-center">
                        {this.state.data?this.state.data.map((v, k)=>(
                            <div className="col-lg-3 col-md-4 col-6" key={k}>
                                <div className="d-block mb-4 h-100">
                                    <div className="image-gallery">
                                        <img className="img-fluid img-thumbnail" src={v.image_url} alt=""/>
                                    </div>
                                    <div>
                                        <div>
                                            <button className="btn btn-danger" onClick={()=>{this.handleDelete(v.id)}}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        :""}
                    </div>
                </div>
            </div>

        );
    }
}

export default myWishList;