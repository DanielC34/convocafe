'use client'

export default function FilledButton(
    {
        type,
        stretch,
        onClick,
        children,
        dense,
        isLoading
    }
) {

    let className = ""

    switch (type) {
        case "primary":
            className = "bg-stone-900 text-amber-50 hover:bg-stone-800 active:bg-stone-900"
            break;
        case "secondary":
            className = "bg-white text-stone-900 hover:bg-stone-100 active:bg-stone-50"
            break;
        case "danger":
            className = "bg-red-500 text-white hover:bg-red-600 active:bg-red-500"
            break;
        default:
            className = "bg-amber-50 text-black hover:bg-amber-100 active:bg-amber-50"
            break;

    }

    if (stretch) {
        className += " w-full"
    }

    if (isLoading) {
        className += " cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 active:bg-opacity-50"
    }

    let denseClasses = "min-h-8 py-2 px-4  text-sm "
    if (!dense) {
        denseClasses = "h-12 px-8 text-base"
    }


    return (
        <button
            className={
                `${className} ${denseClasses} 
                hover:shadow-lg 
                rounded-md 
                justify-center items-center gap-2 inline-flex
                shadow
            `}
            disabled={isLoading}
            onClick={onClick}
        >

            <p className="font-medium leading-normal">{isLoading ? "Loading..." : children}</p>
        </button>
    );
}