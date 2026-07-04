import { useState, useEffect, useRef } from 'react';
import { checkFloodRisk } from '../api/riskApi';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Droplets,
  Wind,
  Thermometer,
  MapPin,
  Shield,
  Activity,
  BarChart3,
  LineChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

function RiskAssessment() {
    const [township, setTownship] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [animatedValue, setAnimatedValue] = useState(0);

    const townshipOptions = [
        'ရန်ကုန်', 'မန္တလေး', 'နေပြည်တော်', 'ပဲခူး', 'မော်လမြိုင်', 'ပုသိမ်', 'တောင်ကြီး', 'မုံရွာ', 'စစ်တွေ',
        'လှိုင်', 'ကမာရွတ်', 'ဗဟန်း', 'စမ်းချောင်း', 'မရမ်းကုန်း', 'အင်းစိန်', 'မင်္ဂလာဒုံ', 'တာမွေ', 'ရန်ကင်း', 'ဗိုလ်တစ်ထောင်', 'ဒဂုံ', 'သင်္ဃန်းကျွန်း', 'သာကေတ', 'လှိုင်သာယာ'
    ];

    const filteredOptions = townshipOptions.filter(option =>
        option.toLowerCase().includes(township.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Animation for risk graph
    useEffect(() => {
        if (result) {
            const targetValue = result.colorCode === 'red' ? 85 : result.colorCode === 'yellow' ? 50 : 20;
            let current = 0;
            const interval = setInterval(() => {
                if (current < targetValue) {
                    current += 1;
                    setAnimatedValue(current);
                } else {
                    clearInterval(interval);
                }
            }, 20);
            return () => clearInterval(interval);
        }
    }, [result]);

    const handleCheck = async (e) => {
        e.preventDefault();
        if (!township.trim()) return;

        setIsOpen(false);
        setLoading(true);
        setError('');
        setResult(null);
        setAnimatedValue(0);

        try {
            const data = await checkFloodRisk(township);
            if (data.message) {
                setError(data.message);
            } else {
                setResult(data);
            }
        } catch (err) {
            setError('စနစ်ချို့ယွင်းမှု ဖြစ်ပေါ်သွားပါသဖြင့် ခဏနေမှ ပြန်စမ်းကြည့်ပါ။');
        } finally {
            setLoading(false);
        }
    };

    const getColorClass = (color) => {
        if (color === 'red') return 'border-red-500 bg-gradient-to-br from-red-50 to-red-100/50';
        if (color === 'yellow') return 'border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100/50';
        return 'border-green-500 bg-gradient-to-br from-green-50 to-green-100/50';
    };

    const getHeaderGradient = (color) => {
        if (color === 'red') return 'bg-gradient-to-r from-red-500 to-red-600';
        if (color === 'yellow') return 'bg-gradient-to-r from-amber-500 to-amber-600';
        return 'bg-gradient-to-r from-green-500 to-green-600';
    };

    const getRiskScore = (color) => {
        if (color === 'red') return { score: 85, label: 'မြင့်မားသော အန္တရာယ်', icon: AlertTriangle, trend: 'up' };
        if (color === 'yellow') return { score: 50, label: 'အလယ်အလတ် အန္တရာယ်', icon: Activity, trend: 'stable' };
        return { score: 20, label: 'နည်းပါးသော အန္တရာယ်', icon: CheckCircle, trend: 'down' };
    };

    const getRiskColor = (color) => {
        if (color === 'red') return '#EF4444';
        if (color === 'yellow') return '#F59E0B';
        return '#10B981';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header with Stats */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                ရေကြီးမှုအန္တရာယ် အကဲဖြတ်ခြင်း
                            </h1>
                            <p className="text-slate-600 mt-2 flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                မိမိဒေသ၏ ရေကြီးနိုင်ခြေကို ခေတ်မီစနစ်ဖြင့် တိကျစွာ တွက်ချက်ပါ
                            </p>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-600">နောက်ဆုံးအချိန်: {new Date().toLocaleString('my-MM')}</span>
                        </div>
                    </div>
                </div>

                {/* Input Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
                    <form onSubmit={handleCheck} className="space-y-6">
                        <div className="relative" ref={dropdownRef}>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                                မြို့နယ်အမည် ရိုက်ထည့်ပါ သို့မဟုတ် ရွေးချယ်ပါ
                            </label>
                            
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="ဥပမာ - သာကေတ၊ ရန်ကုန်..."
                                    value={township}
                                    onFocus={() => setIsOpen(true)}
                                    onChange={(e) => {
                                        setTownship(e.target.value);
                                        setIsOpen(true);
                                    }}
                                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-800 placeholder-slate-400 font-medium"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                                        ▼
                                    </div>
                                </div>
                            </div>

                            {isOpen && filteredOptions.length > 0 && (
                                <ul className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-white border-2 border-blue-100 rounded-xl shadow-2xl divide-y divide-slate-100">
                                    {filteredOptions.map((option, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setTownship(option);
                                                setIsOpen(false);
                                            }}
                                            className="px-4 py-3.5 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 cursor-pointer transition-all duration-150 text-left font-medium flex items-center"
                                        >
                                            <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    တွက်ချက်နေသည်...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <Shield className="h-5 w-5 mr-2" />
                                    စစ်ဆေးမည်
                                </span>
                            )}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}
                </div>

                {/* Result UI */}
                {result && (
                    <div className="animate-fade-in-up">
                        <div className={`rounded-2xl border-2 shadow-2xl overflow-hidden transition-all duration-500 ${getColorClass(result.colorCode)}`}>
                            {/* Header with Risk Level */}
                            <div className={`${getHeaderGradient(result.colorCode)} px-6 py-4 text-white`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {result.colorCode === 'red' && <AlertTriangle className="h-6 w-6" />}
                                        {result.colorCode === 'yellow' && <Activity className="h-6 w-6" />}
                                        {result.colorCode === 'green' && <CheckCircle className="h-6 w-6" />}
                                        <div>
                                            <h2 className="text-xl font-bold">{result.township} မြို့နယ်</h2>
                                            <p className="text-white/80 text-sm flex items-center">
                                                <Clock className="h-3 w-3 mr-1" />
                                                နောက်ဆုံးမွမ်းမံ: {new Date().toLocaleString('my-MM')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                        <span className="text-sm font-semibold">
                                            {result.riskLevel.split(' ')[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="p-6">
                                {/* Weather Info */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                                            ရာသီဥတု
                                        </div>
                                        <p className="font-bold text-slate-800">{result.weather}</p>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Thermometer className="h-3 w-3 mr-1 text-red-500" />
                                            အပူချိန်
                                        </div>
                                        <p className="font-bold text-slate-800">{result.temp}°C</p>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Wind className="h-3 w-3 mr-1 text-cyan-500" />
                                            အန္တရာယ်အဆင့်
                                        </div>
                                        <p className="font-bold text-slate-800">{result.colorCode === 'red' ? 'မြင့်မား' : result.colorCode === 'yellow' ? 'အလယ်အလတ်' : 'နည်းပါး'}</p>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Activity className="h-3 w-3 mr-1 text-purple-500" />
                                            အခြေအနေ
                                        </div>
                                        <p className="font-bold text-slate-800">{result.colorCode === 'red' ? 'သတိပေးချက်' : result.colorCode === 'yellow' ? 'စောင့်ကြည့်ရန်' : 'ပုံမှန်'}</p>
                                    </div>
                                </div>

                                <hr className="my-6 border-slate-200/50" />

                                {/* Risk Graph Section */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-slate-800 flex items-center">
                                            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                                            အန္တရာယ်အဆင့် ဂရပ်
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-slate-600">ရမှတ်</span>
                                            <span className="font-bold text-2xl text-slate-800">{animatedValue}%</span>
                                        </div>
                                    </div>
                                    
                                    {/* Graph Visualization */}
                                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                                        <div className="relative h-32">
                                            {/* Grid lines */}
                                            <div className="absolute inset-0 flex flex-col justify-between">
                                                <div className="border-t border-slate-200/30 w-full"></div>
                                                <div className="border-t border-slate-200/30 w-full"></div>
                                                <div className="border-t border-slate-200/30 w-full"></div>
                                                <div className="border-t border-slate-200/30 w-full"></div>
                                                <div className="border-t border-slate-200/30 w-full"></div>
                                            </div>

                                            {/* Bar chart */}
                                            <div className="relative h-full flex items-end justify-around">
                                                {/* Risk level indicator */}
                                                <div className="flex flex-col items-center">
                                                    <div 
                                                        className="w-12 rounded-t-lg transition-all duration-1000 ease-out"
                                                        style={{
                                                            height: `${animatedValue}%`,
                                                            backgroundColor: getRiskColor(result.colorCode),
                                                            minHeight: '10px'
                                                        }}
                                                    >
                                                        <div className="w-full h-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                                            {animatedValue}%
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-slate-600 mt-2 font-medium">အန္တရာယ်</div>
                                                </div>

                                                {/* Trend indicator */}
                                                <div className="flex flex-col items-center">
                                                    <div className={`p-2 rounded-full ${result.colorCode === 'red' ? 'bg-red-100' : result.colorCode === 'yellow' ? 'bg-amber-100' : 'bg-green-100'}`}>
                                                        {result.colorCode === 'red' ? (
                                                            <TrendingUp className="h-6 w-6 text-red-500" />
                                                        ) : result.colorCode === 'yellow' ? (
                                                            <Activity className="h-6 w-6 text-amber-500" />
                                                        ) : (
                                                            <TrendingDown className="h-6 w-6 text-green-500" />
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-slate-600 mt-2 font-medium">
                                                        {result.colorCode === 'red' ? 'မြင့်တက်နေ' : result.colorCode === 'yellow' ? 'တည်ငြိမ်' : 'ကျဆင်းနေ'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Risk level markers */}
                                        <div className="flex justify-between mt-4">
                                            <div className="text-xs text-slate-500">နည်းပါး</div>
                                            <div className="text-xs text-slate-500">အလယ်အလတ်</div>
                                            <div className="text-xs text-slate-500">မြင့်မား</div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-6 border-slate-200/50" />

                                {/* Findings and Recommendations */}
                                <div className="space-y-4">
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                                        <h3 className="font-bold text-slate-800 mb-2 flex items-center">
                                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                                            စစ်ဆေးတွေ့ရှိချက်
                                        </h3>
                                        <p className="text-slate-700 font-medium leading-relaxed">{result.riskLevel}</p>
                                    </div>
                                    
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                                        <h3 className="font-bold text-slate-800 mb-2 flex items-center">
                                            <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                            အကြံပြုချက်
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed">{result.recommendation}</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RiskAssessment;