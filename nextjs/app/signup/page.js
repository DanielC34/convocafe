import FormCard from "@/app/components/cards/formCard";
import TextField from "@/app/components/textField";
import FilledButton from "@/app/components/filled-button";
import Link from "next/link";

export default function SignupPage() {
    return (
        <main className="
            flex flex-col items-center justify-center
            bg-amber-50
            min-h-screen
            p-24
        ">
            <FormCard>
                <form className="
                        w-full
                        space-y-10
                ">
                    <div className="text-center">
                        <div className="text-stone-900 text-4xl font-semibold leading-10 mb-5">
                            Sign up
                        </div>
                        <div className="text-zinc-500 text-lg font-normal leading-relaxed">
                            Create a free account with only your email
                        </div>
                    </div>
                    <div className=" space-y-4">
                        <TextField
                            label="Username"
                            labelFor="username"
                            id="username"
                            type="text"
                            placeholder="username"
                            required={true}
                        />

                        <TextField
                            label="Email"
                            labelFor="email"
                            id="email"
                            type="email"
                            placeholder="email"
                            required={true}
                        />

                        <TextField
                            label="Password"
                            labelFor="password"
                            id="password"
                            type="password"
                            placeholder="password"
                            required={true}
                        />
                        <TextField
                            label="Confirm Password"
                            labelFor="password"
                            id="confirm-password"
                            type="password"
                            placeholder="confirm password"
                            required={true}
                        />
                    </div>

                    <FilledButton
                        type='primary'
                        stretch={true}
                    >Sign up</FilledButton>

                    <div className="w-full justify-center items-center gap-1 inline-flex">
                        <p className="text-zinc-600 text-base font-medium leading-normal">Already have an
                            account?
                        </p>
                        <Link href={'/login'}
                              className="text-stone-900 text-lg font-medium  underline leading-relaxed">Login</Link>
                    </div>

                </form>
            </FormCard>

        </main>
    );
}