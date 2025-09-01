import { useUser, UserButton, useAuth, UserProfile } from '@clerk/clerk-react';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingPage from '../components/Loading'
import axios from '../services/axios'
import { AppContext } from '../context/GlobalContext'
import Sidebar from '../components/Sidebar'
import Screen from '../components/Screen';
import UserPage from '../components/UserPage';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate()
  const location = useLocation()
  const { User, messages, setUser, selectedUser, setSelectedUser, loadUsers, saveInDB, Incoming, fetchUser, socket, contacts, setContacts, setIncoming } = useContext(AppContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (socket) {
      socket.emit('register', (user.id))

      socket.on('registered', (id) => {
        console.log(id)
      })
    }
  }, [socket])

  useEffect(() => {
    if (!socket || !user) return;
    const handleDisconnect = () => {
      socket.emit('user-disconnect', JSON.stringify(contacts), User.clerkId);
    };
    window.addEventListener('beforeunload', handleDisconnect);
    return () => {
      window.removeEventListener('beforeunload', handleDisconnect);
      socket.emit('user-disconnect', JSON.stringify(contacts), User.clerkId);
    };
  }, [socket, user, messages]);

  useEffect(() => {
    if (user) {
      const params = new URLSearchParams(location.search);
      if (params.get('newUser') === 'true') {
        saveInDB().finally(() => setLoading(false));
        navigate('/dashboard')
      } else {
        fetchUser().finally(() => setLoading(false));
      }
    }
  }, [user]);

  useEffect(() => {
    if (User) {
      loadUsers()
    }
  }, [User])

  useEffect(() => {
    if (!socket) return;

    const handleRecievedMessage = (obj) => {
      const obj1 = {
        from: obj.from,
        message: obj.msg,
        byMe: false
      };
      const obj2 = {
        byMe: false,
        message: obj.msg,
        Time: obj.Time,
        Date: obj.Date,
        status: "seen"
      }
      setContacts(prevContacts =>
        prevContacts.map(item =>
          item.userId === obj.from
            ? { ...item, messages: [...item.messages, obj2] }
            : item
        )
      );
    };

    const handleRecievedRequest = (obj) => {
      let obj2 = {
        From: {
          userId: obj.userId,
          username: obj.username,
          avatar: obj.avatar
        },
        status: "pending"
      }
      let r = Incoming.find(item => item.From.userId === obj.userId)
      if(!r) {
        setIncoming(prev => [...prev, obj2]);
      }
    }

    const handleAccepted = (obj) => {
      let obj2 = {
        userId: obj.userId,
        username: obj.username,
        avatar : obj.avatar,
        messages: [],
        DisplayName: obj.username || null
      }
      let r = contacts.find(item => item.userId === obj.userId)
      if(!r){
        setContacts(prev => [...prev , obj2])
      }
    }

    const handleOnlineStatus = (id) => {
      setContacts(prev => prev.map(item => item.userId === id ? {...item , status:"online"} :item))
    }

    const handleOfllineStatus = (id) => {
      setContacts(prev => prev.map(item => item.userId === id?{...item , status:"offline"}:item))
    }

    socket.on('recieve-message', handleRecievedMessage);
    socket.on('recieved-request', handleRecievedRequest)
    socket.on('accepted', handleAccepted)
    socket.on('Online-status' , handleOnlineStatus)
    socket.on('Offline-status' , handleOfllineStatus)

    return () => {
      socket.off('recieve-message', handleRecievedMessage);
    };
  }, [socket]);

  if (loading) return <LoadingPage />

  return (
    <div className="bg-gray-100">
      <div className="flex h-screen">
        <Sidebar />
        {selectedUser ? (<Screen />) : (<div className="hidden md:flex md:fixed right-0 w-[75vw] h-[100vh]">
          <div className="flex items-center justify-center mx-auto my-2">
            <UserPage user={user} />
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default Dashboard;