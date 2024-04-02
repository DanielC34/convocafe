'use client'

import UserTile from "@/app/chats/components/userTile";
import {useUserStore} from "@/app/chats/stores/users";

const UserList = () => {
    const users = useUserStore(state => state.users)
    return (
        <div className="
            w-full h-full flex-col justify-start items-start inline-flex
            overflow-y-auto
            divide-y-2
        ">
            {
                users.map((user, index) => (
                <UserTile
                    key={user.id}
                    user={user}
                />
            ))
            }
        </div>
    )
}

export default UserList;