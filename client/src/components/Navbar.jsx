import React, { useContext } from "react";
import Logo from "../public/logo.png"
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   
  const navigate = useNavigate();
  const {currentUser, logout} = useContext(AuthContext);

  const handleLogout = async (e) => {
    try {
    await logout();
    navigate("/login");
    } catch(error){
      console.error('Logout Failed: ', error);
    }
  }

  const handleClick = async (e) => {
    try{
      navigate("/");
    } catch(error) {
      console.error('Navigation Failed');
    }
  }

    return (
        <div className="navbar">
          <div className="container">
            <div className="logo">
                <img src={Logo} alt="logo" onClick={handleClick} />
            </div>
            <div className="links">
              <Link className="link" to="/?cat=technology">
              <h6>Technology</h6>  
              </Link>
              <Link className="link" to="/?cat=food">
              <h6>Food</h6>  
              </Link>  
              <Link className="link" to="/?cat=cinema">
              <h6>Cinema</h6>  
              </Link>    
              <span>{currentUser ?.username}</span>
              {currentUser ? (
                <span onClick={handleLogout}>Logout</span>
              ) : (
                <Link className="link" to="/login">Login</Link>
              )}
              <span className="write">
              <Link className="link" to="/write">Write</Link>
              </span>
            </div>
          </div>
        </div>
    )
}

export default Navbar