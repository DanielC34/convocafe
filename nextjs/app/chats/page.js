'use client'
import FilledButton from "@/components/buttons/filled-button";
import FormCard from "@/components/cards/formCard";
import {useModalStore} from "@/app/chats/stores/modal";

export default function Page() {
    const openModal = useModalStore(state => state.open)

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
                    onClick={openModal}
                >Add user</FilledButton>

            </FormCard>
        </main>
    )
}