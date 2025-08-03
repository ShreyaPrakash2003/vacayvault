import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import chatbotMeow from '../assets/chatbotmeow.jpg';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('https://hotel-chatbot-3qmn.onrender.com/chat', {
        message: userInput,
      });

      const botMessage = { sender: 'bot', text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: 'Error: failed to fetch response.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error(error);
    }

    setUserInput('');
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full fixed bottom-4 right-4 z-50 bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-400 p-1 shadow-xl flex items-center justify-center transition hover:scale-105"
      >
        <div className="bg-[#0f0f0f] w-full h-full rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={chatbotMeow}
            alt="Chatbot Icon"
            className="w-10 h-10 object-cover rounded-full"
          />
        </div>
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-xl shadow-xl border flex flex-col z-50">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-t-xl">
            Hotel Chatbot
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-100 self-end ml-auto text-right'
                    : 'bg-gray-100 self-start mr-auto'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 flex border-t gap-2">
            <input
              type="text"
              className="flex-1 px-2 py-1 border rounded-lg text-sm"
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
