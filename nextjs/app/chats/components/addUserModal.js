import {useEffect} from "react";
import FilledButton from "@/components/buttons/filled-button";
import {useUserStore} from "@/app/chats/stores/users";
import {useRouter} from "next/navigation";
import {useModalStore} from "@/app/chats/stores/modal";
import {useChatStore} from "@/app/chats/stores/chats";

const AddUserModal = ({onClose}) => {
    const fetchUsers = useUserStore(state => state.fetchUsers)
    const users = useUserStore(state => state.users)
    const loadingUsers = useUserStore(state => state.loading)

    useEffect(() => {
         fetchUsers();
    }, []);

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div
            className="
                fixed top-0 left-0
                w-full h-full
                bg-gray-800 bg-opacity-50
                flex justify-center items-center
            "
            onClick={onClose}
        >
            <div
                className="
                    w-96
                    bg-white
                    rounded-md
                    p-4
                "
                onClick={stopPropagation}
            >
                <h2 className="text-xl font-semibold">Add User</h2>
                {loadingUsers ? <AddUserListSkeleton/> : <AddUserList users={users}/>}
                <div className="mt-4 flex justify-end items-center gap-4">
                    <FilledButton
                        dense
                        type='danger'
                        onClick={onClose}
                    > Close</FilledButton>
                </div>
            </div>
        </div>
    )

}

export default AddUserModal;

const AddUserListSkeleton = () => {
    return (
        <div className="mt-4">
            {Array(5).fill(5).map((_, index) => (
                <div key={index} className="
                    flex justify-between items-center
                    py-2
                    border-b
                ">
                    <div>
                        <div className="text-lg bg-gray-300 animate-pulse h-4 w-40 mb-2 rounded"></div>
                        <div className="text-sm bg-gray-300 animate-pulse h-3 w-20 rounded"></div>
                    </div>
                    <div className="bg-gray-300 animate-pulse h-8 w-14 rounded"></div>
                </div>
            ))}
        </div>
    )

}
const AddUserList = ({users}) => {

    const closeModal = useModalStore(state => state.close)
    const selectChat = useChatStore(state => state.selectChat)
    const router = useRouter()

    function onChatClick(user) {
        // add user to chat
        // addUserToStore(user)

        // set selected user id
        selectChat(user.id)

        // navigate to chat page
        router.push(`/chats/${user.id}`)

        // close modal
        closeModal()
    }

    return (
        <div className="mt-4">
            {users.map((user, index) => {
                return (
                    <div
                        key={index}
                        className={`
                            flex justify-between items-center
                            py-2
                            border-b
                            ${user.hasChat ? 'opacity-50 pointer-events-none' : ''}
                         `}

                            >
                        <div>
                            <h3 className="text-lg">{user.username}</h3>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        {(!user.hasChat && <FilledButton
                            dense
                            onClick={() => onChatClick(user)}
                        >Chat</FilledButton>)}
                    </div>
                );
            })}
        </div>
    )
}
