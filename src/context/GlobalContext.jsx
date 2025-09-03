import React, { useState, useEffect, createContext } from 'react'
import axios from '../services/axios'
import { useUser } from '@clerk/clerk-react'
import { io } from 'socket.io-client'

const AppContext = createContext()

const GlobalContext = ({ children }) => {
	const [User, setUser] = useState(null)
	const [selectedUser, setSelectedUser] = useState(null)
	const [allUsers, setallUsers] = useState([])
	const [socket, setSocket] = useState(null)
	const { user } = useUser()
	const [messages, setMessages] = useState([])
	const [displayList, setDisplayList] = useState([])
	const [Incoming, setIncoming] = useState([])
	const [sended, setSended] = useState([])
	const [contacts, setContacts] = useState([])
	const [loadingUsers , setLoadingUsers] = useState(true)

	async function loadUsers() {
		try {
			const r = await axios.get('/loadUsers')
			if (r.status === 200) {
				if (r.data.status === 0) alert("Something went wrong")
				if (r.data.status === 1) {
					setLoadingUsers(true)
					const users = r.data.users
					let usernameArray = [
						...User.contacts.map(item => item.username),
						...User.IncomingRequests.map(item => item.From.username),
						...User.SendRequest.map(item => item.To.username)
					]
					usernameArray.push(User.username)
					const filteredUsers = users.filter(item => !usernameArray.includes(item.username))
					setallUsers(filteredUsers)
					setLoadingUsers(false)
				}
			}
		} catch (err) {
			alert("Internal server error")
			console.log(err)
		}
	}

	useEffect(() => {
		async function test() {
			try{
				let r = await axios.get('/test-cors')
				if(r.status === 200) {
					alert("Request sent " + res.data)
				}
				else{
					alert("error in code")
				}
			}catch(err){
				alert("Request not sent to server")
			}
		}
		test()
	},[])

	async function sendRequest(to, username, avatar) {
		if (!User) return
		const obj = {
			to,
			username,
			avatar,
			myUsername: User.username,
			myavatar: User.avatar
		}
		try {
			const res = await axios.post('/send-request', obj)
			if (res.status === 200) {
				if (res.data.status === 2) alert("Request failed")
				if (res.data.status === 1) {
					alert("Request sent successfully")
					const newObj = { To: { userId: to, username, avatar }, status: "Pending" }
					setallUsers(prev => prev.filter(item => item.username !== username))
					setSended(prev => [...prev, newObj])
					let obj3 = {
						myusername: User.username,
						myavatar: User.avatar,
						myuserId: User.clerkId,
						userId: to,
						avatar: avatar,
						username: username
					}
					socket.emit('send-request' , obj3 )
				}
			}
		} catch (err) {
			alert('Internal server error')
		}
	}

	async function AcceptRequest(id, username, avatar) {
		if (!User) return
		const obj = {
			id,
			username,
			avatar,
			myusername: User.username,
			myavatar: User.avatar
		}
		try {
			const res = await axios.post('/accept-request', obj)
			if (res.status === 200) {
				if (res.data.status === 2) alert("Request failed")
				if (res.data.status === 1) {
					alert("Request accepted successfully")
					setIncoming(prev => prev.filter(item => item.From.username !== username))
					const newContact = {
						userId: id,
						username,
						avatar,
						messages: [],
						DisplayName: username || null
					}
					setContacts(prev => [...prev, newContact])
					let obj = {
						userId: id,
						myuserId: User.clerkId,
						username: User.username,
						avatar: User.avatar
					}
					socket.emit('accept-request' , obj)
				}
			}
		} catch (err) {
			alert('Internal server error')
		}
	}

	async function RejectRequest(id) {
		try {
			const res = await axios.post('/reject-request', { id })
			if (res.status === 200) {
				if (res.data.status === 2) alert("Request failed")
				if (res.data.status === 1) {
					alert("Request rejected successfully")
					setIncoming(prev => prev.filter(item => item.From.userId !== id))
				}
			}
		} catch (err) {
			alert('Internal server error')
		}
	}

	async function saveInDB() {
		try {
			const r = await axios.post('/saveUser')
			if (r.status === 200) {
				if (r.data.status === 0) alert("Something went wrong")
				if (r.data.status === 1) alert("Data saved in DB")
			}
		} catch (err) {
			alert("Internal server error")
			console.log(err)
		}
	}


	async function fetchUser() {
		try {
			const res = await axios.get('/me')
			if (res.status === 200) {
				if (res.data.status === 0 || res.data.status === 2) alert("Something went wrong")
				if (res.data.status === 1) {
					setUser(res.data.user)
					setContacts(res.data.user.contacts)
					setIncoming(res.data.user.IncomingRequests)
					setSended(res.data.user.SendRequest)
				}
			}
		} catch (err) {
			console.error(err)
			alert("Internal server error")
		}
	}

	useEffect(() => {
		if (User && user && user.id === User.clerkId) {
			const k = io(import.meta.env.VITE_REACT_APP_BACKEND_URL, { withCredentials: true })
			setSocket(k)
		}
	}, [user, User])

	useEffect(() => {
		if (selectedUser) {
			const contact = contacts.find(item => item.userId === selectedUser.userId)
			setSelectedUser(contact)
			setMessages(contact?.messages)
		}
	}, [selectedUser, contacts])

	return (
		<AppContext.Provider value={{
			User, setUser,
			selectedUser, setSelectedUser,
			loadUsers, saveInDB, fetchUser,
			socket, messages, setMessages,
			contacts, setContacts,
			allUsers, setallUsers,
			sendRequest, AcceptRequest, RejectRequest,
			displayList, setDisplayList,
			Incoming, setIncoming,
			sended, setSended, loadingUsers
		}}>
			{children}
		</AppContext.Provider>
	)
}

export { AppContext, GlobalContext }