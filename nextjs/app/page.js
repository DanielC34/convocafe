'use client'

import FilledButton from "@/components/buttons/filled-button";
import FormCard from "@/components/cards/formCard";
import {useRouter} from "next/navigation";
import {isAuth} from "@/utils/auth";

const ChatPage = () => {
    const router = useRouter();
    return (
        <main className="flex bg-amber-50 min-h-screen flex-col items-center justify-center p-24">
            <FormCard>
                <h1>Get Started</h1>
            </FormCard>

        </main>
    );
}

export default isAuth(ChatPage);

