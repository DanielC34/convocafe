export default function InputField({
                                       type,
                                       placeholder,
                                       required,

                                   }) {
    return (
        <input
            type={type}
            className="
                    w-full
                    bg-white
                    blockborder border-zinc-200 rounded-md
                    ring-1 ring-zinc-200
                    focus:border-zinc-400
                    p-2.5"
            placeholder={placeholder}
            required={required}
        />
    );
}