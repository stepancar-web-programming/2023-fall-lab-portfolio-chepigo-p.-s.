import { useState, useContext} from "react";
import httpClient from "../HttpClient"
import "./FormLogin.css";
import useToken from './useToken'

const FormLogin = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { token, removeToken, setToken, userId } = useToken();

  const logInUser = async () => {
      await httpClient.post("/login", {
        login,
        password
      }).then((resp) => {
        if (resp.status == 200) {
          setToken(resp.data.access_token);
          window.location.href = "/";
        }
      }).catch(function (error) {
        if (error.response) {
        }
      });
  };

  return (
    <div className="f-login">
      <b className="b27">логин</b>
      <input 
        className="in-login" 
        type="text" 
        value={login} 
        onChange = {(e) => setLogin(e.target.value)}
        maxLength={30} 
        minLength={1} />
      <b className="b27">пароль</b>
      <div className="frame-pass">
        <input 
          className="in-pass" 
          type="password" 
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={() => logInUser()} className="b-go-login">
        <b className="b29">вход</b>
      </button>
    </div>
  );
};

export default FormLogin;
