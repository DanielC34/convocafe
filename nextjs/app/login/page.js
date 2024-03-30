'use client'

import FilledButton from "@/app/components/buttons/filled-button";
import FormCard from "@/app/components/cards/formCard";
import TextField from "@/app/components/form/textField";
import Link from "next/link";
import {useState} from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


    async function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true)
        setError(null)
        // const res = await fetch('/api/login', {
        //     method: 'POST',
        //     body: {email, password}
        // })
        new Promise(resolve => setTimeout(resolve, 3000))

        // if (res.ok) {
        //     const data = await res.json()
        //     console.log(data)
        // } else {
        //     setError("Invalid email or password")
        // }
        setIsLoading(false)
    }

    return (
        <main className="
            flex flex-col items-center justify-center
            bg-amber-50
            min-h-screen
            p-24
        ">
            <FormCard>
                <form
                    className="
                        w-full
                        space-y-10
                    "
                    onSubmit={handleLogin}
                >
                    <div className="text-center">
                        <div className="text-stone-900 text-4xl font-semibold leading-10 mb-5">Log In</div>
                        <div className="text-zinc-500 text-lg font-normal leading-relaxed">
                            Login to your convocafe account
                        </div>
                    </div>
                    <div className=" space-y-4">

                        <TextField
                            label="Email"
                            labelFor="email"
                            id="email"
                            type="email"
                            placeholder="email"
                            required={true}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            labelFor="password"
                            id="password"
                            type="password"
                            placeholder="password"
                            required={true}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <FilledButton
                        type='primary'
                        stretch={true}
                        isLoading={isLoading}
                    >Login</FilledButton>

                    <div className="w-full justify-center items-center gap-1 inline-flex">
                        <p className="text-zinc-600 text-base font-medium leading-normal">
                            Don't have an account?
                        </p>
                        <Link
                            href={'/signup'}
                            className="
                            text-stone-900 text-lg font-medium  underline leading-relaxed">
                            Sign up
                        </Link>
                    </div>

                </form>
            </FormCard>

        </main>
    );
}