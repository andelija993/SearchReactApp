import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "../components/axios";
import User from "./ui/User";

const Home = () => {

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);

    const handleQueryInput = e => {
        const value = e.target.value;
        setQuery(value)
    }
    ////dugme na klik poziva fju koje ce nas voditi stranicu nazad
    const handlePreviousPage = () => {
        setPage(page => {
            if (page === 1) return page;
            else return page - 1;
        })
    }

    //dugme na klik poziva fju koje ce nas voditi stranicu napred
    const handleNextPage = () => {
        setPage(page => page + 1);
    }

    const handlePageLimit = (e) => {
        const value = e.target.value;
        //to je string, nama treba br
        setLimit(parseInt(value));
    }

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get("/search/users?q=" + query, {
                params: {
                    page: page,
                    per_page: limit
                }
            });
            return data?.items;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    const handleSearchUsers = async (e) => {
        e.preventDefault();
        console.log("1111111");
        if (query) {
            const items = await fetchUsers();
            setUsers(items);
        }
        else {
            console.log("Nothing in query");
        }
    };
    //svaki put kada se promeni strana, ovaj hook ce ponovo da se pokrene.
    // Da smo ostavili prazne uglaste zagrade, samo bi se jednom pokrenu
    //Svaki put kada se ovaj hook pokrene trebada prikazemo usere na razlicitoj strani i razl broj


    useEffect(() => {
        const displayUsersOnChange = async () => {
            if (query) {
                const items = await fetchUsers();
                setUsers(items);
            }
        }
        displayUsersOnChange()
    }, [page, limit]);

    return (
        <div className="container">
            <h2>GitHub Search</h2>
            <div className="search-form">
                <form>
                    <input value={query} onChange={handleQueryInput} type="text" placeholder="Search for Git user..." />
                    <button className="search-button" onClick={handleSearchUsers}>Search</button>
                </form>
            </div>
            <div className="pagination-div">
                <label>
                    <small>Per Page</small>
                    { <select onChange={handlePageLimit}>
                        <option value="30">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select> }
                </label>
                <div className="pagination">
                    <button onClick={handlePreviousPage}>Back</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            </div>

            <div className="search-results">
                <div className="user-div">
                    {users ? (
                        users.map((user) => {
                            return <User user={user} key={user.id} />;
                        })
                    ) : (
                        <h2>There is nothing to display...</h2>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Home;