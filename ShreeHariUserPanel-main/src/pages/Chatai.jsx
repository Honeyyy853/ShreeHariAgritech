import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Navbar, Footer } from "../components";
import { useNavigate } from "react-router-dom";

function Chatai() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isLoading]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setChat((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error(error);
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        .chat-wrapper {
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 120px);
          padding: 16px;
          box-sizing: border-box;
        }

        .chat-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.1);
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          flex: 1;
          background: #fff;
        }

        .chat-header {
          background: linear-gradient(135deg, #2e7d32, #66bb6a);
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .chat-header-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .chat-header-info h5 {
          margin: 0;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
        }

        .chat-header-info p {
          margin: 0;
          color: rgba(255,255,255,0.8);
          font-size: 12px;
        }

        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f4f9f5;
          min-height: 300px;
          max-height: calc(100vh - 280px);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 200px;
          color: #90a4a2;
          gap: 8px;
        }

        .empty-state-icon {
          font-size: 40px;
          opacity: 0.5;
        }

        .empty-state p {
          font-size: 14px;
          margin: 0;
        }

        .msg-row {
          display: flex;
          margin-bottom: 12px;
          align-items: flex-end;
          gap: 8px;
        }

        .msg-row.user {
          justify-content: flex-end;
        }

        .msg-row.ai {
          justify-content: flex-start;
        }

        .msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
        }

        .msg-avatar.ai-avatar {
          background: #2e7d32;
          color: #fff;
        }

        .msg-bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.55;
          word-break: break-word;
        }

        .msg-bubble.user {
          background: #2e7d32;
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        .msg-bubble.ai {
          background: #fff;
          color: #1a1a1a;
          border: 1px solid rgba(0,0,0,0.08);
          border-bottom-left-radius: 4px;
        }

        .msg-bubble.ai p { margin: 0 0 6px; }
        .msg-bubble.ai p:last-child { margin-bottom: 0; }
        .msg-bubble.ai pre {
          background: #f0f4f0;
          border-radius: 8px;
          padding: 10px;
          overflow-x: auto;
          font-size: 13px;
        }
        .msg-bubble.ai code {
          font-size: 13px;
        }
        .msg-bubble.ai ul, .msg-bubble.ai ol {
          padding-left: 18px;
          margin: 4px 0;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 12px 16px;
        }

        .typing-dot {
          width: 7px;
          height: 7px;
          background: #90c895;
          border-radius: 50%;
          animation: bounce 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .chat-input-area {
          padding: 12px 14px;
          border-top: 1px solid rgba(0,0,0,0.08);
          background: #fff;
          display: flex;
          gap: 8px;
          align-items: flex-end;
          flex-shrink: 0;
        }

        .chat-input {
          flex: 1;
          resize: none;
          border: 1px solid #d0e8d2;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 14px;
          line-height: 1.5;
          outline: none;
          background: #f7faf7;
          color: #1a1a1a;
          transition: border-color 0.2s;
          max-height: 120px;
          font-family: inherit;
        }

        .chat-input:focus {
          border-color: #2e7d32;
          background: #fff;
        }

        .chat-input::placeholder { color: #aac8ac; }

        .send-btn {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: none;
          background: #2e7d32;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.1s;
        }

        .send-btn:hover:not(:disabled) { background: #1b5e20; }
        .send-btn:active:not(:disabled) { transform: scale(0.95); }
        .send-btn:disabled { background: #a5c8a7; cursor: not-allowed; }

        @media (max-width: 576px) {
          .chat-wrapper { padding: 0; min-height: calc(100vh - 110px); }
          .chat-card { border-radius: 0; border-left: none; border-right: none; border-bottom: none; box-shadow: none; }
          .chat-body { max-height: calc(100vh - 260px); }
          .msg-bubble { max-width: 85%; font-size: 13.5px; }
          .chat-header { padding: 12px 14px; }
        }
      `}</style>

      <Navbar />

      <div className="chat-wrapper">
        <div className="chat-card">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">🤖</div>
            <div className="chat-header-info">
              <h5>Gemini AI Assistant</h5>
              <p>{isLoading ? "Typing..." : "Online"}</p>
            </div>
          </div>

          {/* Chat Body */}
          <div className="chat-body">
            {chat.length === 0 && !isLoading && (
              <div className="empty-state">
                <div className="empty-state-icon">💬</div>
                <p>Start a conversation!</p>
                <p>Ask me anything...</p>
              </div>
            )}

            {chat.map((msg, index) => (
              <div key={index} className={`msg-row ${msg.sender}`}>
                {msg.sender === "ai" && (
                  <div className="msg-avatar ai-avatar">AI</div>
                )}
                <div className={`msg-bubble ${msg.sender}`}>
                  {msg.sender === "ai" ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="msg-row ai">
                <div className="msg-avatar ai-avatar">AI</div>
                <div className="msg-bubble ai">
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <textarea
              ref={inputRef}
              className="chat-input"
              rows={1}
              value={message}
              placeholder="Ask something... (Enter to send)"
              onChange={(e) => {
                setMessage(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={isLoading || !message.trim()}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Chatai;