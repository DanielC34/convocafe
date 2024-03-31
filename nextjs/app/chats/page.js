'use client'
import FilledButton from "@/components/buttons/filled-button";
import FormCard from "@/components/cards/formCard";
import {useRouter} from "next/navigation";

export default function Page({params}) {

    const router = useRouter();

    return (
        <main className="flex h-full justify-center items-center">
            <FormCard
            >
                <div className="gap-1 text-center w-full">
                    <h2 className="text-2xl font-medium">
                        Welcome to Convocate
                    </h2>
                    <p>Add new user to chat with privately</p>
                </div>
                <FilledButton
                    stretch
                    // type='secondary'
                    onClick={() => {
                        router.push('/chats/23');
                    }}
                >Add user</FilledButton>

            </FormCard>
        </main>
    )
}