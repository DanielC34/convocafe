'use client'

import FilledButton from "@/components/buttons/filled-button";
import {useRouter} from "next/navigation";
import {isAuth} from "@/utils/auth";
import FormCard from "@/components/cards/formCard";

const ChatPage = () => {
    const router = useRouter();
    return (
        <main className="flex h-screen justify-center items-center">
            <FormCard
                color="[#EEEDE8]"
            >
                <div className="gap-1 text-center w-full">
                    <h2 className="text-2xl font-medium">Welcome to Convocate</h2>
                    <p>Chat with different people</p>
                </div>

                <FilledButton
                    type='primary'
                    stretch
                >Go to chats</FilledButton>
            </FormCard>
        </main>

    );
}
export default isAuth(ChatPage);







