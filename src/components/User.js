import React, { useState, useEffect } from "react";
import "./User.css"
import site from "../assets/site.png"
import github from "../assets/github.png"
import user from "../assets/user.png"
import Repo from "./ui/Repo";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
    //tako dohvatamo inf o jednom useru
    const { login } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [repos, setRepos] = useState([]);


    //svaki put kad se klikne na novog usera mora useeffect opet da se pokrene

    useEffect(() => {
        const fetchUserInformation = async () => {
            //umesto da pisemo await-e, mozemo da pozovemo Promise.all
            // const responseUser = await axios.get("/userinfo");
            // const responseRepos = await axios.get("/repos");
            try {
                const response = await Promise.all([
                    axios.get(`https://api.github.com/users/${login}`),
                    axios.get(`https://api.github.com/users/${login}/repos`)
                ]);
                //baca gresku
                console.log(response);
                setUserInfo(response[0].data)
                setRepos(response[1].data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserInformation();
    }, []);

    return (
        <div className="container">
            <Link to="/" className="back">
                Back
            </Link>
            <div className="user-information">
                <div className="image">
                    <img src={userInfo?.avatar_url} alt={login} />
                </div>
                <div className="user-content">
                    <p className="user-name">{userInfo?.name}</p>
                    <p className="user-bio">
                        {userInfo?.bio}
                    </p>
                    <div className="more-data">
                        <p>
                            <img src={user} alt="" />
                            Followers: {userInfo?.followers}<br></br> Following: {userInfo?.following}
                        </p>
                        {userInfo?.blog && <p>
                            <img src={site} alt="" />
                            {userInfo?.blog}
                        </p>}
                        <p>
                            <img src={github} alt="" />
                            <a className="user-a" href={userInfo?.html_url} target="_blank" rel="noreferrer">View github profile</a></p>
                    </div>
                </div>
            </div>
            <div className="user-repos">
                <h3 className="repo-title">Check {login}'s repositoriums:</h3>
                {
                    repos ? repos.map(repo => {
                        return <Repo repo={repo} key={repo.id} />
                    }) : (<h2>This user doesn't have any repositoriums.</h2>)
                }
            </div>
        </div>

    )
}

export default User;