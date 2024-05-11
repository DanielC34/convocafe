'use client'

import FormCard from "@/components/cards/formCard";
import TextField from "@/components/form/textField";
import FilledButton from "@/components/buttons/filled-button";
import Link from "next/link";
import {useState} from "react";
import {isNotAuth} from "@/utils/auth";
import axios from "@/http/axios";
import Snackbar from "@/components/snackbar";
import {useRouter} from "next/navigation";

const SignupPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleSignup(e) {
        e.preventDefault();
        console.log(email, password, username, confirmPassword)
        setIsLoading(true)
        setError(null)

        try {
            console.log('checking password match')
            if (password !== confirmPassword) {
                setError("Passwords do not match")
                return
            }
            console.log("sending request")
            const res = await axios.post('/auth/signup', {email, password, username})
            console.log("done sending request")
            if (res.status === 201) {
                router.push('/login')
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
            }
        } catch (err) {
            if (err.response.data.msg) {
                setError(err.response.data.msg)
            } else {
                setError("Could not sign up. Please try again.")
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
                <FormCard className="shadow-2xl">
                    <form className="
                        w-full
                        space-y-10
                    "
                          onSubmit={handleSignup}
                    >
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

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
                            <TextField
                                label="Confirm Password"
                                labelFor="password"
                                id="confirm-password"
                                type="password"
                                placeholder="confirm password"
                                required={true}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <FilledButton
                            type='primary'
                            stretch={true}
                            isLoading={isLoading}
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
        </>
    );
}


export default isNotAuth(SignupPage);