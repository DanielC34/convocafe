'use client';

export function isAuth(Component) {
    return function AuthComponent(props) {
        if (typeof window !== 'undefined') {
            const token = window.localStorage.getItem('token');
            if (!token) {
                window.location.href = '/get-started';
                return null;
            }
        }

        return <Component {...props} />;
    }
}


export function isNotAuth(Component) {
    return function NotAuthComponent(props) {

        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                window.location.href = '/';
                return null;
            }
        }

        return <Component {...props} />;
    }
}


