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
} from 'lucide-react';

const Homepage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-bold">
                  ဘေးရောက်မှ ရှာဖွေတာထက်၊ ကြိုတင်ပြင်ဆင်ထားတာက အကောင်းဆုံး ခံတံတိုင်းပါ။
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                ရေဘေးအန္တရာယ်မှ ကြိုတင်ကာကွယ်ရေး
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                ရေကြီးမှုအန္တရာယ်မှ သင့်မိသားစုနှင့် ပိုင်ဆိုင်မှုများကို ကာကွယ်ရန် 
                ကြိုတင်ပြင်ဆင်မှုများ၊ သတင်းအချက်အလက်များနှင့် AI အကူအညီများ
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/risk-assessment" className="cursor-pointer">
                <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center">
                  စတင်အသုံးပြုရန်
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                </Link>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition">
                  ပိုမိုလေ့လာရန်
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <CloudRain className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">မိုးရွာသွန်းမှုအခြေအနေကိုဆန်းစစ်ပါ။</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <Wind className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">လေတိုက်နှုန်းကိုသတိပြုပါ။</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center col-span-2">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-sm">သင်နေထိုင်ရာဒေသမှာရေကြီးနိုင်ခြေအန္တရာယ်ရှိမရှိစစ်ဆေးပါ။</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full">
            <path fill="white" d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

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
              <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                မေးမည်
              </button>
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
                {/* <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition">
                  <Facebook className="h-5 w-5" />
                </a> */}
                {/* <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition">
                  <Twitter className="h-5 w-5" />
                </a> */}
                {/* <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition">
                  <Youtube className="h-5 w-5" />
                </a> */}
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