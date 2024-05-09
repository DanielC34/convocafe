export default function InputField({
                                       id,
                                       type,
                                       placeholder,
                                       value,
                                       onChange,
                                       required,

                                   }) {
    return (
        <input
            id={id}
            type={type}
            className="
                    w-full
                    bg-white
                    blockborder border-zinc-200 rounded-md
                    ring-1 ring-zinc-200
                    focus:border-zinc-400
                    p-2.5"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}