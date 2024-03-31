import {useEffect, useState} from "react";

export default function Snackbar({message, type}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!message) return;

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 5000);
    }, [message]);


    if (!isVisible) return null;

    const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

    return (
        <div className={`
            fixed top-10 left-1/2
            transform -translate-x-1/2
            px-4 py-2 rounded-sm ${bgColor}`}
        >
            {message}
        </div>
    )
}