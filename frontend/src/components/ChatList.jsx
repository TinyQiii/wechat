import './ChatList.css';

const ChatList = ({ conversations, selectedId, onSelect }) => {
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const truncateMessage = (message, maxLength = 35) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  return (
    <div className="chat-list">
      {conversations.map((conversation, index) => (
        <div
          key={conversation.id}
          className={`chat-item ${selectedId === conversation.id ? 'active' : ''}`}
          onClick={() => onSelect(conversation)}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="chat-item-avatar">
            <img 
              src={conversation.user.avatar} 
              alt={conversation.user.nickname} 
            />
            <span className={`status-indicator ${conversation.user.status}`}></span>
          </div>
          
          <div className="chat-item-content">
            <div className="chat-item-header">
              <h4 className="chat-item-name">{conversation.user.nickname}</h4>
              <span className="chat-item-time">
                {formatTime(conversation.lastMessage.timestamp)}
              </span>
            </div>
            <div className="chat-item-footer">
              <p className="chat-item-message">
                {truncateMessage(conversation.lastMessage.content)}
              </p>
              {conversation.unreadCount > 0 && (
                <span className="unread-badge">
                  {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

