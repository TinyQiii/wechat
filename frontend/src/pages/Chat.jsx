import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import './Chat.css';

// Mock data for demo
const mockConversations = [
  {
    id: '1',
    user: {
      id: 'u1',
      username: 'alice',
      nickname: 'Alice Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      status: 'online'
    },
    lastMessage: {
      content: 'Hey! How are you doing today? 😊',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false
    },
    unreadCount: 2
  },
  {
    id: '2',
    user: {
      id: 'u2',
      username: 'bob',
      nickname: 'Bob Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      status: 'offline'
    },
    lastMessage: {
      content: 'The meeting is scheduled for tomorrow at 3pm',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: '3',
    user: {
      id: 'u3',
      username: 'carol',
      nickname: 'Carol Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
      status: 'online'
    },
    lastMessage: {
      content: 'Thanks for your help! 🙏',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: '4',
    user: {
      id: 'u4',
      username: 'david',
      nickname: 'David Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      status: 'away'
    },
    lastMessage: {
      content: 'Check out this link I found',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: '5',
    user: {
      id: 'u5',
      username: 'emma',
      nickname: 'Emma Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      status: 'online'
    },
    lastMessage: {
      content: 'Let me know when you are free!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
      isRead: true
    },
    unreadCount: 5
  }
];

const mockMessages = {
  '1': [
    { id: 'm1', senderId: 'u1', content: 'Hi there! 👋', timestamp: new Date(Date.now() - 1000 * 60 * 30), status: 'read' },
    { id: 'm2', senderId: 'me', content: 'Hello Alice! How can I help you?', timestamp: new Date(Date.now() - 1000 * 60 * 25), status: 'read' },
    { id: 'm3', senderId: 'u1', content: 'I was wondering if you had time to review the project proposal?', timestamp: new Date(Date.now() - 1000 * 60 * 20), status: 'read' },
    { id: 'm4', senderId: 'me', content: 'Sure! Send it over and I\'ll take a look', timestamp: new Date(Date.now() - 1000 * 60 * 15), status: 'read' },
    { id: 'm5', senderId: 'u1', content: 'Great! I just sent it to your email', timestamp: new Date(Date.now() - 1000 * 60 * 10), status: 'read' },
    { id: 'm6', senderId: 'u1', content: 'Hey! How are you doing today? 😊', timestamp: new Date(Date.now() - 1000 * 60 * 5), status: 'delivered' },
  ],
  '2': [
    { id: 'm1', senderId: 'me', content: 'Did you get a chance to look at the report?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), status: 'read' },
    { id: 'm2', senderId: 'u2', content: 'Yes, I did! It looks great', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), status: 'read' },
    { id: 'm3', senderId: 'u2', content: 'The meeting is scheduled for tomorrow at 3pm', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), status: 'read' },
  ],
  '3': [
    { id: 'm1', senderId: 'u3', content: 'Could you help me with something?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), status: 'read' },
    { id: 'm2', senderId: 'me', content: 'Of course! What do you need?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5), status: 'read' },
    { id: 'm3', senderId: 'u3', content: 'Thanks for your help! 🙏', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), status: 'read' },
  ]
};

const Chat = () => {
  const { user, logout } = useAuth();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [showMobileChat, setShowMobileChat] = useState(false);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowMobileChat(true);
    
    // Load messages for this conversation
    if (!messages[conversation.id]) {
      setMessages(prev => ({
        ...prev,
        [conversation.id]: mockMessages[conversation.id] || []
      }));
    }

    // Clear unread count
    setConversations(prev => 
      prev.map(c => 
        c.id === conversation.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  const handleSendMessage = (content) => {
    if (!selectedConversation || !content.trim()) return;

    const newMessage = {
      id: `m${Date.now()}`,
      senderId: 'me',
      content: content.trim(),
      timestamp: new Date(),
      status: 'sent'
    };

    // Add message to conversation
    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }));

    // Update last message in conversation list
    setConversations(prev =>
      prev.map(c =>
        c.id === selectedConversation.id
          ? {
              ...c,
              lastMessage: {
                content: content.trim(),
                timestamp: new Date(),
                isRead: true
              }
            }
          : c
      )
    );

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(m =>
          m.id === newMessage.id ? { ...m, status: 'delivered' } : m
        )
      }));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [selectedConversation.id]: prev[selectedConversation.id].map(m =>
          m.id === newMessage.id ? { ...m, status: 'read' } : m
        )
      }));
    }, 2000);
  };

  const handleBack = () => {
    setShowMobileChat(false);
  };

  return (
    <div className="chat-container">
      <div className={`chat-sidebar ${showMobileChat ? 'hidden-mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="user-info">
            <img src={user?.avatar} alt={user?.nickname} className="user-avatar" />
            <div className="user-details">
              <h3>{user?.nickname}</h3>
              <span className="user-status">
                <span className="status-dot online"></span>
                Online
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn" title="Add friend">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M19 8v6M22 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="icon-btn" title="Settings" onClick={logout}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="search-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input type="text" placeholder="Search conversations..." className="search-input" />
        </div>

        <ChatList
          conversations={conversations}
          selectedId={selectedConversation?.id}
          onSelect={handleSelectConversation}
        />
      </div>

      <div className={`chat-main ${showMobileChat ? 'show-mobile' : ''}`}>
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            messages={messages[selectedConversation.id] || []}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        ) : (
          <div className="no-chat-selected">
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Select a conversation</h3>
              <p>Choose a chat from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

