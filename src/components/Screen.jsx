import React, { useContext, useEffect, useRef } from "react"; import { AppContext } from "../context/GlobalContext"; import { useForm } from 'react-hook-form'; import Message from "./Message"; import Recievd from './Recievd';

const Screen = () => {
    const { selectedUser, setSelectedUser, socket, setMessages, messages, User, contacts, setContacts } = useContext(AppContext);
    const { register, handleSubmit, reset } = useForm();

    const bottomRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) return;
        const user = contacts.find(item => item.userId === selectedUser.userId);
        setMessages(user ? user.messages : []);
    }, [selectedUser, contacts, setMessages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const onSubmit = (data) => {
        let time = new Date();
        let obj = {
            from: User.clerkId,
            to: selectedUser.userId,
            msg: data.msg,
        };
        socket.emit('send-message', obj);

        reset();

        setContacts(prevContacts =>
            prevContacts.map(item =>
                item.userId === selectedUser.userId
                    ? {
                        ...item, messages: [...item.messages, {
                            byMe: true, message: data.msg, Time: time.toLocaleTimeString().slice(0, 5),
                            Date: "09/02/2025" ,//time.toLocaleDateString(),
                            status: "seen"
                        }]
                    }
                    : item
            )
        );
    };

    return (
        <div className="flex-1 fixed w-[100vw] md:w-[75vw] right-0 h-[100vh] flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={selectedUser.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
                    <div>
                        <h2 className="font-semibold">{selectedUser.DisplayName}</h2>
                        <p className="text-sm text-green-500">{selectedUser.status === 'online' && 'Online now'}</p>
                    </div>
                </div>
                <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-500 hover:text-red-500"
                >
                    ❌
                </button>
            </div>

            {/* Messages with Date Grouping */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
                {(() => {
                    let lastDate = null;
                    return messages.map((item, idx) => {
                        const showDivider = lastDate !== item.Date;
                        lastDate = item.Date;

                        return (
                            <div key={idx}>
                                {showDivider && (
                                    <div className="flex justify-center my-2">
                                        <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full shadow">
                                            {item.Date}
                                        </span>
                                    </div>
                                )}

                                {item.byMe ? (
                                    <Message Time={item.Time} status={item.status} message={item.message} />
                                ) : (
                                    <Recievd message={item.message} />
                                )}
                            </div>
                        );
                    });
                })()}
                <div ref={bottomRef}></div>
            </div>

            {/* Input form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 border-t flex items-center gap-4"
            >
                <input
                    {...register('msg', {
                        required: "Message is required",
                        minLength: { value: 1, message: "Message too short" },
                        validate: (value) => value.trim() !== '' || "No spaces allowed"
                    })}
                    type="text"
                    placeholder="Type your message and press enter…"
                    className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded-full">➤</button>
            </form>
        </div>
    );


};

export default Screen;