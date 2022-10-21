import React from "react";
import { Link } from "react-router-dom";

const User = ({user}) => {
    const {avatar_url, login} = user;

    
    return (
        <div className="user">
        <div className="image">
            <img
                src={avatar_url}
                alt={login} />
        </div>
        <div className="user-info">
            <h3>{login}</h3>
            <Link target="_blank" to = {`/user/${login}`}>  <button className="user-details">User details</button></Link>
        </div>
        </div>
    )
}

export default User;