import { useState, useRef, useEffect } from 'react';
import { askAIAssistant } from '../api/chatApi';

function FloodAIAssistant() {
    const [chatQuestion, setChatQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'ai', text: 'မင်္ဂလာပါ! ကျွန်တော်က FloodAware ရဲ့ ဉာဏ်ရည်တု ရေဘေးအန္တရာယ်ဆိုင်ရာ အကြံပေး assistant ဖြစ်ပါတယ်။\n\nရေကြီးရေလျှံမှု ကြိုတင်ပြင်ဆင်ရန်နည်းလမ်းများ၊ အရေးပေါ်အထုပ် (Emergency Kit) ပြင်ဆင်ခြင်း သို့မဟုတ် သဘာဝဘေးအန္တရာယ်နှင့် ပတ်သက်သည့် မေးခွန်းများကို မြန်မာလို စိတ်ကြိုက် မေးမြန်းနိုင်ပါတယ်ခင်ဗျာ။' }
    ]);
    const [chatLoading, setChatLoading] = useState(false);
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, chatLoading]);

    const handleSendChat = async (e) => {
        e.preventDefault();
        if (!chatQuestion.trim() || chatLoading) return;

        const userMsg = chatQuestion;
        setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
        setChatQuestion('');
        setChatLoading(true);

        try {
            const contextData = {
                township: 'General Myanmar',
                weather: 'General',
                riskLevel: 'General Inquiry'
            };
            const data = await askAIAssistant(userMsg, contextData);
            setChatHistory(prev => [...prev, { sender: 'ai', text: data.reply }]);
        } catch (err) {
            setChatHistory(prev => [...prev, { sender: 'ai', text: 'တောင်းပန်ပါတယ်။ AI တုံ့ပြန်မှု မအောင်မြင်ပါ။ ခဏနေမှ ပြန်မေးပေးပါ။' }]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[calc(100vh-120px)] min-h-[500px]">
                
                {/* Chat Header */}
                <div className="bg-slate-800 text-white px-6 py-4 flex items-center gap-3 border-b border-slate-700">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div>
                        <h2 className="font-bold text-lg">FloodAware AI Chatbot</h2>
                        <p className="text-xs text-slate-400">24/7 ရေဘေးအန္တရာယ် အမေး-အဖြေ စနစ်</p>
                    </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-base leading-relaxed whitespace-pre-wrap ${
                                msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {chatLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 text-slate-400 rounded-2xl rounded-bl-none px-4 py-3 text-sm shadow-sm animate-pulse">
                                AI စဉ်းစားပြီး အဖြေရှာနေပါသည်...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat Input Area */}
                <form onSubmit={handleSendChat} className="p-4 border-t border-slate-200 bg-white flex gap-3">
                    <input
                        type="text"
                        placeholder="ဥပမာ - ရေကြီးရင် အရေးပေါ် ဘာတွေပြင်ဆင်ထားရမလဲ?"
                        value={chatQuestion}
                        onChange={(e) => setChatQuestion(e.target.value)}
                        className="flex-1 px-4 py-3 text-base border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={chatLoading || !chatQuestion.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold rounded-xl transition disabled:opacity-40 shadow-sm"
                    >
                        မေးမည်
                    </button>
                </form>

            </div>
        </div>
    );
}

export default FloodAIAssistant;