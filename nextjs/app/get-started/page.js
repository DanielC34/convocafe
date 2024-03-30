'use client'

import FormCard from "@/app/components/cards/formCard";
import FilledButton from "@/app/components/buttons/filled-button";
import {useRouter} from "next/navigation";

export default function GettingStartedPage() {
    const router = useRouter();
    return (
        <main className="flex bg-amber-50 min-h-screen flex-col items-center justify-center p-24">
            <FormCard>
                <div className="w-full justify-center items-center inline-flex">
                    <img className="w-[187px] h-[168px]" src="/logo.png" alt='logo'/>
                </div>
                <div className="flex-col justify-start items-start gap-[21px] inline-flex">
                    <h3 className="text-black text-[32px] font-semibold leading-10">ConvoCafe</h3>
                    <p className="self-stretch text-black text-lg font-normal leading-[27px]">A place you
                        get to chat with different people
                    </p>
                </div>
                <div className="justify-start items-start gap-[30px] inline-flex">
                    <FilledButton
                        type='primary'
                        onClick={() => router.push('/login')}
                    >
                        Login
                    </FilledButton>
                    <FilledButton
                        onClick={() => router.push('/signup')}
                    >
                        Sign up
                    </FilledButton>
                </div>
            </FormCard>

        </main>
    )
}