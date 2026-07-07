import { useState, useEffect, useRef } from 'react';
import { checkFloodRisk } from '../api/riskApi';
import { townshipCoordinates } from '../data/townshipCoordinates'; 
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css'; 

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
  ChevronDown,
  Search
} from 'lucide-react';

function ChangeMapView({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords && coords.lat && coords.lng) {
            map.flyTo([coords.lat, coords.lng], 14, {
                duration: 1.5, 
                easeLinearity: 0.25
            });
        }
    }, [coords, map]);
    return null;
}

function RiskAssessment() {
    const [township, setTownship] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [animatedValue, setAnimatedValue] = useState(0);

    const defaultLocation = { lat: 16.8409, lng: 96.1735 };
    const [currentCoords, setCurrentCoords] = useState(defaultLocation);

    const [allTownshipsRisk, setAllTownshipsRisk] = useState({});
    const [isLoadingMapData, setIsLoadingMapData] = useState(true);

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

    // Fetch risk data for all townships on component mount
    useEffect(() => {
        const fetchAllTownshipsRisk = async () => {
            setIsLoadingMapData(true);
            const riskData = {};
            
            // Fetch risk data for each township
            for (const town of townshipOptions) {
                try {
                    const data = await checkFloodRisk(town);
                    if (data && data.colorCode) {
                        riskData[town] = {
                            riskLevel: data.riskLevel || 'ဘေးကင်း',
                            colorCode: data.colorCode || 'green',
                            recommendation: data.recommendation || 'ပုံမှန်အနေအထား',
                            weather: data.weather || 'သာမန်',
                            temp: data.temp || '၂၈'
                        };
                    } else {
                        // Default fallback if API returns no data
                        riskData[town] = {
                            riskLevel: 'ဘေးကင်း',
                            colorCode: 'green',
                            recommendation: 'ပုံမှန်အနေအထား',
                            weather: 'သာမန်',
                            temp: '၂၈'
                        };
                    }
                } catch (error) {
                    // If API fails, use default green
                    riskData[town] = {
                        riskLevel: 'ဘေးကင်း',
                        colorCode: 'green',
                        recommendation: 'ပုံမှန်အနေအထား',
                        weather: 'သာမန်',
                        temp: '၂၈'
                    };
                }
            }
            
            setAllTownshipsRisk(riskData);
            setIsLoadingMapData(false);
        };

        fetchAllTownshipsRisk();
    }, []);

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
                
                // Update the allTownshipsRisk with the new data
                setAllTownshipsRisk(prev => ({
                    ...prev,
                    [data.township]: {
                        riskLevel: data.riskLevel,
                        colorCode: data.colorCode,
                        recommendation: data.recommendation,
                        weather: data.weather,
                        temp: data.temp
                    }
                }));
                
                // Update coordinates to fly to the searched township
                if (townshipCoordinates && townshipCoordinates[data.township]) {
                    setCurrentCoords(townshipCoordinates[data.township]);
                } else {
                    setCurrentCoords(defaultLocation);
                }
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

    const getRiskColor = (color) => {
        if (color === 'red') return '#EF4444';
        if (color === 'yellow') return '#F59E0B';
        return '#10B981';
    };

    // Calculate statistics from real data
    const getStats = () => {
        const data = Object.values(allTownshipsRisk);
        const green = data.filter(d => d.colorCode === 'green').length;
        const yellow = data.filter(d => d.colorCode === 'yellow').length;
        const red = data.filter(d => d.colorCode === 'red').length;
        return { green, yellow, red };
    };

    const stats = getStats();

    // Get risk level display text
    const getRiskDisplayText = (riskData, isCurrent) => {
        if (isCurrent && result) {
            return `အန္တရာယ်အဆင့်: ${result.riskLevel}`;
        }
        if (riskData) {
            return `အန္တရာယ်အဆင့်: ${riskData.riskLevel || 'ဘေးကင်း'}`;
        }
        return 'အခြေအနေ: စစ်ဆေးနေဆဲ';
    };

    // Get marker color based on risk data
    const getMarkerColor = (townName) => {
        const riskData = allTownshipsRisk[townName];
        if (!riskData) return '#10B981'; // Default green if no data
        
        if (result && result.township === townName) {
            return getRiskColor(result.colorCode);
        }
        
        return getRiskColor(riskData.colorCode);
    };

    // Get marker size based on risk level
    const getMarkerRadius = (townName) => {
        if (result && result.township === townName) {
            return 16; 
        }
        
        const riskData = allTownshipsRisk[townName];
        if (!riskData) return 10;
        
        // Make high risk markers slightly larger
        if (riskData.colorCode === 'red') return 14;
        if (riskData.colorCode === 'yellow') return 12;
        return 10;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                ရေကြီးမှုအန္တရာယ် အကဲဖြတ်ခြင်း
                            </h1>
                            <p className="text-slate-600 mt-2 flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                မိမိဒေသ၏ ရေကြီးနိုင်ခြေကို ခေတ်မီစနစ်ဖြင့် တိကျစွာ တွက်ချက်ပါ
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-600">နောက်ဆုံးအချိန်: {new Date().toLocaleString('my-MM')}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content  Map and Search Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Map */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-white">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <h3 className="font-bold text-lg">ပထဝီဝင်ဆိုင်ရာ ရေဘေးအန္တရာယ်ပြမြေပုံ</h3>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <span className="text-white/80 text-xs">ဘေးကင်း</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <span className="text-white/80 text-xs">အလယ်အလတ်</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <span className="text-white/80 text-xs">မြင့်မား</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <div className="h-[500px] w-full rounded-xl overflow-hidden border border-slate-200 z-10 relative">
                                {isLoadingMapData ? (
                                    <div className="flex items-center justify-center h-full bg-slate-50">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-3 text-slate-600">မြေပုံဒေတာများ ဖတ်နေသည်...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <MapContainer center={[currentCoords.lat, currentCoords.lng]} zoom={12} style={{ height: '100%', width: '100%' }}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        
                                        {/* fly-to animation */}
                                        <ChangeMapView coords={currentCoords} />

                                        {townshipCoordinates && Object.entries(townshipCoordinates).map(([name, info]) => {
                                            if (!info || !info.lat || !info.lng) return null;

                                            const isCurrent = result && result.township === name;
                                            const markerColor = getMarkerColor(name);
                                            const markerRadius = getMarkerRadius(name);
                                            const riskData = allTownshipsRisk[name];

                                            return (
                                                <CircleMarker
                                                    key={name}
                                                    center={[info.lat, info.lng]}
                                                    radius={markerRadius} 
                                                    fillColor={markerColor}
                                                    color={markerColor}
                                                    weight={isCurrent ? 3 : 2}
                                                    fillOpacity={isCurrent ? 0.8 : 0.6}
                                                >
                                                    <Popup>
                                                        <div className="font-sans p-1 text-center">
                                                            <h4 className="font-bold text-slate-800 text-sm">{name} မြို့နယ်</h4>
                                                            <p className="text-xs text-slate-500 mt-1">
                                                                {getRiskDisplayText(riskData, isCurrent)}
                                                            </p>
                                                            {isCurrent && result && (
                                                                <>
                                                                    <p className="text-xs text-slate-500">ရာသီဥတု: {result.weather}</p>
                                                                    <p className="text-xs text-slate-500">အပူချိန်: {result.temp}°C</p>
                                                                </>
                                                            )}
                                                            {!isCurrent && riskData && riskData.recommendation && (
                                                                <p className="text-xs text-slate-500 mt-1">
                                                                    {riskData.recommendation}
                                                                </p>
                                                            )}
                                                            {/* Click to search this township */}
                                                            <button 
                                                                onClick={() => {
                                                                    setTownship(name);
                                                                    setIsOpen(false);
                                                                    setTimeout(() => {
                                                                        const form = document.querySelector('form');
                                                                        if (form) form.dispatchEvent(new Event('submit'));
                                                                    }, 100);
                                                                }}
                                                                className="mt-2 text-xs bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                                                            >
                                                                စစ်ဆေးမည်
                                                            </button>
                                                        </div>
                                                    </Popup>
                                                </CircleMarker>
                                            );
                                        })}
                                    </MapContainer>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Search and Quick Info Section */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Search Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                            <div className="flex items-center mb-4">
                                <Search className="h-5 w-5 text-blue-600 mr-2" />
                                <h3 className="font-bold text-slate-800">မြို့နယ်ရှာဖွေရန်</h3>
                            </div>
                            
                            <form onSubmit={handleCheck} className="space-y-4">
                                <div className="relative" ref={dropdownRef}>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="မြို့နယ်အမည်ရိုက်ထည့်ပါ..."
                                            value={township}
                                            onFocus={() => setIsOpen(true)}
                                            onChange={(e) => { setTownship(e.target.value); setIsOpen(true); }}
                                            className="w-full pl-9 pr-8 py-2.5 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-slate-50 hover:bg-white text-slate-800 placeholder-slate-400 text-sm"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                                            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>

                                    {isOpen && filteredOptions.length > 0 && (
                                        <ul className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto bg-white border-2 border-blue-100 rounded-xl shadow-2xl divide-y divide-slate-100">
                                            {filteredOptions.map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => { setTownship(option); setIsOpen(false); }}
                                                    className="px-4 py-2.5 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 cursor-pointer transition-all duration-150 text-left font-medium text-sm flex items-center"
                                                >
                                                    <MapPin className="h-3 w-3 mr-2 text-blue-400" />
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 transform hover:scale-[1.02] text-sm"
                                >
                                    {loading ? 'တွက်ချက်နေသည်...' : 'စစ်ဆေးမည်'}
                                </button>
                            </form>
                            
                            {error && (
                                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start">
                                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-700 font-medium text-xs">{error}</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Stats  */}
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-800 mb-3">အခြေအနေအကျဉ်းချုပ်</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                        <span className="text-sm text-slate-700">ဘေးကင်းသောမြို့များ</span>
                                    </div>
                                    <span className="font-bold text-green-600">{stats.green}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg border border-amber-200">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                                        <span className="text-sm text-slate-700">အလယ်အလတ်အန္တရာယ်</span>
                                    </div>
                                    <span className="font-bold text-amber-600">{stats.yellow}</span>
                                </div>
                                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                        <span className="text-sm text-slate-700">မြင့်မားသောအန္တရာယ်</span>
                                    </div>
                                    <span className="font-bold text-red-600">{stats.red}</span>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-slate-200">
                                <p className="text-xs text-slate-500 text-center">
                                    စုစုပေါင်းမြို့နယ်: {townshipOptions.length}
                                </p>
                            </div>
                        </div>

                        {/* Quick Tip */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
                            <div className="flex items-start">
                                <div className="p-1.5 bg-blue-100 rounded-lg mr-2">
                                    <Shield className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-800">အမြန်သိကောင်းစရာ</h4>
                                    <p className="text-xs text-blue-700 mt-1">ရေကြီးမှုအန္တရာယ်ရှိသောနေရာများတွင် ကြိုတင်ပြင်ဆင်မှုများပြုလုပ်ပါ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result UI */}
                {result && (
                    <div className="animate-fade-in-up">
                        <div className={`rounded-2xl border-2 shadow-2xl overflow-hidden transition-all duration-500 ${getColorClass(result.colorCode)}`}>
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
                                        <span className="text-sm font-semibold">{result.riskLevel?.split(' ')[0]}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Weather Info Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Droplets className="h-3 w-3 mr-1 text-blue-500" /> ရာသီဥတု
                                        </div>
                                        <p className="font-bold text-slate-800">{result.weather}</p>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Thermometer className="h-3 w-3 mr-1 text-red-500" /> အပူချိန်
                                        </div>
                                        <p className="font-bold text-slate-800">{result.temp}°C</p>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Wind className="h-3 w-3 mr-1 text-cyan-500" /> အန္တရာယ်အဆင့်
                                        </div>
                                        <p className="font-bold text-slate-800">{result.colorCode === 'red' ? 'မြင့်မား' : result.colorCode === 'yellow' ? 'အလယ်အလတ်' : 'နည်းပါး'}</p>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50">
                                        <div className="flex items-center text-slate-600 text-xs mb-1">
                                            <Activity className="h-3 w-3 mr-1 text-purple-500" /> အခြေအနေ
                                        </div>
                                        <p className="font-bold text-slate-800">{result.colorCode === 'red' ? 'သတိပေးချက်' : result.colorCode === 'yellow' ? 'စောင့်ကြည့်ရန်' : 'ပုံမှန်'}</p>
                                    </div>
                                </div>

                                <hr className="my-6 border-slate-200/50" />

                                {/* Risk Graph */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-slate-800 flex items-center">
                                            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" /> အန္တရာယ်အဆင့် ဂရပ်
                                        </h3>
                                        <span className="font-bold text-2xl text-slate-800">{animatedValue}%</span>
                                    </div>
                                    
                                    <div className="bg-white rounded-xl p-4 border border-slate-200">
                                        <div className="relative h-32">
                                            <div className="relative h-full flex items-end justify-around">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-12 rounded-t-lg transition-all duration-1000" style={{ height: `${animatedValue}%`, backgroundColor: getRiskColor(result.colorCode), minHeight: '10px' }}></div>
                                                    <div className="text-xs text-slate-600 mt-2 font-medium">အန္တရာယ်</div>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className={`p-2 rounded-full ${result.colorCode === 'red' ? 'bg-red-100' : result.colorCode === 'yellow' ? 'bg-amber-100' : 'bg-green-100'}`}>
                                                        {result.colorCode === 'red' ? <TrendingUp className="h-6 w-6 text-red-500" /> : result.colorCode === 'yellow' ? <Activity className="h-6 w-6 text-amber-500" /> : <TrendingDown className="h-6 w-6 text-green-500" />}
                                                    </div>
                                                    <div className="text-xs text-slate-600 mt-2 font-medium">{result.colorCode === 'red' ? 'မြင့်တက်နေ' : result.colorCode === 'yellow' ? 'တည်ငြိမ်' : 'ကျဆင်းနေ'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-6 border-slate-200/50" />

                                {/* Recommendations */}
                                <div className="space-y-4">
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                                        <h3 className="font-bold text-slate-800 mb-2 flex items-center"><AlertTriangle className="h-4 w-4 mr-2 text-amber-500" /> စစ်ဆေးတွေ့ရှိချက်</h3>
                                        <p className="text-slate-700 font-medium leading-relaxed">{result.riskLevel}</p>
                                    </div>
                                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50">
                                        <h3 className="font-bold text-slate-800 mb-2 flex items-center"><Shield className="h-4 w-4 mr-2 text-blue-500" /> အကြံပြုချက်</h3>
                                        <p className="text-slate-700 leading-relaxed">{result.recommendation}</p>
                                    </div>
                                </div>

                                {/* Fly to Map Button */}
                                <div className="mt-6">
                                    <button 
                                        onClick={() => {
                                            if (result && townshipCoordinates[result.township]) {
                                                setCurrentCoords(townshipCoordinates[result.township]);
                                            }
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30 hover:shadow-xl"
                                    >
                                        <MapPin className="h-4 w-4" />
                                        <span>မြေပုံပေါ်သို့ ပြန်သွားရန်</span>
                                    </button>
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