import React, { Component } from 'react';
import API from '../config/api';

class login extends Component {


    constructor(props){
        super(props)

        this.state ={

        }
    }

    handleInput(e){
        const name = e.target.name
        const value = e.target.value

        this.setState({
            [name] : value
        })
    }

    handleForm(e){
        e.preventDefault()

        const data = {
            body : this.state
        }
        
        API.login(data, (response, code)=>{
            if(!response.error){

                var user = {
                    id : response.data.id,
                    name : response.data.name,
                    email : response.data.email
                }

                localStorage.setItem('user', JSON.stringify(user))

                this.props.history.push('/gallery')

            }else{
                this.setState({
                    error : response.error,
                    errMessage : response.message
                })
            }
        })
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={this.handleForm.bind(this)}>
                            
                            <span className="login100-form-title p-b-26">Welcome</span>
                            <span className="login100-form-title p-b-48"><i className="zmdi zmdi-font" /></span>
                            
                            <div className="wrap-input100 validate-input" >
                                <input className="input100" type="text" name="email"  onChange={this.handleInput.bind(this)}/>
                                <span className="focus-input100" data-placeholder="Email" />
                            </div>

                            <div className="wrap-input100 validate-input">
                                <span className="btn-show-pass"><i className="zmdi zmdi-eye" /></span>
                                <input className="input100" type="password" name="password" onChange={this.handleInput.bind(this)}/>
                                <span className="focus-input100" data-placeholder="Password" />
                            </div>

                            <p><font color="red">{this.state.error?this.state.errMessage:""}</font></p>
                            
                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button className="login100-form-btn" name="submit">Login</button>
                                </div>
                            </div>

                            {/* <div className="text-center p-t-115">
                                <span className="txt1">Don’t have an account?</span>
                                <a className="txt2" href="#">Sign Up</a>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default login;