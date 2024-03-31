'use client'

import UserTile from "@/app/chats/components/userTile";
import {useState} from "react";

const UserList = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    async function handleUserClick(user) {
        setSelectedUser(user);
    }

    return (
        <div className="
            w-full h-full flex-col justify-start items-start inline-flex
            overflow-y-auto
            divide-y-2
        ">
            {users.map((user, index) => (
                <UserTile
                    key={index}
                    user={user}
                    onClick={() => handleUserClick(user)}
                    selected={selectedUser?.id === user.id}
                />
            ))}
        </div>
    )

}

export default UserList;


const users = [
    {
        id: 1,
        username: "Paul George",
        email: "paul@gmail.com"
    },
    {
        id: 2,
        username: "John Doe",
        email: "johndoe@gmail.com"
    },
    {
        id: 3,
        username: "Jane Doe",
        email: "janedoe@gmail.com"
    },
    {
        id: 4,
        username: "John Paul",
        email: "johnpaul@gmail.com"
    },
    {
        id: 5,
        username: "Jane Paul",
        email: "janepaul@gmail.com"
    },
    {
        id: 6,
        username: "Paul Collins",
        email: "paulcollins@gmail.com"
    },
    {
        id: 7,
        username: "John Collins",
        email: "johncollins@gmail.com"
    },
    {
        id: 8,
        username: "Jane Collins",
        email: "janecollins@gmail.com"
    },
    {
        id: 9,
        username: "John Paul",
        email: "johncollins@gmail.com"
    },
    {
        id: 10,
        username: "Jane Paul",
        email: "janecollins@gmail.com"
    },
]