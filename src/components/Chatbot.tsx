import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Sparkles, User, RefreshCw, AlertCircle } from 'lucide-react';
import { faqs } from '../data/education';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const quickQuestions = [
  { text: 'Will this affect my insurance?', tag: 'insurance' },
  { text: 'How much does FH testing cost?', tag: 'cost' },
  { text: 'Does it affect my family members?', tag: 'family' },
  { text: 'What should I prepare?', tag: 'prep' },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: "Hello! I am HealthBuddy, your GovTech Singapore FH Assistant. I can help answer questions about Familial Hypercholesterolaemia (FH), test costs, insurance moratoriums, and booking. What's on your mind today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate GovTech Smart Bot response
    setTimeout(() => {
      let botResponse = '';
      const query = text.toLowerCase();

      if (query.includes('insurance') || query.includes('shield') || query.includes('policy')) {
        botResponse = "In Singapore, you are highly protected. Under the LIA Moratorium, insurers cannot ask you to undergo or disclose genetic test results for standard life or health insurance coverage within standard limits. Existing medical insurance (like MediShield Life and Integrated Shield Plans) already active cannot be altered or cancelled. Your proactive genetic testing is a positive step to stay healthy!";
      } else if (query.includes('cost') || query.includes('subsidy') || query.includes('pay') || query.includes('price') || query.includes('chas') || query.includes('medisave')) {
        botResponse = "Genetic testing for FH is heavily subsidized by the Ministry of Health (MOH). For eligible Singapore Citizens, subsidies cover 50% to 75% of the test. Any remaining out-of-pocket costs (typically S$50 - S$120) can be paid using MediSave under chronic disease management guidelines. CHAS Blue, Orange, and Pioneer/Merdeka Generation cardholders receive the highest subsidies.";
      } else if (query.includes('family') || query.includes('children') || query.includes('parents') || query.includes('cascade')) {
        botResponse = "FH is inherited and there is a 50% chance that immediate family members (parents, siblings, and children) share the same gene variant. If your genetic test is positive, your medical team will help guide 'cascade screening' to test your family members early. This allows them to start highly effective preventative treatments and protect their hearts early.";
      } else if (query.includes('prepare') || query.includes('prep') || query.includes('checklist') || query.includes('fast')) {
        botResponse = "Good news: you do NOT need to fast before the FH genetic blood test. To prepare, please: 1) Gather a list of family members with high cholesterol or early heart attacks, 2) Prepare a list of your current medications, and 3) Bring along your physical ID or Singpass. You will have a supportive 30-minute Genetic Counselling session before any blood is drawn.";
      } else if (query.includes('what') && (query.includes('fh') || query.includes('cholesterol'))) {
        botResponse = "Familial Hypercholesterolaemia (FH) is an inherited condition that causes extremely high LDL (bad) cholesterol from birth. Unlike regular high cholesterol, it is not caused by poor lifestyle or diet. If left untreated, the buildup of cholesterol can cause early blockages in blood vessels. The genetic test confirms the diagnosis so doctors can customize highly effective preventative statin treatments.";
      } else if (query.includes('statin') || query.includes('medication') || query.includes('pill') || query.includes('treatment')) {
        botResponse = "FH is highly manageable. While lifestyle helps, most patients require highly researched medications like statins to safely reduce LDL levels by up to 50%. Your doctor will tailor the medication specifically based on your genetic results. Never stop or adjust your current medications without medical consultation.";
      } else if (query.includes('booking') || query.includes('reschedule') || query.includes('appointment')) {
        botResponse = "You can manage your bookings directly in this app! Click 'Book Appointment' on the main banner or navigate to Screen 3 in the simulator. You will find real-time slots, clinic locations (like First Health Group Serangoon), and simple 2-tap rescheduling options.";
      } else {
        // Fallback search in FAQs or generic supportive GovTech reply
        const matchedFaq = faqs.find(faq => 
          query.split(' ').some(word => word.length > 4 && faq.question.toLowerCase().includes(word))
        );
        
        if (matchedFaq) {
          botResponse = `${matchedFaq.answer} To learn more, feel free to visit the 'Education Hub' section on our app!`;
        } else {
          botResponse = "I understand you have questions about the FH genetic testing referral. Your referral is a preventative check to keep you healthy. It is heavily subsidized by the government, protected from insurance discrimination, and includes full counseling. Would you like to check out the 'Education Hub' or schedule your session today?";
        }
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'init-1',
        sender: 'bot',
        text: "Hello! I am HealthBuddy, your GovTech Singapore FH Assistant. I can help answer questions about Familial Hypercholesterolaemia (FH), test costs, insurance moratoriums, and booking. What's on your mind today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-100">HealthBuddy Assistant</span>
              <span className="bg-emerald-500/10 text-[10px] text-emerald-400 font-mono px-1 rounded border border-emerald-500/20 flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" />
                AI
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400">GovTech Support - Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleReset}
          title="Reset conversation"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[180px] bg-slate-950/40">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            {m.sender === 'bot' ? (
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 text-[10px] text-white font-bold select-none">
                SG
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center shrink-0 text-slate-300">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
              }`}
            >
              {m.text}
              <div
                className={`text-[9px] mt-1.5 font-mono ${
                  m.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'
                }`}
              >
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 max-w-[80%] mr-auto">
            <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white font-bold">
              SG
            </div>
            <div className="bg-slate-800 p-3 rounded-xl rounded-tl-none border border-slate-700/50">
              <div className="flex gap-1 items-center py-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="p-2 border-t border-slate-800 bg-slate-950 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.text)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-medium border border-slate-700/60 transition shrink-0 active:scale-95"
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Input Tray */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask about subsidies, insurance protection, prep..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim()}
          className="p-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl transition flex items-center justify-center shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Advisory Info */}
      <div className="px-3 py-2 bg-slate-950 text-[10px] text-slate-500 border-t border-slate-800 flex items-center gap-1.5 leading-snug">
        <AlertCircle className="w-3 h-3 text-emerald-600 shrink-0" />
        <span>Providing official MOH Singapore and GovTech policy answers.</span>
      </div>
    </div>
  );
}
