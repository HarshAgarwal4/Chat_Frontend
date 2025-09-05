import React, { useContext, useState } from "react";
import { AppContext } from "../context/GlobalContext";
import { useForm } from "react-hook-form";
import axios from "../services/axios";

const Contact = ({ item }) => {
    const [editMode, setEdit] = useState(false);
    const { selectedUser, setSelectedUser ,contacts, setContacts , User} = useContext(AppContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function updateName(id , name) {
        let obj = {
            id,
            name,
            userId: User.clerkId
        }
        try{
            let res = await axios.post('/setname' , obj)
            if(res.status === 200) {
                if(res.data.status === 2) return alert('name not updated')
                if(res.data.status === 0) return alert('Intrnal Server error')
                if(res.data.status === 1) {
                    alert("name successfully changed")
                    let k = contacts.map(item => item.userId === id?{...item , DisplayName:name}:item)
                    setContacts(k)
                }
            }
        }catch(err){
            alert("Internal Server error")
        }
    }

    const onSubmit = async (data) => {
        await updateName(item.userId , data.name)
        setEdit(false);
    };

    return (
        <div onClick={() => setSelectedUser(item)} className="flex w-[100%] justify-between items-center bg-red-50 border-l-4 border-red-500 cursor-pointer mx-auto">
            <div className="px-2 py-3 flex items-center gap-3">
                <img src={item.avatar} className="w-10 h-10 rounded-full" />
                {editMode ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="flex" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <input
                                {...register("name", {
                                    required: { value: true, message: "This field is required" },
                                    minLength: { value: 1, message: "Min length should be 1" },
                                    maxLength: { value: 20, message: "Max length should be 20" },
                                    validate: (value) => {
                                        const regex = /^[A-Za-z0-9 ]+$/;
                                        return regex.test(value) || "Only letters, numbers, and spaces are allowed";
                                    },
                                })}
                                type="text"
                                placeholder="Type here"
                                className="input"
                            />
                            {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
                        </div>

                        <button type="submit" className="btn btn-square">✅</button>
                        <button onClick={() => { setEdit(false); }} className="btn btn-square">❌</button>
                    </form>
                ) : (
                    <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.DisplayName}</p>
                    </div>
                )}
            </div>

            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">⋮</div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 shadow-sm">
                    <li><button onClick={() => setEdit(true)}>Edit</button></li>
                </ul>
            </div>
        </div>
    );
};

export default Contact;
