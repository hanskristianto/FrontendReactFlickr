import React, { Component } from 'react';
import API from '../config/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

class gallery extends Component {

    constructor(props){

        super(props)

        this.state = {
            user : JSON.parse(localStorage.getItem('user')),
            data: [],
            offset: 0,
            perPage: 8,
            currentPage: 0
        }
    }


    componentDidMount(){
        API.gallery((response, code)=>{
            this.setState((prev)=>({
                data : response,
                pageCount: Math.ceil(response.length / this.state.perPage),
            }))
        })
    }

    viewGallery = ()=>{

        const data = this.state.data;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

        return (
            
            <div className="row text-center">
                {this.state.data?slice.map((v, k)=>(
                    <div className="col-lg-3 col-md-4 col-6" key={k}>
                        <div className="d-block mb-4 h-100">
                            <div className="image-gallery">
                                <img className="img-fluid img-thumbnail" src={v.media.m} alt=""/>
                            </div>
                            <div>
                                <div>
                                    <label>Author ID : {v.author_id}</label>
                                </div>
                                <div>
                                    <button className="btn btn-danger" onClick={()=>{this.handleWishList(v.media.m)}}><i className="fa fa-heart" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                :""}
            </div>
        )
    }

    handleWishList = (image_url)=>{
        const data = {
            body : {
                user_id : this.state.user.id,
                image_url : image_url,
            }
        }

        API.setWishList(data, (response, code)=>{
            if(!response.error){
                Swal.fire(response.message)
            }
        })

    }

    userProfile = ()=>{

        return (
            <div>
                <p>Welcome, {this.state.user.name} | <Link to="/myWishList" className="btn btn-default"> My Wishlist </Link></p>
            </div>
        )
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.viewGallery()
        });

    };

    handleInput = (e)=>{
        var name = e.target.name
        var value = e.target.value

        this.setState((prev)=>({
            [name] : value
        }))
    }

    handleSearch = (bool)=>{
        var data = {
            search : bool?this.state.searchInput:''
        }

        API.searchGallery(data, (response, code)=>{
            this.setState((prev)=>({
                data : response
            }))
        })
    }

    render() {
        return (
            <div className="container">
                {/* profile user */}
                {this.userProfile()}

                {/* search bar */}
                <div className="input-container">
                    <input placeholder="Search..." className="form-control" name="searchInput" onChange={this.handleInput}/>
                    <button className="fa fa-search icon" aria-hidden="true" onClick={()=>{this.handleSearch(true)}}></button>
                    <button className="btn btn-default" aria-hidden="true" onClick={()=>{this.handleSearch(false)}}>Clear</button>
                </div>

                {/* view gallery */}
                {this.viewGallery()}

                <ReactPaginate
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                    onPageChange={this.handlePageClick}
                    pageCount={this.state.pageCount}
                />
            </div>
        );
    }
}

export default gallery;