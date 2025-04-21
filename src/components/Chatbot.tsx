import { useState, useRef, useEffect } from 'react';
import { Image, MessageCircle, Mic, Send, Sparkles, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { isBot: true, text: 'Hello! I\'m KrishiMitra, your AI farming assistant. How can I help you today?' }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { isBot: false, text: message }]);
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        const botResponses = [
          "I recommend using organic fertilizers for your paddy fields. They improve soil health and lead to better yield.",
          "Based on the weather forecast, you should delay irrigation for 2 days. There's rain expected tomorrow.",
          "For mango leaf spots, try neem oil spray. It's organic and effective against fungal infections.",
          "The best time to sow wheat in northern India is between October and November.",
          "Your crop appears healthy from your description. Continue with your current care routine."
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        setChatHistory(prev => [...prev, { isBot: true, text: randomResponse }]);
        setIsTyping(false);
      }, 1500);
      
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors group relative"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">1</span>
          <span className="absolute whitespace-nowrap right-16 bg-white text-green-700 px-3 py-1 rounded-md shadow-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with KrishiMitra
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col" style={{ height: '500px' }}>
          <div className="bg-gradient-to-r from-green-700 to-green-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="font-medium">KrishiMitra AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 max-w-[85%] animate-fadeIn ${msg.isBot ? 'ml-0' : 'ml-auto'}`}
              >
                <div className={`p-3 rounded-lg ${
                  msg.isBot 
                    ? 'bg-white border border-gray-200 shadow-sm' 
                    : 'bg-green-600 text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 max-w-[85%] ml-0">
                <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm inline-flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-end">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about farming, weather, crops..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={1}
                  style={{minHeight: '44px'}}
                />
                <div className="absolute right-2 bottom-2 flex space-x-1">
                  <button className="text-gray-400 hover:text-green-600 p-1">
                    <Image className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-green-600 p-1">
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`ml-2 ${
                  message.trim() 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-300 cursor-not-allowed'
                } text-white p-2 rounded-lg transition-colors`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-xs text-gray-500">Powered by EcoIndia AI • Your data is secure and private</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
