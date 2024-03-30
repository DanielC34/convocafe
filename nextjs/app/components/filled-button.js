'use client'

export default function FilledButton(
    {
        type,
        stretch,
        onClick,
        children,
    }
) {

    let className = "bg-amber-50 text-black hover:bg-amber-100 active:bg-amber-50"
    if (type === "primary") {
        className = "bg-stone-900 text-amber-50 hover:bg-stone-800 active:bg-stone-900"
    }

    if (stretch) {
        className += " w-full"
    }

    return (
        <button
            className={className + " hover:shadow-lg h-12 px-8 rounded-md justify-center items-center gap-2 inline-flex"}
            onClick={onClick}
        >

            <p className=" text-base font-medium leading-normal">{children}</p>
        </button>
    );
}