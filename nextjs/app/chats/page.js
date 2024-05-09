'use client'
import FilledButton from "@/components/buttons/filled-button";
import FormCard from "@/components/cards/formCard";
import {useModalStore} from "@/app/chats/stores/modal";
import {useEffect} from "react";
import {useAuthStore} from "@/app/stores/auth";
import {isAuth} from "@/utils/auth";

const ChatPage = () => {
    const openModal = useModalStore(state => state.open)
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
    useEffect(() => {
        fetchCurrentUser()

    }, [])

    return (
      <main className="flex h-full justify-center items-center">
        <FormCard>
          <div className="gap-1 text-center w-full">
            <h2 className="text-2xl font-medium">Welcome to Convocate</h2>
            <p>Add new user to chat with privately</p>
          </div>
          <div className="w-full justify-start items-start gap-[30px] inline-flex ">
            <FilledButton
              stretch
              type='primary'
              onClick={openModal}
            >
              Add user
            </FilledButton>
            <FilledButton
              stretch
              type='secondary'
              //onClick={openModal}
            >
              Create group
            </FilledButton>
          </div>
        </FormCard>
      </main>
    );
}


export default isAuth(ChatPage);