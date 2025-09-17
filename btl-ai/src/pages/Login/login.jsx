import React from 'react'
import './login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons' 
import { faLock } from '@fortawesome/free-solid-svg-icons'
import {faFacebook} from '@fortawesome/free-brands-svg-icons'
import {faGoogle} from '@fortawesome/free-brands-svg-icons'


const login = () => {
  return (
    <div>
      <div className="login">
        <div className="login-backgroud">


            <div className="title-login">
                <p>Login your account</p>
            </div>


            <div className="input">
            <div className="input-acc">
                <FontAwesomeIcon icon={faUser} className='icon'/>
                <input type="text" placeholder='User name'/>
            </div>
            <div className="input-pass">
                <FontAwesomeIcon icon={faLock} className='icon' />
                <input type="password" placeholder='Password'/>
            </div>

            </div>

            <div className="button">
            <div className="button-login">
                <button>Login</button>
            </div>
            <div className="button-signUp">
                <button>Sign up</button>
            </div>
            </div>
            <div className="or">
                <p>Or</p>
            </div>
            <div className="face-goo">
                <div className="face">
                <button> <FontAwesomeIcon icon={faFacebook} className='face' /> Sign for Facebook</button>
                </div>
                <div className="google">
                <button> <FontAwesomeIcon icon={faGoogle} className='google'/> Sign for Google</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default login
