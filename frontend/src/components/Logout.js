import React, { useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function Logout() {

  const { dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
      fetch('/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then((res)=>{
        dispatch({type:"USER" , payload:false});

        navigate('/login', {replace: true});
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      }).catch((err)=>{
        console.log(err);
      })
    });
  
  return (
    <div className='text-center text-primary'>
      <h1>Thank You For visting.</h1>
      <h3>Come back soon.</h3>
    </div>
  )
}
