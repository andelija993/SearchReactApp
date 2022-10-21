import React from "react";

const Repo = ({ repo }) => {

    const { name, html_url} = repo;

    return (
        <div className="repo">
                 <h3>
                <a href={html_url} target="_blank" rel="noreferrer" >{name}</a>
            </h3>
        </div>

    )
}

export default Repo;