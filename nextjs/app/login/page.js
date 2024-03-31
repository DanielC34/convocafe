'use client'

import FilledButton from "@/components/buttons/filled-button";
import FormCard from "@/components/cards/formCard";
import TextField from "@/components/form/textField";
import Link from "next/link";
import {useState} from "react";
import axios from "@/http/axios";
import Snackbar from "@/components/snackbar";
import {isNotAuth} from "@/utils/auth";

const loginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleLogin(e) {
        e.preventDefault();
        setIsLoading(true)
        setError(null)

        try {
            const res = await axios.post('/login', {email, password})
            if (res.status === 200) {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                window.location.href = '/'
            }
        } catch (err) {
            if (err.response.data.msg) {
                setError(err.response.data.msg)
            } else {
                setError("Could not login. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Snackbar message={error} type="error"/>
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
        </>
    );
}

export default isNotAuth(loginPage);