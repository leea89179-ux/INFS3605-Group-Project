import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Sparkles, User, RefreshCw, AlertCircle, X } from 'lucide-react';
import { faqs } from '../data/education';
import { Language, UI_TRANSLATIONS } from '../data/translations';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatbotProps {
  onClose?: () => void;
  language?: Language;
}

function t(lang: Language, key: string): string {
  return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
}

function getQuickQuestions(lang: Language) {
  return [
    { text: t(lang, 'chatbot_quick_insurance'), tag: 'insurance' },
    { text: t(lang, 'chatbot_quick_cost'), tag: 'cost' },
    { text: t(lang, 'chatbot_quick_family'), tag: 'family' },
    { text: t(lang, 'chatbot_quick_prep'), tag: 'prep' },
  ];
}

function getGreeting(lang: Language): Message {
  return {
    id: 'init-1',
    sender: 'bot',
    text: t(lang, 'chatbot_greeting'),
    timestamp: new Date(),
  };
}

export default function Chatbot({ onClose, language = 'en' }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([getGreeting(language)]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([getGreeting(language)]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Formats "**bold text**" safely as HTML/React bolding
  const renderFormattedText = (text: string, isBot: boolean) => {
    if (!text) return null;
    const parts = text.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <strong
            key={index}
            className={`font-extrabold ${isBot ? 'text-[#00a859] font-black' : 'text-white'}`}
          >
            {part}
          </strong>
        );
      }
      return part;
    });
  };

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

    // Call server-side API to query Gemini with a fallback to simulation
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, language }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Server returned an error');
        return res.json();
      })
      .then((data) => {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.text || 'Sorry, I could not process that response.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      })
      .catch((err) => {
        console.warn('[Chatbot] Backend /api/chat error, falling back to local simulation rules:', err);

        // Simulate GovTech Smart Bot response (Local Fallback - Extremely concise & bold-formatted)
        setTimeout(() => {
          let botResponse = '';
          const query = text.toLowerCase();

          if (query.includes('insurance') || query.includes('shield') || query.includes('policy') || query.includes('insurans') || query.includes('保险') || query.includes('காப்பீடு')) {
            botResponse = "Under the Singapore **LIA Moratorium**, life and health insurers **cannot** ask you to disclose genetic test results for standard coverage limits. Existing plans like **MediShield Life** or Integrated Shield are completely unaffected.";
          } else if (query.includes('cost') || query.includes('subsidy') || query.includes('pay') || query.includes('price') || query.includes('chas') || query.includes('medisave') || query.includes('kos') || query.includes('费用') || query.includes('கட்டணம்')) {
            botResponse = "FH testing is subsidized **50% to 75%** by MOH for eligible Singaporeans. Out-of-pocket costs typically range from **S$50 to S$120** and can be **fully paid using MediSave** under chronic care guidelines.";
          } else if (query.includes('family') || query.includes('children') || query.includes('parents') || query.includes('cascade') || query.includes('keluarga') || query.includes('家人') || query.includes('குடும்ப')) {
            botResponse = "FH is inherited, meaning first-degree family members have a **50% chance** of sharing the gene. If your test is positive, your team will help coordinate **cascade screening** to protect your family's hearts early.";
          } else if (query.includes('prepare') || query.includes('prep') || query.includes('checklist') || query.includes('fast') || query.includes('sediakan') || query.includes('准备') || query.includes('தயார்')) {
            botResponse = "No fasting is needed! Just prepare a **family medical history** (especially early heart attacks), your **current medications**, and your **Singpass**. A 30-minute counselling session will guide you first.";
          } else if (query.includes('what') && (query.includes('fh') || query.includes('cholesterol'))) {
            botResponse = "FH is a genetic condition causing **extremely high LDL cholesterol from birth**, unaffected by diet alone. Early genetic detection allows doctors to customize **highly effective preventative treatment** like statins.";
          } else if (query.includes('statin') || query.includes('medication') || query.includes('pill') || query.includes('treatment') || query.includes('ubat') || query.includes('药物') || query.includes('மருந்து')) {
            botResponse = "FH is highly manageable using daily **statins**, which safely lower LDL by up to **50%**. Never adjust your prescribed dosage without consulting your clinical team.";
          } else if (query.includes('booking') || query.includes('reschedule') || query.includes('appointment') || query.includes('tempah') || query.includes('预约') || query.includes('முன்பதிவு')) {
            botResponse = "You can schedule or reschedule your genetic counselling session instantly! Navigate to the **Book** tab inside the simulated phone in the middle of the screen.";
          } else {
            // Fallback search in FAQs or generic supportive GovTech reply
            const matchedFaq = faqs.find(faq =>
              query.split(' ').some(word => word.length > 4 && faq.question.toLowerCase().includes(word))
            );

            if (matchedFaq) {
              botResponse = `**Answer:** ${matchedFaq.answer} More details can be found on our **Learn** tab!`;
            } else {
              botResponse = "I am here to help with FH testing. Your referral is a **subsidized, protected preventative screen**. Would you like to check out the **Learn** tab or **schedule** your session today?";
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
        }, 800);
      });
  };

  const handleReset = () => {
    setMessages([getGreeting(language)]);
  };

  const quickQuestions = getQuickQuestions(language);

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-100">{t(language, 'chatbot_title')}</span>
              <span className="bg-[#00a859]/15 text-[10px] text-emerald-400 font-mono px-1 rounded border border-emerald-500/20 flex items-center gap-0.5 font-bold">
                <Sparkles className="w-2.5 h-2.5" />
                AI
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-400">{t(language, 'chatbot_online')}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            title={t(language, 'chatbot_reset')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title={t(language, 'chatbot_close')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[180px] bg-slate-950/40 flex flex-col">
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
              className={`p-3 rounded-xl text-xs leading-relaxed text-left ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700/50'
              }`}
            >
              <p className="whitespace-pre-line">{renderFormattedText(m.text, m.sender === 'bot')}</p>
              <div
                className={`text-[9px] mt-1.5 font-mono text-right ${
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
      <div className="p-2 border-t border-slate-800 bg-slate-950 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0 select-none">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.text)}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-medium border border-slate-700/60 transition shrink-0 active:scale-95 cursor-pointer"
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Input Tray */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder={t(language, 'chatbot_placeholder')}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim()}
          className="p-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Advisory Info */}
      <div className="px-3 py-2 bg-slate-950 text-[10px] text-slate-500 border-t border-slate-800 flex items-center gap-1.5 leading-snug shrink-0">
        <AlertCircle className="w-3 h-3 text-emerald-600 shrink-0" />
        <span className="text-left font-medium">{t(language, 'chatbot_footer')}</span>
      </div>
    </div>
  );
}
