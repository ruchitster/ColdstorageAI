import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import "../styles/chatbot.css";

// AI ENGINE
import renderAI from "../ai/engine/renderAI";

export default function ChatBot() {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      type: "summary",
      title: "ERP AI Assistant",
      summary:
        "Ask me anything about Inward, Outward, Stock or Reports.",
    },
  ]);

  const chatEndRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message.trim() || loading)
      return;

    const userMsg = message;

    // USER MESSAGE
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        type: "text",
        text: userMsg,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {

      const res = await API.post(
        "/ai/chat",
        {
          question: userMsg,
        }
      );

      const data = res.data;

      console.log("AI RESPONSE:", data);

      // =========================
      // ENTERPRISE AI MESSAGE
      // =========================

      // TABLE / SQL RESULT
      if (
        Array.isArray(data.data) &&
        data.data.length > 0
      ) {

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            type: "ai-data",
            data: data.data,
            title: data.title || "",
            summary: data.summary || "",
          },
        ]);

      }

      // SUMMARY CARD
      else if (
        data.type === "summary" ||
        data.type === "card"
      ) {

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            ...data,
          },
        ]);

      }

      // FALLBACK
      else {

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            type: "text",
            text:
              data.message ||
              "No ERP data found",
          },
        ]);

      }

    } catch (err) {

      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          type: "error",
          title: "Server Error",
          message:
            "Backend not reachable",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };

  // =============================
  // ERP UI RENDERER
  // =============================
  const renderMessage = (msg) => {

    // USER
    if (msg.sender === "user") {
      return <p>{msg.text}</p>;
    }

    // ERROR
    if (msg.type === "error") {

      return (

        <div className="erp-error">

          <strong>
            {msg.title}
          </strong>

          <p>
            {msg.message}
          </p>

        </div>

      );
    }

    // SUMMARY / CARD
    if (
      msg.type === "card" ||
      msg.type === "summary"
    ) {

      return (

        <div className="erp-card">

          <h4>
            {msg.title}
          </h4>

          <p>
            {msg.summary}
          </p>

          {
            msg.fields?.length > 0 && (

              <div className="erp-fields">

                {
                  msg.fields.map((f, i) => (

                    <div
                      key={i}
                      className="erp-field"
                    >

                      <span>
                        {f.label}
                      </span>

                      <strong>
                        {f.value}
                      </strong>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

      );
    }

    // =============================
    // NEW ENTERPRISE AI ENGINE
    // =============================
    if (
      msg.type === "ai-data"
    ) {

      return (

        <div>

          {
            msg.title && (
              <h4 className="erp-title">
                {msg.title}
              </h4>
            )
          }

          {
            msg.summary && (
              <p className="erp-summary">
                {msg.summary}
              </p>
            )
          }

          {renderAI(msg.data)}

        </div>

      );
    }

    // FALLBACK TEXT
    return (
      <p>
        {msg.text || msg.message}
      </p>
    );
  };

  return (
    <>
      {/* FLOAT BUTTON */}

      <button
        className="chat-toggle"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {/* CHAT WINDOW */}

      {
        open && (

          <div className="chat-window">

            <div className="chat-header">
              ERP AI Assistant
            </div>

            <div className="chat-body">

              {
                messages.map((msg, index) => (

                  <div
                    key={index}
                    className={`
                      chat-message
                      ${msg.sender}
                    `}
                  >
                    {renderMessage(msg)}
                  </div>

                ))
              }

              {
                loading && (

                  <p className="loading-ai">
                    🤖 Processing ERP data...
                  </p>

                )
              }

              <div ref={chatEndRef} />

            </div>

            <div className="chat-footer">

              <input
                type="text"
                placeholder={
                  loading
                    ? "Processing..."
                    : "Ask ERP AI..."
                }
                value={message}
                disabled={loading}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    sendMessage();
                  }

                }}
              />

              <button
                onClick={sendMessage}
                disabled={
                  loading ||
                  !message.trim()
                }
              >
                {loading ? "..." : "Send"}
              </button>

            </div>

          </div>

        )
      }
    </>
  );
}