import React, { useEffect, useState } from 'react'
import HomeFirst from './HomeFirst'
import HomeSecond from './HomeSecond'


export default function Home() {
    const [userData, setUserData] = useState({message:"Server Is Loading..."});

    const getData = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_API + '/', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            setUserData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    console.log(userData);
  return (
    <>
    <p>{userData.message}</p>
      <HomeFirst/>
      <HomeSecond/>
    </>
  )
}
