import React, { useState, useEffect, useContext } from "react";
import { UserButton } from "@clerk/clerk-react";
import { AppContext } from "../context/GlobalContext";
import Contact from "./Contact";

const Sidebar = () => {
  const {
    setSelectedUser, contacts, allUsers, sendRequest,
    AcceptRequest, RejectRequest, displayList, setDisplayList,
    Incoming, sended, loadingUsers, fetchUser
  } = useContext(AppContext)

  const [section, setSection] = useState('contacts')
  const [addUsers, setAddUsers] = useState(false)
  const [msg, setMsg] = useState("No contacts added yet")

  useEffect(() => {
    switch (section) {
      case 'contacts':
        setDisplayList(contacts)
        setAddUsers(false)
        setMsg("No contacts added yet")
        break
      case 'sent':
        setDisplayList(sended)
        setAddUsers(false)
        setMsg("You didn't send any request")
        break
      case 'Incoming':
        setDisplayList(Incoming)
        setAddUsers(false)
        setMsg("You don't have any requests")
        break
      case 'addUsers':
        setDisplayList([])
        setAddUsers(true)
        setMsg("Search users")
        break
      default:
        setDisplayList(contacts)
        setAddUsers(false)
    }
  }, [section, contacts, sended, Incoming, allUsers, setDisplayList])

  const handleChange = (e) => {
    const searchText = e.target.value.trim().toLowerCase()
    if (!addUsers) {
      const matches = contacts.filter(item =>
        item.DisplayName?.toLowerCase().includes(searchText)
      )
      const nonMatches = contacts.filter(item =>
        !item.DisplayName?.toLowerCase().includes(searchText)
      )
      setDisplayList([...matches, ...nonMatches])
    } else {
      setDisplayList(
        searchText ? allUsers.filter(item => item.username.toLowerCase().includes(searchText)) : []
      )
    }
  }

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] md:w-[25vw] bg-purple-50 border-r flex flex-col">
      <div className="flex justify-around p-4 py-6  ">
        <UserButton />
        <button className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => setSection('contacts')}>🧾</button>
        <button className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => setSection('Incoming')}>📥</button>
        <button className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => setSection('sent')}>📤</button>
        <button className="text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => setSection('addUsers')}>👤</button>
      </div>

      <div className="p-4 py-6">
        <input
          type="text"
          placeholder="Search user"
          className="w-full rounded-full px-4 py-2 border border-black focus:outline-none focus:ring focus:ring-blue-300"
          onInput={handleChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {displayList.length === 0 ? (
          <span className="text-center py-5 text-black">{msg}</span>
        ) : (
          displayList.map((item, idx) => {
            if (section === 'contacts') {
              return (
                <Contact key={idx} item={item} />
              )
            }
            else if (section === 'addUsers') {
              return (
                <div key={idx} className="px-2 py-3 flex justify-around items-center gap-3 bg-red-50 border-l-4 border-red-500 cursor-pointer">
                  <div className="flex gap-6 justify-center items-center">
                    <img src={item.avatar} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.username}</p>
                    </div>
                  </div>
                  <button onClick={() => sendRequest(item.clerkId, item.username, item.avatar)} className="px-3 py-1 bg-green-400 rounded-2xl text-white">Send</button>
                </div>
              )
            }
            else if (section === 'sent') {
              return (
                loadingUsers ? (<span className="loading"></span>) : (
                  <div key={idx} className="px-2 py-3 flex justify-around items-center gap-3 bg-red-50 border-l-4 border-red-500">
                    <div className="flex gap-6 justify-center items-center">
                      <img src={item?.To?.avatar} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item?.To?.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                      <div>{item.status}</div>
                      {item.status === "Rejected" && (
                        <button onClick={() => sendRequest(item.To.userId, item.To.username, item.To.avatar)} className="cursor-pointer bg-green-300 px-4 py-1 rounded-2xl">Resend</button>
                      )}
                    </div>
                  </div>
                )
              )
            }
            else if (section === 'Incoming') {
              return (
                <div key={idx} className="px-2 py-3 flex justify-around items-center gap-3 bg-red-50 border-l-4 border-red-500">
                  <div className="flex gap-6 justify-center items-center">
                    <img src={item?.From?.avatar} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item?.From?.username}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => RejectRequest(item.From.userId)} className="cursor-pointer">❌</button>
                    <button onClick={() => AcceptRequest(item.From.userId, item.From.username, item.From.avatar)} className="cursor-pointer">✅</button>
                  </div>
                </div>
              )
            }
          })
        )}
      </div>
    </div>
  )
}

export default Sidebar
