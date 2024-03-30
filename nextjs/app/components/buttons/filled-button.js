'use client'

export default function FilledButton(
    {
        type,
        stretch,
        onClick,
        children,
        isLoading
    }
) {

    let className = "bg-amber-50 text-black hover:bg-amber-100 active:bg-amber-50"
    if (type === "primary") {
        className = "bg-stone-900 text-amber-50 hover:bg-stone-800 active:bg-stone-900"
    }

    if (stretch) {
        className += " w-full"
    }

    if (isLoading) {
        className += " cursor-not-allowed bg-opacity-50 hover:bg-opacity-50 active:bg-opacity-50"
    }

    return (
        <button
            className={className + " hover:shadow-lg h-12 px-8 rounded-md justify-center items-center gap-2 inline-flex"}
            disabled={isLoading}
            onClick={onClick}
        >

            <p className=" text-base font-medium leading-normal">{isLoading ? "Loading..." : children}</p>
        </button>
    );
}