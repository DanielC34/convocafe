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

    return (
        <div className="
        fixed top-10 left-1/2
        transform -translate-x-1/2
        bg-red-300
        px-4 py-2 rounded-sm"
        >
            {message}
        </div>
    )
}