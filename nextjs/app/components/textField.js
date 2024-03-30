import InputField from "@/app/components/input_field";

export default function TextField({
                                      label,
                                      labelFor,
                                      id,
                                      type,
                                      placeholder,
                                      required,
                                  }) {

    return (
        <section className="w-full">
            <label
                htmlFor={labelFor}
                className="
                    block
                    mb-1
                    text-sm font-medium text-zinc-500
                    leading-none
                "
            >{label}
            </label>

            <InputField
                required={required}
                type={type}
                id={id}
                placeholder={placeholder}
            />
        </section>

    )

}