import { useState } from 'react';
import jwt_decode from 'jwt-decode';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());
  const [userId, setUserId] = useState(getUserId());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  function getUserId() {
    try {
      const decodedToken = jwt_decode(token);
      //setUserId(decodedToken.id);
      // console.log(decodedToken);
      return decodedToken.sub;
    } catch (error) {
      return null;
    }
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
    userId,
  }

}

export default useToken;