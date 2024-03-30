export function isAuth(Component) {
    return function AuthComponent(props) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/get-started';
            return null;
        }

        return <Component {...props} />;
    }
}


export function isNotAuth(Component) {
    return function NotAuthComponent(props) {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/';
            return null;
        }

        return <Component {...props} />;
    }
}


