import "./PageAccessWarning.css";

const LoginWarning = () => {
    return (
        <div className="must_log_in">
            <p className="warning_text">
                Для доступа к странице необходимо войти в аккаунт
            </p>
        </div>
    );
}

export default LoginWarning;