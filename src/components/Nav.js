import React from "react";
import { Link,useNavigate} from 'react-router-dom'
const Nav=()=>{
    const auth=localStorage.getItem('user')
    const navigate=useNavigate();
    const logout=()=>{
   localStorage.removeItem('user')
   navigate('/signup')
    }
    return(
        <>
           { auth? <ul className="nav">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>:
            <ul className="nav left">
                   <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    </>    
            </ul>

}
        </>
    )
}
export default Nav;