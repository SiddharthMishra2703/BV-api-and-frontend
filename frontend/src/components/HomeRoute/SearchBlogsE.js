import React from 'react'
import "../css/SearchBlogsE.css"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function SearchBlogsE({ placeholder }) {

    const [filteredData, setFilteredData] = useState([]);
    const [userBlog, setUserBlog] = useState([]);

    const getBlogs = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_API + '/blog', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
                // credentials: "include"
            });

            const data = await res.json();
            setUserBlog(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getBlogs();
    }, []);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = userBlog.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }

    }

    return (
        <div className='Search'>

            <div className='searchInput'>
                <i className="zmdi zmdi-search zmdi-hc-lg icon"></i>
                <input className='shadow' type="text" placeholder={placeholder} onChange={handleFilter} />
            </div>

            {filteredData.length !== 0 && (
                <div id='resultBox' className='dataResult'>
                    {filteredData.slice(0, 10).map((value) => {
                        return <Link to={"/blogs/" + value._id} className='dataItem' target='_blank'>
                            <p className='singleItem'>
                                {value.title}
                            </p>
                        </Link>;
                    })}
                </div>
            )}

        </div>
    )
}

export default SearchBlogsE
