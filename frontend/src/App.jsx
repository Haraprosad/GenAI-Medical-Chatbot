import { useState, useEffect, useRef } from "react";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaSpinner,
  FaTrash,
  FaKeyboard,
  FaHeartbeat,
  FaInfoCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import apiService from "./services/api";
import Welcome from "./components/Welcome";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Set initial render to false after component mounts
  useEffect(() => {
    setInitialRender(false);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll to bottom if there are messages
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Add keyboard event listeners for shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K to clear chat
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        handleClearChat();
      }

      // Esc to close shortcuts modal
      if (e.key === "Escape" && showShortcuts) {
        setShowShortcuts(false);
      }

      // Ctrl/Cmd + / to show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setShowShortcuts(true);
      }

      // Ctrl/Cmd + D to toggle dark mode
      if ((e.ctrlKey || e.metaKey) && e.key === "d") {
        e.preventDefault();
        setDarkMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showShortcuts]);

  // Focus input field on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (input.trim() === "") return;

    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input field
    const currentInput = input;
    setInput("");

    // Set loading state
    setIsLoading(true);

    try {
      // Use the API service to send message to backend
      const response = await apiService.sendMessage(currentInput);

      // Add bot response to chat
      const botMessage = { text: response.answer, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with API:", error);

      // Add error message to chat
      const errorMessage = {
        text: "Sorry, I encountered an error processing your request. Please try again later.",
        sender: "bot",
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle selection of a sample question from the Welcome component
  const handleSelectQuestion = (question) => {
    setInput(question);
    setTimeout(() => {
      handleSubmit();
    }, 100);
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-subtle from-blue-50 via-background to-blue-50"
      }`}
    >
      {/* Keyboard shortcuts modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className={`rounded-xl p-6 max-w-md w-full animate-slide-up ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white shadow-custom-lg"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center">
                <FaKeyboard className="mr-2" /> Keyboard Shortcuts
              </h3>
              <button
                className={`hover:text-gray-700 ${
                  darkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500"
                }`}
                onClick={() => setShowShortcuts(false)}
              >
                &times;
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Clear conversation</span>
                <span
                  className={`px-2 py-1 rounded text-sm font-mono ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  Ctrl/⌘ + K
                </span>
              </div>
              <div className="flex justify-between">
                <span>Show shortcuts</span>
                <span
                  className={`px-2 py-1 rounded text-sm font-mono ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  Ctrl/⌘ + /
                </span>
              </div>
              <div className="flex justify-between">
                <span>Toggle dark mode</span>
                <span
                  className={`px-2 py-1 rounded text-sm font-mono ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  Ctrl/⌘ + D
                </span>
              </div>
              <div className="flex justify-between">
                <span>Focus input</span>
                <span
                  className={`px-2 py-1 rounded text-sm font-mono ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  Esc
                </span>
              </div>
              <div className="flex justify-between">
                <span>Send message</span>
                <span
                  className={`px-2 py-1 rounded text-sm font-mono ${
                    darkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  Enter
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 relative max-w-6xl mx-auto px-4 py-8 w-full">
        {/* Decorative Elements */}
        <div className="blob-decoration blob-decoration-1"></div>
        <div className="blob-decoration blob-decoration-2"></div>

        <header className="text-center mb-8 relative z-10">
          <div className="flex items-center justify-center mb-2">
            <div className="relative mr-3">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-full">
                <FaHeartbeat className="text-2xl text-white" />
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-70"></div>
            </div>
            <h1
              className={`text-4xl font-display font-bold ${
                darkMode ? "text-white" : "text-text-primary"
              }`}
            >
              Medical <span className="text-primary-600">Assistant</span>
            </h1>
          </div>
          <p
            className={`mt-2 ${
              darkMode ? "text-gray-300" : "text-text-secondary"
            }`}
          >
            Your AI-powered healthcare companion
          </p>
        </header>

        <main
          ref={chatContainerRef}
          className={`chat-container flex flex-col flex-1 backdrop-blur-sm transition-opacity duration-300 ${
            initialRender ? "opacity-0" : "opacity-100"
          } ${
            darkMode
              ? "bg-gray-800/90 border border-gray-700"
              : "bg-white/90 border border-light-border"
          }`}
        >
          {/* Chat Header with Controls */}
          <div
            className={`border-b p-3 flex justify-between items-center ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-1.5 rounded-full mr-2 ${
                  darkMode ? "bg-secondary-700" : "bg-secondary-100"
                }`}
              >
                <FaRobot
                  className={`${
                    darkMode ? "text-secondary-300" : "text-secondary-600"
                  }`}
                />
              </div>
              <span className="font-medium">Medical Chatbot</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${
                  darkMode
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button
                onClick={() => setShowShortcuts(true)}
                className={`p-2 rounded-full transition-colors ${
                  darkMode
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
                title="Keyboard shortcuts"
              >
                <FaKeyboard />
              </button>
              <button
                onClick={handleClearChat}
                disabled={messages.length === 0}
                className={`p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
                title="Clear conversation"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            className={`flex-1 overflow-y-auto p-4 space-y-2 ${
              darkMode
                ? "bg-medical-pattern bg-gray-800"
                : "bg-medical-pattern bg-white"
            }`}
            style={{ overscrollBehavior: "contain" }}
          >
            {messages.length === 0 ? (
              <Welcome onSelectQuestion={handleSelectQuestion} />
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div
                      className={`flex-shrink-0 rounded-full p-2 text-white ${
                        message.isError ? "bg-red-500" : "bg-secondary-500"
                      }`}
                    >
                      <FaRobot size={16} />
                    </div>
                  )}

                  <div
                    className={`message ${
                      message.sender === "user"
                        ? "message-user text-white"
                        : `message-bot ${
                            darkMode
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-text-primary"
                          }`
                    } ${
                      message.isError
                        ? "!bg-red-100 !text-red-700 border border-red-300"
                        : ""
                    }`}
                  >
                    {message.text}
                  </div>

                  {message.sender === "user" && (
                    <div className="flex-shrink-0 bg-primary-500 rounded-full p-2 text-white user-avatar">
                      <FaUser size={16} />
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 justify-start">
                <div className="flex-shrink-0 bg-secondary-500 rounded-full p-2 text-white">
                  <FaRobot size={16} />
                </div>

                <div
                  className={`message message-bot ${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-text-primary"
                  }`}
                >
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className={`p-4 ${
              darkMode
                ? "bg-gray-800 border-t border-gray-700"
                : "bg-white border-t border-gray-200"
            }`}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your medical question here..."
                className={`input pr-12 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-primary-500"
                    : "bg-white"
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || input.trim() === ""}
                className={`send-button absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isLoading || input.trim() === ""
                    ? "opacity-50 cursor-not-allowed"
                    : darkMode
                    ? "text-primary-400 hover:bg-gray-600"
                    : "text-primary-600 hover:bg-gray-100"
                }`}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" size={18} />
                ) : (
                  <FaPaperPlane size={18} />
                )}
              </button>
            </div>
          </form>
        </main>

        <footer
          className={`py-4 text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-2">
            <FaInfoCircle size={14} />
            <p className="text-sm">
              Not a substitute for professional medical advice, diagnosis, or
              treatment.
            </p>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Medical Assistant | Powered by LLM
            Technology
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
