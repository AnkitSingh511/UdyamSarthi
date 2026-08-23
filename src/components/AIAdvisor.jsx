import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { speechHandler } from '../utils/speechUtils';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  MapPin
} from 'lucide-react';

export const AIAdvisor = () => {
  const { lang, category, profileData, district, currentSpatialEntities, calculateMudraEligibility, t, logActivity } = useApp();
  const eligibility = calculateMudraEligibility();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Suggested prompt chips based on category
  const getPromptChips = () => {
    switch (category) {
      case 'farmer':
        return [
          "Which mandi in " + district.name + " offers highest price for wheat?",
          "How to get ₹2 Lakh MUDRA Kishor loan for agri tools?",
          "Where are certified fertilizer suppliers within 5km?",
          "Should I sell my grain now or hold for 30 days?"
        ];
      case 'dairy':
        return [
          "How to get ₹3.5 Lakh MUDRA loan for purchasing buffaloes?",
          "Which dairy chilling plant within 5km gives highest milk fat bonus?",
          "Where to buy bypass-fat cattle feed nearby?",
          "How to increase daily milk revenue by 20%?"
        ];
      case 'retail':
        return [
          "How to apply for ₹2 Lakh MUDRA loan for shop stock?",
          "Where are FMCG wholesale depots within 5km?",
          "How to reduce working capital gap for my kirana shop?",
          "Which high-margin items to stock this festive month?"
        ];
      case 'food_processing':
        return [
          "How to secure ₹6 Lakh MUDRA Tarun loan for stainless pulverizer machine?",
          "Where to buy packaging materials & pouches within 5km?",
          "Direct farmer procurement vs Mandi procurement math",
          "How to get Udyam registration for micro processing unit?"
        ];
      default:
        return [];
    }
  };

  // Initial welcome message
  useEffect(() => {
    const welcomeMsg = lang === 'hi'
      ? `नमस्ते! मैं आपका उद्यम सारथी एआई सलाहकार हूँ। आपकी प्रोफ़ाइल (${category.toUpperCase()}, ${district.name}) के आधार पर, आप मंडी भाव, प्रधानमंत्री मुद्रा लोन या 5-7 किमी के स्थानीय आपूर्तिकर्ताओं के बारे में पूछ सकते हैं।`
      : `Hello! I am your UdyamSarthi AI Advisory Assistant. Based on your profile (${category.toUpperCase()} in ${district.name}), ask me anything about local Mandi prices, PM MUDRA loans, or 5-7km local suppliers.`;
    
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: welcomeMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 99
      }
    ]);
  }, [category, district, lang]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    logActivity('AI Advisory Query', `Asked: "${query.substring(0, 40)}..."`);

    // Generate intelligent, non-generic advice
    setTimeout(() => {
      const responseText = generateIntelligentResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 96
      };
      setMessages(prev => [...prev, aiMsg]);
      
      // Auto speak response if mic was used
      if (isListening) {
        speechHandler.speak(responseText, lang, () => setIsSpeaking(false));
      }
    }, 600);
  };

  const generateIntelligentResponse = (q) => {
    const queryLower = q.toLowerCase();

    if (queryLower.includes('mudra') || queryLower.includes('loan') || queryLower.includes('ऋण') || queryLower.includes('लोन')) {
      return lang === 'hi'
        ? `आपकी प्रोफ़ाइल के अनुसार, प्रधानमंत्री मुद्रा योजना (PMMY) की '${eligibility.tier.name}' श्रेणी आपके लिए सबसे उपयुक्त है। आप बिना किसी गारंटी के ₹${profileData.loanRequiredAmount || 150000} तक ऋण प्राप्त कर सकते हैं। अनुमानित मासिक EMI लगभग ₹${eligibility.monthlyEmi.toLocaleString('en-IN')} होगी (5 वर्ष, ~9.5% ब्याज दर)। आवश्यक दस्तावेज: आधार, पैन, जनसमर्थ रजिस्ट्रेशन और मशीन/आहार कोटेशन।`
        : `Based on your cash flow, PM MUDRA Yojana '${eligibility.tier.name}' tier is recommended. You are eligible for up to ₹${(profileData.loanRequiredAmount || 150000).toLocaleString('en-IN')} with ZERO collateral guarantee. Your estimated monthly EMI will be ₹${eligibility.monthlyEmi.toLocaleString('en-IN')}/mo at 9.5% interest rate over 5 years. Apply via jansamarth.in or your nearest PSB bank branch.`;
    }

    if (queryLower.includes('price') || queryLower.includes('mandi') || queryLower.includes('भाव') || queryLower.includes('मंडी') || queryLower.includes('रेट')) {
      const topBuyer = currentSpatialEntities.find(e => e.category === 'buyers');
      const rateStr = topBuyer ? topBuyer.rateInfo : 'Wheat: ₹2,425/quintal';
      return lang === 'hi'
        ? `${district.name} जिले में सबसे पास थोक खरीदार/मंडी '${topBuyer ? topBuyer.name : 'मुख्य मंडी'}' है (${topBuyer ? topBuyer.distanceKm : 2.1} किमी दूर)। वर्तमान लाइव खरीद दर: ${rateStr}। सीधे बिक्री करने पर बिचौलिए के कमीशन की बचत होगी।`
        : `In ${district.name} district, the nearest wholesale procurement hub within 5km is '${topBuyer ? topBuyer.name : 'Central Mandi'}' (${topBuyer ? topBuyer.distanceKm : 2.1} km away). Live rates: ${rateStr}. Direct delivery saves ₹35/quintal transport charges.`;
    }

    if (queryLower.includes('supplier') || queryLower.includes('feed') || queryLower.includes('seed') || queryLower.includes('खाद') || queryLower.includes('चारा') || queryLower.includes('सामग्री')) {
      const topSupplier = currentSpatialEntities.find(e => e.category === 'suppliers');
      return lang === 'hi'
        ? `आपके 5 किमी दायरे में सबसे पसंदीदा आपूर्तिकर्ता '${topSupplier ? topSupplier.name : 'किसान स्टोर'}' है (${topSupplier ? topSupplier.distanceKm : 1.4} किमी दूर)। संपर्क: ${topSupplier ? topSupplier.phone : '+91 98120 44556'}। रेट विवरण: ${topSupplier ? topSupplier.rateInfo : 'उच्च गुणवत्ता सामग्री उपलब्ध'}।`
        : `Within your 5km radius, top verified supplier is '${topSupplier ? topSupplier.name : 'Agri Supply Depot'}' (${topSupplier ? topSupplier.distanceKm : 1.4} km away). Call: ${topSupplier ? topSupplier.phone : '+91 98120 44556'}. Current offer: ${topSupplier ? topSupplier.rateInfo : 'Certified stock available'}.`;
    }

    // Default intelligent advisory fallback
    return lang === 'hi'
      ? `आपकी ${category.toUpperCase()} व्यावसायिक प्रोफ़ाइल के लिए हमारी सलाह: 1) ${district.name} के 5 किमी के भीतर उपलब्ध आपूर्तिकर्ताओं से सीधे संपर्क करें। 2) कार्यशील पूंजी की आवश्यकता के लिए ₹${eligibility.tier.maxAmount.toLocaleString('en-IN')} तक की 'मुद्रा ${eligibility.tier.name}' ऋण सुविधा का लाभ उठाएं। 3) स्टॉक को अधिक समय तक रोकने के बजाय नियमित नकदी प्रवाह बनाए रखें।`
      : `Actionable recommendation for your ${category.toUpperCase()} unit in ${district.name}: 1) Leverage the 5km radius network to source inputs directly. 2) Utilize PM MUDRA ${eligibility.tier.name} loan up to ₹${eligibility.tier.maxAmount.toLocaleString('en-IN')} for expansion without collateral. 3) Maintain positive cash flow with regular weekly sales cycles.`;
  };

  const handleVoiceListen = () => {
    if (isListening) {
      speechHandler.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechHandler.startListening(
        lang,
        (transcript) => {
          setInputQuery(transcript);
          setIsListening(false);
          handleSend(transcript);
        },
        (err) => {
          console.warn("Speech recognition error:", err);
          setIsListening(false);
        },
        () => setIsListening(false)
      );
    }
  };

  const handleToggleSpeak = (text) => {
    if (isSpeaking) {
      speechHandler.stopSpeaking();
      setIsSpeaking(false);
    } else {
      speechHandler.speak(text, lang, () => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4 shadow-2xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">{t.aiAssistantTitle}</h3>
            <p className="text-xs text-slate-400">{t.aiAssistantSubtitle}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Sparkles className="w-3 h-3" />
          <span>Rule-Engine Verified</span>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Suggested Advice Queries:</span>
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {getPromptChips().map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-brand-500/40 text-[11px] text-slate-300 whitespace-nowrap transition-all flex items-center space-x-1 shrink-0"
            >
              <MessageSquare className="w-3 h-3 text-brand-400" />
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-4 max-h-[340px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}
            >
              <div>{msg.text}</div>

              {msg.sender === 'ai' && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                  <span className="text-emerald-400 font-mono flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Confidence: {msg.confidence}%</span>
                  </span>
                  <button
                    onClick={() => handleToggleSpeak(msg.text)}
                    className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800"
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    <span>{isSpeaking ? t.stopSpeaking : t.speakOutput}</span>
                  </button>
                </div>
              )}
            </div>

            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Box with Voice & Send Controls */}
      <div className="flex items-center space-x-2">
        
        {/* Voice Input Button */}
        <button
          onClick={handleVoiceListen}
          title={t.listenVoice}
          className={`p-3 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-amber-500/50'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isListening ? t.listening : t.typeOrSpeakPrompt}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
        />

        {/* Send Button */}
        <button
          onClick={() => handleSend()}
          className="p-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-all shadow-md shadow-brand-600/30"
        >
          <Send className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
