import FilledButton from "@/app/components/buttons/filled-button";

export default function FormCard(
    {
        children,
    }) {
    return (
        <div
            className="
            min-w-[300px]
            sm:w-[400px]
            px-5 py-10 bg-white rounded-md
            inline-flex flex-col justify-center items-start gap-6 ">
            {children}
        </div>
    )
}