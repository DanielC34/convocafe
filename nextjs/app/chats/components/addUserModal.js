import {useEffect, useState} from "react";
import FilledButton from "@/components/buttons/filled-button";

const AddUserModal = ({onClose}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    // fetch users from the server

    useEffect(() => {
        setLoading(true)
        fetchUsers().then(data => {
            setUsers(data);
        }).finally(() => {
            setLoading(false)
        });
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
                {loading ? <AddUserListSkeleton/> : <AddUserList users={users}/>}
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
    return (
        <div className="mt-4">
            {users.map((user, index) => (
                <div key={index} className="
                            flex justify-between items-center
                            py-2
                            border-b
                        ">
                    <div>
                        <h3 className="text-lg">{user.username}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <FilledButton
                        dense
                        onClick={() => {
                            console.log('chat with user')
                        }}
                    >
                        Chat
                    </FilledButton>
                </div>
            ))}
        </div>
    )
}


async function fetchUsers() {

    // sleep for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    return [
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
}