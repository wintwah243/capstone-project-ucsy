import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  BookOpen, 
  ClipboardCheck, 
  Shield, 
  AlertTriangle, 
  Bot,
  Search,
  ChevronRight,
  Droplets,
  CloudRain,
  Wind,
  MapPin,
  Clock,
  Users,
  Phone,
  Mail,
  Navigation,
  Layers,
  ThermometerSun,
} from 'lucide-react';

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const [selectedMapPoint, setSelectedMapPoint] = useState(null);
  const [mapLayer, setMapLayer] = useState('flood');

  // Mock data for map points
  const floodRiskPoints = [
    { id: 1, lat: 40, lng: 30, risk: 'high', city: 'မန္တလေး', level: 'အနီရောင်အဆင့်', people: '၁၂,၅၀၀', temp: '၃၂°C' },
    { id: 2, lat: 55, lng: 45, risk: 'medium', city: 'စစ်ကိုင်း', level: 'လိမ္မော်ရောင်အဆင့်', people: '၈,၂၀၀', temp: '၃၀°C' },
    { id: 3, lat: 35, lng: 55, risk: 'low', city: 'ပြင်ဦးလွင်', level: 'အဝါရောင်အဆင့်', people: '၃,၁၀၀', temp: '၂၈°C' },
    { id: 4, lat: 60, lng: 35, risk: 'high', city: 'ရွှေဘို', level: 'အနီရောင်အဆင့်', people: '၁၅,၇၀၀', temp: '၃၃°C' },
    { id: 5, lat: 45, lng: 60, risk: 'medium', city: 'မိတ္ထီလာ', level: 'လိမ္မော်ရောင်အဆင့်', people: '၆,၈၀၀', temp: '၂၉°C' },
  ];

  const features = [
    {
      id: 'knowledge',
      icon: BookOpen,
      title: 'ဗဟုသုတဗဟိုဌာန',
      description: 'ရေကြီးမှုဆိုင်ရာ အခြေခံအချက်အလက်များ၊ ကြိုတင်ပြင်ဆင်နည်းများနှင့် ဘေးအန္တရာယ်ကာကွယ်ရေးဗဟုသုတများ',
    },
    {
      id: 'checklist',
      icon: ClipboardCheck,
      title: 'အဆင်သင့်စစ်ဆေးရန်စာရင်း',
      description: 'ရေကြီးမှုအတွက် ကြိုတင်ပြင်ဆင်မှုများ၊ အရေးပေါ်ပစ္စည်းများနှင့် လိုက်နာရမည့်အချက်များ',
    },
    {
      id: 'risk',
      icon: Shield,
      title: 'ရေကြီးနိုင်ခြေအန္တရာယ်စစ်ဆေးခြင်း',
      description: 'သင့်နေအိမ် သို့မဟုတ် အဝေးရောက်နေသော သင့်မိသားစုနေအိမ်ဒေသများတွင် ရေကြီးနိုင်ခြေကို အကဲဖြတ်ပါ',
    },
    {
      id: 'assistant',
      icon: Bot,
      title: 'AI လက်ထောက်',
      description: 'ရေကြီးမှုဆိုင်ရာ မေးခွန်းများအတွက် ဉာဏ်ရည်တုအကူအညီဖြင့် အဖြေရယူပါ',
    }
  ];

  const news = [
    {
      title: 'မန္တလေးတိုင်းတွင် ရေကြီးမှုအန္တရာယ်ရှိနိုင်',
      date: '၂၀၂၆ ခုနှစ်၊ ဇွန်လ ၂၇ ရက်',
      excerpt: 'မန္တလေးတိုင်းဒေသကြီးအတွင်း မိုးသည်းထန်စွာရွာသွန်းမှုကြောင့် မြစ်ရေများတက်လာနိုင်ပြီး...'
    },
    {
      title: 'ရေကြီးမှုကြိုတင်ပြင်ဆင်နည်းများ ထုတ်ပြန်',
      date: '၂၀၂၆ ခုနှစ်၊ ဇွန်လ ၂၆ ရက်',
      excerpt: 'မိုးလေဝသဌာနမှ ရေကြီးမှုကြိုတင်ပြင်ဆင်နည်းများကို ပြည်သူများအား အသိပေးကြေညာချက်ထုတ်ပြန်...'
    }
  ];

  const preparednessSteps = [
    { step: '၁', title: 'သတင်းအချက်အလက်စုဆောင်းပါ', desc: 'ရေကြီးမှုဆိုင်ရာ သတင်းများကို ပုံမှန်စစ်ဆေးပါ' },
    { step: '၂', title: 'အရေးပေါ်ပစ္စည်းများပြင်ဆင်ပါ', desc: 'အစားအသောက်၊ ရေ၊ ဆေးဝါးနှင့် မရှိမဖြစ်ပစ္စည်းများ' },
    { step: '၃', title: 'ဘေးလွတ်ရာသို့ရွှေ့ပြောင်းပါ', desc: 'ရေကြီးနိုင်သည့်နေရာများမှ ဘေးကင်းရာသို့ ကြိုတင်ရွှေ့ပြောင်းပါ' },
    { step: '၄', title: 'အရေးပေါ်ဆက်သွယ်ရေး', desc: 'မိသားစုနှင့် သက်ဆိုင်ရာဌာနများသို့ အကြောင်းကြားပါ' }
  ];

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return { bg: 'bg-red-500', pulse: 'bg-red-400', border: 'border-red-400' };
      case 'medium': return { bg: 'bg-orange-500', pulse: 'bg-orange-400', border: 'border-orange-400' };
      case 'low': return { bg: 'bg-yellow-500', pulse: 'bg-yellow-400', border: 'border-yellow-400' };
      default: return { bg: 'bg-blue-500', pulse: 'bg-blue-400', border: 'border-blue-400' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">

      {/* Hero Section with Map UI */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-32 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                  ⚡ ဘေးရောက်မှ ရှာဖွေတာထက်၊ ကြိုတင်ပြင်ဆင်ထားတာက အကောင်းဆုံး ခံတံတိုင်းပါ။
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                ရေဘေးအန္တရာယ်မှ ကြိုတင်ကာကွယ်ရေး
              </h1>
              <p className="text-xl mb-8 text-slate-300">
                ရေကြီးမှုအန္တရာယ်မှ သင့်မိသားစုနှင့် ပိုင်ဆိုင်မှုများကို ကာကွယ်ရန် 
                ကြိုတင်ပြင်ဆင်မှုများ၊ သတင်းအချက်အလက်များနှင့် AI အကူအညီများ
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/risk-assessment" className="cursor-pointer">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center shadow-lg shadow-blue-500/25">
                  စတင်အသုံးပြုရန်
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                </Link>
                <button className="border-2 border-slate-500 text-slate-300 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 hover:text-white hover:border-slate-400 transition-all transform hover:scale-105">
                  ပိုမိုလေ့လာရန်
                </button>
              </div>
            </div>

            {/* Modern Map UI */}
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-4 shadow-2xl">
                {/* Map Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-cyan-400" />
                    <span className="font-semibold text-sm">မြန်မာနိုင်ငံ ရေကြီးမှုအန္တရာယ်မြေပုံ</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-slate-700 rounded-lg transition">
                      <Layers className="h-4 w-4 text-slate-400" />
                    </button>
                    <button className="p-1 hover:bg-slate-700 rounded-lg transition">
                      <Navigation className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Map Container */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden mb-4" style={{ height: '300px' }}>
                  {/* Map Background with grid pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
                      backgroundSize: '30px 30px'
                    }}></div>
                    
                    {/* Simulated river paths */}
                    <svg className="absolute inset-0 w-full h-full">
                      <path d="M 0 150 Q 100 100, 200 180 T 400 150" stroke="rgba(34, 211, 238, 0.3)" strokeWidth="8" fill="none" />
                      <path d="M 0 200 Q 150 250, 300 200 T 400 250" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="5" fill="none" />
                      <path d="M 100 0 Q 150 150, 100 300" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="4" fill="none" />
                    </svg>

                    {/* Flood risk zones */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 left-20 w-36 h-36 bg-yellow-500/20 rounded-full blur-xl"></div>
                  </div>

                  {/* Risk Points */}
                  {floodRiskPoints.map((point) => {
                    const colors = getRiskColor(point.risk);
                    return (
                      <button
                        key={point.id}
                        onClick={() => setSelectedMapPoint(selectedMapPoint === point.id ? null : point.id)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                        style={{ 
                          left: `${point.lng}%`, 
                          top: `${point.lat}%` 
                        }}
                      >
                        <div className={`relative ${point.risk === 'high' ? 'animate-bounce' : ''}`}>
                          <div className={`w-4 h-4 ${colors.bg} rounded-full border-2 border-white shadow-lg group-hover:scale-150 transition-transform duration-300`}></div>
                          <div className={`absolute inset-0 ${colors.pulse} rounded-full animate-ping opacity-75`}></div>
                        </div>
                        
                        {/* Tooltip */}
                        {selectedMapPoint === point.id && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-slate-800 border border-slate-600 rounded-xl p-3 shadow-2xl z-20">
                            <div className="text-sm font-semibold text-white mb-1">{point.city}</div>
                            <div className="text-xs text-slate-400 space-y-1">
                              <div className="flex items-center">
                                <AlertTriangle className="h-3 w-3 mr-1 text-red-400" />
                                {point.level}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {point.people} ဦး
                              </div>
                              <div className="flex items-center">
                                <ThermometerSun className="h-3 w-3 mr-1" />
                                {point.temp}
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Map Legend */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                      <span className="text-slate-400">အနီရောင်အဆင့်</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                      <span className="text-slate-400">လိမ္မော်ရောင်</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                      <span className="text-slate-400">အဝါရောင်</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-500">နောက်ဆုံးအပ်ဒိတ်: ၁၀ မိနစ်အကြာ</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center backdrop-blur-sm">
                    <div className="text-cyan-400 font-bold text-lg">၂၄၇</div>
                    <div className="text-xs text-slate-400">ထိခိုက်နိုင်သောနေရာများ</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center backdrop-blur-sm">
                    <div className="text-orange-400 font-bold text-lg">၁၂</div>
                    <div className="text-xs text-slate-400">အန္တရာယ်များသောမြို့နယ်</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center backdrop-blur-sm">
                    <div className="text-green-400 font-bold text-lg">၈၉%</div>
                    <div className="text-xs text-slate-400">ကြိုတင်သတိပေးချက်</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full">
            <path fill="white" d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Rest of the sections remain exactly the same */}
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              အဓိကလုပ်ဆောင်ချက်များ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ရေဘေးအန္တရာယ်ကာကွယ်ရေးအတွက် လိုအပ်သော ကိရိယာများနှင့် အချက်အလက်များ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-100"
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-blue-400 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <button className="text-blue-600 font-medium group-hover:text-blue-800 flex items-center">
                      ပိုမိုလေ့လာရန်
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Checklist Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                အရေးပေါ်ကြိုတင်ပြင်ဆင်ရေးစာရင်း
              </h2>
              <p className="text-gray-600 mb-8">
                ရေကြီးမှုမဖြစ်ပွားမီ ကြိုတင်ပြင်ဆင်ရမည့် အရေးကြီးအချက်များ
              </p>
              <div className="space-y-4">
                {preparednessSteps.map((item) => (
                  <div key={item.step} className="flex items-start bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-4">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                အပြည့်အစုံကြည့်ရန်
              </button>
            </div>
            <div className="relative">
              <div className="bg-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">ရေကြီးမှုအန္တရာယ် အကဲဖြတ်ခြင်း</h3>
                <p className="mb-6">သင့်တည်နေရာအတွက် ရေကြီးမှုအန္တရာယ်ကို စစ်ဆေးပါ</p>
                <div className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>မြို့နယ်ရွေးချယ်ပါ</span>
                  </div>
                  <select className="w-full bg-white text-blue-900 rounded-lg px-4 py-2 mb-4">
                    <option>ချမ်းအေးသာစံမြို့နယ်</option>
                    <option>အောင်မြေသာစံမြို့နယ်</option>
                    <option>မဟာအောင်မြေမြို့နယ်</option>
                  </select>
                  <Link to="/risk-assessment">
                    <button className="w-full bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                      စစ်ဆေးမည်
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-blue-900">နောက်ဆုံးရသတင်းများ</h2>
              <p className="text-gray-600 mt-2">ရေကြီးမှုဆိုင်ရာ နောက်ဆုံးရသတင်းအချက်အလက်များ</p>
            </div>
            <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
              အားလုံးကြည့်ရန်
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-6 hover:shadow-lg transition">
                <div className="flex items-center text-sm text-blue-600 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.date}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <button className="text-blue-600 font-medium hover:text-blue-800">
                  ဆက်ဖတ်ရန်
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Bot className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">AI လက်ထောက်</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              ရေကြီးမှုဆိုင်ရာ သင့်မေးခွန်းများအတွက် ဉာဏ်ရည်တုလက်ထောက်က အဖြေပေးပါမည်
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center bg-white/20 rounded-xl p-2">
              <input 
                type="text" 
                placeholder="ရေကြီးမှုဆိုင်ရာ မေးခွန်းတစ်ခုမေးပါ..." 
                className="flex-1 bg-transparent text-white placeholder-blue-200 px-4 py-2 outline-none"
              />
              <Link to="/ai-assistant">
                <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                  မေးမည်
                </button>
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition">
                ရေကြီးမှုကြိုတင်ပြင်ဆင်နည်း
              </button>
              <button className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition">
                ဘေးလွတ်ရာရွှေ့ပြောင်းနည်း
              </button>
              <button className="bg-white/20 px-3 py-1 rounded-full text-sm hover:bg-white/30 transition">
                အရေးပေါ်အကူအညီ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Droplets className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">ရေဘေးအန္တရာယ်ကာကွယ်ရေး</span>
              </div>
              <p className="text-blue-300 text-sm">
                ရေကြီးမှုအန္တရာယ်မှ ပြည်သူများကို ကာကွယ်ရန် သတင်းအချက်အလက်များနှင့် ကြိုတင်ပြင်ဆင်မှုများ
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">လင့်ခ်များ</h4>
              <ul className="space-y-2 text-blue-300">
                <li><a href="#" className="hover:text-white">ပင်မစာမျက်နှာ</a></li>
                <li><a href="#" className="hover:text-white">ဗဟုသုတဗဟိုဌာန</a></li>
                <li><a href="#" className="hover:text-white">စစ်ဆေးရန်စာရင်း</a></li>
                <li><a href="#" className="hover:text-white">AI လက်ထောက်</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">အကူအညီရယူရန်</h4>
              <ul className="space-y-2 text-blue-300">
                <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> အရေးပေါ်နံပါတ် - ၁၅၅</li>
                <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> info@floodprevention.mm</li>
                <li className="flex items-center"><Clock className="h-4 w-4 mr-2" /> ၂၄/၇ ဝန်ဆောင်မှု</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">လူမှုကွန်ရက်</h4>
              <div className="flex space-x-4">
              </div>
              <p className="text-blue-300 text-sm mt-4">
                ရေဘေးကြိုတင်ကာကွယ်ရန်အတွက် ကျွန်ုပ်တို့ပလက်ဖောင်းကို အသုံးပြုပါ။
              </p>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300 text-sm">
            <p>© ၂၀၂၆ ရေဘေးအန္တရာယ်ကာကွယ်ရေးပလက်ဖောင်း။ မူပိုင်ခွင့်များရရှိထားသည်။</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;