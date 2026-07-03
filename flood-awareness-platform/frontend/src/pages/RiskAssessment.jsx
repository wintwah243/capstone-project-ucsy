import { useState, useEffect, useRef } from 'react';
import { checkFloodRisk } from '../api/riskApi';

function RiskAssessment() {
    const [township, setTownship] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const townshipOptions = [
        'ရန်ကုန်', 'မန္တလေး', 'နေပြည်တော်', 'ပဲခူး', 'မော်လမြိုင်', 'ပုသိမ်', 'တောင်ကြီး', 'မုံရွာ', 'စစ်တွေ',
        'လှိုင်', 'ကမာရွတ်', 'ဗဟန်း', 'စမ်းချောင်း', 'မရမ်းကုန်း', 'အင်းစိန်', 'မင်္ဂလာဒုံ', 'တာမွေ', 'ရန်ကင်း', 'ဘော်ဒါ', 'ဒဂုံ', 'သင်္ဃန်းကျွန်း', 'သာကေတ', 'လှိုင်သာယာ'
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

    const handleCheck = async (e) => {
        e.preventDefault();
        if (!township.trim()) return;

        setIsOpen(false);
        setLoading(true);
        setError('');
        setResult(null);

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

    // Color dynamic code
    const getColorClass = (color) => {
        if (color === 'red') return 'bg-red-50 border-red-200 text-red-800';
        if (color === 'yellow') return 'bg-amber-50 border-amber-200 text-amber-800';
        return 'bg-green-50 border-green-200 text-green-800';
    };

    const getBadgeClass = (color) => {
        if (color === 'red') return 'bg-red-100 text-red-800';
        if (color === 'yellow') return 'bg-amber-100 text-amber-800';
        return 'bg-green-100 text-green-800';
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-2xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">လက်ရှိ မိုးလေဝသ အခြေအနေပေါ် မူတည်၍ မိမိဒေသ၏ ရေကြီးနိုင်ခြေကို စစ်ဆေးပါ</h1>
                </header>

                {/* Input Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
                    <form onSubmit={handleCheck} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative" ref={dropdownRef}>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">မြို့နယ်အမည် ရိုက်ထည့်ပါ သို့မဟုတ် ရွေးချယ်ပါ</label>
                            
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ဥပမာ - သာကေတ"
                                    value={township}
                                    onFocus={() => setIsOpen(true)}
                                    onChange={(e) => {
                                        setTownship(e.target.value);
                                        setIsOpen(true);
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                                    ▼
                                </div>
                            </div>

                     
                            {isOpen && filteredOptions.length > 0 && (
                                <ul className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl divide-y divide-slate-50">
                                    {filteredOptions.map((option, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setTownship(option);
                                                setIsOpen(false);
                                            }}
                                            className="px-4 py-3 text-slate-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition text-left font-medium"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="md:mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition disabled:opacity-50 h-[48px] md:h-auto"
                        >
                            {loading ? 'တွက်ချက်နေသည်...' : 'စစ်ဆေးမည်'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-3 font-medium">{error}</p>}
                </div>

                {/* Result UI */}
                {result && (
                    <div className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 ${getColorClass(result.colorCode)}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">{result.township} မြို့နယ်</h2>
                                <p className="opacity-80 text-sm mt-1">ရာသီဥတုအခြေအနေ: {result.weather} | အပူချိန်: {result.temp}°C</p>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getBadgeClass(result.colorCode)}`}>
                                {result.riskLevel.split(' ')[0]}
                            </span>
                        </div>

                        <hr className="my-4 opacity-20 border-current" />

                        <div>
                            <h3 className="font-bold text-lg mb-1">စစ်ဆေးတွေ့ရှိချက် -</h3>
                            <p className="text-base font-medium leading-relaxed mb-4">{result.riskLevel}</p>
                            <h3 className="font-bold text-lg mb-1">အကြံပြုချက် -</h3>
                            <p className="text-base leading-relaxed">{result.recommendation}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RiskAssessment;