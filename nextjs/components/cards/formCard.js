import FilledButton from "@/components/buttons/filled-button";

export default function FormCard(
    {
        color = 'white',
        className = '',
        children,
    }) {



    return (
        <div
            className={`
                ${className}
                min-w-[300px]
                sm:w-[400px]
                px-5 py-10 bg-${color} rounded-md
                inline-flex flex-col justify-center items-start gap-6
            `}>
            {children}
        </div>
    )
}