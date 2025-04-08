import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    
    // Danh sách các câu hỏi gợi ý
    const quickReplies = [
        "Giày tây",
        "Giá bao nhiêu?",
        "Mua ở đâu?",
        "Chính sách bảo hành",
        "Chất liệu gì?",
        "Có size nào?",
        "Màu sắc có gì?",
        "Thời gian giao hàng",
        "Phí vận chuyển",
        "Chính sách đổi trả"
    ];

    const sendMessage = async (message = inputMessage) => {
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await axios.post('https://localhost:7043/api/Chat', {
                message: message
            });

            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Có lỗi xảy ra khi gửi yêu cầu.' };
            setMessages(prev => [...prev, errorMessage]);
        }

        setInputMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg h-[600px] d-flex flex-column justify-content-between">
            <div className="overflow-auto flex-grow-1 mb-3">
                <div className="list-group">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`list-group-item p-3 rounded mb-2 ${
                                msg.sender === 'user' 
                                    ? 'bg-primary text-white align-self-end' 
                                    : 'bg-light text-dark align-self-start'
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Thêm phần quick replies */}
            <div className="mb-3">
                <h6 className="text-muted mb-2">Câu hỏi thường gặp:</h6>
                <div className="d-flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                        <button
                            key={index}
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => sendMessage(reply)}
                        >
                            {reply}
                        </button>
                    ))}
                </div>
            </div>

            <div className="d-flex gap-2">
                {/* <input
                    type="text"
                    className="form-control flex-grow-1"
                    placeholder="Nhập tin nhắn..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    onClick={() => sendMessage()}
                    className="btn btn-primary px-4 align-self-center"
                >
                    Gửi
                </button> */}
            </div>
        </div>
    );
};

export default ChatBot;