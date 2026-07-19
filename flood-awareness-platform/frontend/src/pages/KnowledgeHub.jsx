import { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Video, 
  Newspaper, 
  Camera, 
  Phone, 
  AlertTriangle,
  ChevronRight,
  Play,
  Clock,
  Cloud,
  Users,
  Download,
  Shield,
  Heart,
  Bookmark,
  Share2,
  Search,
  Filter,
  ArrowUpRight,
  MapPin,
  Mail,
  MessageCircle,
  ThumbsUp,
  Eye,
  Calendar,
  FileText,
  ExternalLink,
  Grid,
  List,
  TrendingUp,
  Info
} from 'lucide-react';

function KnowledgeHub() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);

  const mockVideos = [
    {
      id: 1,
      title: 'ရေကြီးမှုအန္တရာယ် ကြိုတင်ကာကွယ်နည်းများ',
      duration: '၁၂:၃၄',
      thumbnail: '/api/placeholder/400/225',
      views: '၁၂,၅၀၀',
      date: '၂၀၂၆ ဇွန်လ ၂၅ ရက်',
      category: 'ကြိုတင်ပြင်ဆင်မှု',
      description: 'ရေကြီးမှုမဖြစ်ပွားမီ ကြိုတင်ပြင်ဆင်ရမည့် အရေးကြီးအချက်များ'
    },
    {
      id: 2,
      title: 'အရေးပေါ်ပစ္စည်းများ ထုပ်ပိုးနည်း',
      duration: '၈:၂၁',
      thumbnail: '/api/placeholder/400/225',
      views: '၈,၉၀၀',
      date: '၂၀၂၆ ဇွန်လ ၂၀ ရက်',
      category: 'လက်တွေ့သင်ခန်းစာ',
      description: 'ရေဘေးအတွက် အရေးပေါ်သုံးပစ္စည်းများ စနစ်တကျထုပ်ပိုးနည်း'
    },
    {
      id: 3,
      title: 'ရေဘေးလွတ်ရာ ရွှေ့ပြောင်းခြင်းလမ်းညွှန်',
      duration: '၁၅:၄၅',
      thumbnail: '/api/placeholder/400/225',
      views: '၁၅,၂၀၀',
      date: '၂၀၂၆ ဇွန်လ ၁၈ ရက်',
      category: 'ဘေးလွတ်ရာရွှေ့ပြောင်းခြင်း',
      description: 'ရေကြီးချိန်တွင် ဘေးကင်းလုံခြုံစွာ ရွှေ့ပြောင်းနိုင်ရန် လမ်းညွှန်'
    }
  ];

  const mockNews = [
    {
      id: 1,
      title: 'မန္တလေးတိုင်းတွင် ရေကြီးမှုအန္တရာယ် သတိပေးချက်ထုတ်ပြန်',
      source: 'မိုးလေဝသနှင့်ဇလဗေဒညွှန်ကြားမှုဦးစီးဌာန',
      date: '၂၀၂၆ ဇူလိုင် ၁၅ ရက်',
      time: '၁၀:၃၀ AM',
      category: 'အရေးပေါ်သတင်း',
      priority: 'high',
      excerpt: 'မန္တလေးတိုင်းဒေသကြီးအတွင်း မိုးသည်းထန်စွာရွာသွန်းနိုင်ပြီး မြစ်ရေများ တက်လာနိုင်သည့်အတွက်...'
    },
    {
      id: 2,
      title: 'ပြည်သူများအတွက် ရေဘေးကာကွယ်ရေးအသိပညာပေးအစီအစဉ်',
      source: 'လူမှုဝန်ထမ်းကယ်ဆယ်ရေးနှင့်ပြန်လည်နေရာချထားရေးဝန်ကြီးဌာန',
      date: '၂၀၂၆ ဇူလိုင် ၁၄ ရက်',
      time: '၂:၁၅ PM',
      category: 'အသိပညာပေး',
      priority: 'medium',
      excerpt: 'ရေဘေးအန္တရာယ်ကြိုတင်ကာကွယ်ရေးအတွက် ပြည်သူများအား အသိပညာပေးအစီအစဉ်များ ဆောင်ရွက်လျက်ရှိ...'
    },
    {
      id: 3,
      title: 'ဧရာဝတီမြစ်ရေ စိုးရိမ်ရေမှတ်အထိ ရောက်ရှိနိုင်',
      source: 'မြန်မာနိုင်ငံရေအရင်းအမြစ်စီမံခန့်ခွဲမှုအဖွဲ့',
      date: '၂၀၂၆ ဇူလိုင် ၁၃ ရက်',
      time: '၉:၀၀ AM',
      category: 'အရေးပေါ်သတင်း',
      priority: 'high',
      excerpt: 'ဧရာဝတီမြစ်ရေသည် လာမည့် ၂၄ နာရီအတွင်း စိုးရိမ်ရေမှတ်သို့ ရောက်ရှိနိုင်ကြောင်း ခန့်မှန်း...'
    }
  ];

  const mockEmergencyContacts = [
    {
      id: 1,
      name: 'အရေးပေါ်ကယ်ဆယ်ရေးဌာန',
      phone: '၁၅၅',
      type: 'emergency',
      available: '24/7',
      icon: Phone,
      description: 'အရေးပေါ်အကူအညီ လိုအပ်ပါက ဤနံပါတ်ကို ခေါ်ဆိုပါ'
    },
    {
      id: 2,
      name: 'မီးသတ်ဦးစီးဌာန',
      phone: '၁၅၆',
      type: 'emergency',
      available: '24/7',
      icon: Phone,
      description: 'မီးဘေးနှင့် ရေဘေးကယ်ဆယ်ရေး'
    },
    {
      id: 3,
      name: 'လူမှုဝန်ထမ်းကယ်ဆယ်ရေးအဖွဲ့',
      phone: '၀၉-၅၅၅-၁၂၃၄၅၆',
      type: 'support',
      available: '24/7',
      icon: Heart,
      description: 'ရေဘေးသင့်ပြည်သူများအတွက် အထောက်အပံ့နှင့် ကယ်ဆယ်ရေး'
    },
    {
      id: 4,
      name: 'မိုးလေဝသသတင်းဌာန',
      phone: '၀၆၇-၄၁၁-၂၅၂',
      type: 'info',
      available: 'ရုံးချိန်',
      icon: Cloud,
      description: 'မိုးလေဝသအခြေအနေနှင့် ရေကြီးမှုသတိပေးချက်များ'
    }
  ];

  const mockGuides = [
    {
      id: 1,
      title: 'ရေဘေးကြိုတင်ပြင်ဆင်ရေးလမ်းညွှန်',
      type: 'pdf',
      size: '2.4 MB',
      downloads: '၁၅,၂၀၀',
      category: 'ကြိုတင်ပြင်ဆင်မှု',
      icon: FileText
    },
    {
      id: 2,
      title: 'အရေးပေါ်ပစ္စည်းများစာရင်း',
      type: 'pdf',
      size: '1.1 MB',
      downloads: '၁၂,၈၀၀',
      category: 'စစ်ဆေးရန်စာရင်း',
      icon: FileText
    },
    {
      id: 3,
      title: 'ရေဘေးလွတ်ရာရွှေ့ပြောင်းမှုအစီအစဉ်',
      type: 'pdf',
      size: '3.2 MB',
      downloads: '၉,၅၀၀',
      category: 'ဘေးလွတ်ရာရွှေ့ပြောင်းခြင်း',
      icon: FileText
    },
    {
      id: 4,
      title: 'ရေဘေးလွန်ကာလ ကျန်းမာရေးလမ်းညွှန်',
      type: 'pdf',
      size: '1.8 MB',
      downloads: '၇,၃၀၀',
      category: 'ကျန်းမာရေး',
      icon: FileText
    }
  ];

  const mockPhotos = [
    {
      id: 1,
      title: 'ရေကြီးမှုကာကွယ်ရေး ဆောင်ရွက်ချက်များ',
      image: '/api/placeholder/400/300',
      date: '၂၀၂၆ ဇူလိုင် ၁၀ ရက်',
      category: 'ကာကွယ်ရေး'
    },
    {
      id: 2,
      title: 'စေတနာ့ဝန်ထမ်းများ၏ ကယ်ဆယ်ရေးလုပ်ငန်းများ',
      image: '/api/placeholder/400/300',
      date: '၂၀၂၆ ဇူလိုင် ၉ ရက်',
      category: 'ကယ်ဆယ်ရေး'
    },
    {
      id: 3,
      title: 'ရေဘေးကြိုတင်ပြင်ဆင်မှု သင်တန်း',
      image: '/api/placeholder/400/300',
      date: '၂၀၂၆ ဇူလိုင် ၈ ရက်',
      category: 'သင်တန်း'
    },
    {
      id: 4,
      title: 'အရေးပေါ်ပစ္စည်းများ ဖြန့်ဝေခြင်း',
      image: '/api/placeholder/400/300',
      date: '၂၀၂၆ ဇူလိုင် ၇ ရက်',
      category: 'အကူအညီ'
    }
  ];

  // Fetch articles from backend
  useEffect(() => {
    const fetchArticlesFromBackend = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/articles'); 
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticlesFromBackend();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium text-lg">ခေတ္တစောင့်ဆိုင်းပါ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600 font-medium text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ပြန်လည်ကြိုးစားရန်
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'all', label: 'အားလုံး', icon: Grid },
    { id: 'articles', label: 'ဆောင်းပါးများ', icon: BookOpen },
    { id: 'videos', label: 'ဗီဒီယိုများ', icon: Video },
    { id: 'news', label: 'သတင်းများ', icon: Newspaper },
    { id: 'guides', label: 'လမ်းညွှန်များ', icon: BookOpen },
    { id: 'photos', label: 'ဓာတ်ပုံများ', icon: Camera },
    { id: 'contacts', label: 'ဆက်သွယ်ရန်', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center mb-4">
            <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold animate-pulse">
              ⚡ Knowledge Hub
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            ရေဘေးအန္တရာယ်ဆိုင်ရာ ဗဟုသုတများ
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            ရေဘေးအန္တရာယ်ကြိုတင်ကာကွယ်ရေးအတွက် လိုအပ်သော ဗဟုသုတများ၊ 
            လမ်းညွှန်ချက်များနှင့် အရေးပေါ်ဆက်သွယ်ရန်အချက်အလက်များ
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-cyan-400">၄၅+</div>
              <div className="text-sm text-slate-300">ဗီဒီယိုသင်ခန်းစာများ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">၁၂၀+</div>
              <div className="text-sm text-slate-300">လမ်းညွှန်ချက်များ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400">၅၀၀+</div>
              <div className="text-sm text-slate-300">သတင်းများ</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-red-400">၂၄/၇</div>
              <div className="text-sm text-slate-300">အရေးပေါ်အကူအညီ</div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Articles from Backend */}
        {(activeTab === 'all' || activeTab === 'articles') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-indigo-600" />
                ဆောင်းပါးများ
              </h2>
              {articles.length === 0 && (
                <p className="text-slate-500">ဆောင်းပါးများ မရှိသေးပါ</p>
              )}
            </div>
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {articles.map((article) => (
                <div key={article._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {article.category}
                    </span>
                    {article.source && (
                      <span className="text-xs text-slate-500 flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {article.source}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition">
                    {article.title}
                  </h2>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                    {article.content}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="text-blue-600 font-medium text-sm hover:underline flex items-center">
                      ဆက်လက်ဖတ်ရှုရန် <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition">
                      <Bookmark className="h-4 w-4 text-slate-400 hover:text-indigo-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {articles.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">ဆောင်းပါးများ မရှိသေးပါ</p>
              </div>
            )}
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'videos') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <Video className="h-6 w-6 mr-2 text-blue-600" />
                ဗီဒီယိုသင်ခန်းစာများ
              </h2>
              <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                အားလုံးကြည့်ရန် <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mockVideos.map((video) => (
                <div key={video.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-white rounded-full p-4 transform scale-90 group-hover:scale-100 transition">
                        <Play className="h-8 w-8 text-blue-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {video.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition">{video.title}</h3>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {video.views}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {video.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'news') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <Newspaper className="h-6 w-6 mr-2 text-red-600" />
                နောက်ဆုံးရသတင်းများ
              </h2>
              <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                သတင်းအားလုံး <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {mockNews.map((news) => (
                <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {news.priority === 'high' && (
                          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            <AlertTriangle className="h-3 w-3 mr-1" /> အရေးကြီး
                          </span>
                        )}
                        <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                          {news.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{news.title}</h3>
                      <p className="text-slate-600 mb-3">{news.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          {news.source}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {news.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {news.time}
                        </span>
                      </div>
                    </div>
                    <button className="ml-4 p-2 hover:bg-slate-100 rounded-lg transition">
                      <Bookmark className="h-5 w-5 text-slate-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'guides') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-green-600" />
                လမ်းညွှန်ချက်များနှင့် စာရွက်စာတမ်းများ
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {mockGuides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <div key={guide.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition group">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-xl p-3 group-hover:bg-green-200 transition">
                        <Icon className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {guide.category}
                          </span>
                          <span className="text-slate-400 text-sm">{guide.type.toUpperCase()}</span>
                        </div>
                        <h3 className="font-semibold text-slate-800 mb-2">{guide.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                          <span>{guide.size}</span>
                          <span className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            {guide.downloads} ကြိမ်
                          </span>
                        </div>
                        <button className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                          <Download className="h-4 w-4 mr-1" />
                          ဒေါင်းလုဒ်လုပ်ရန်
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'photos') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <Camera className="h-6 w-6 mr-2 text-purple-600" />
                ဓာတ်ပုံမှတ်တမ်းများ
              </h2>
              <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
                အားလုံးကြည့်ရန် <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockPhotos.map((photo) => (
                <div key={photo.id} className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition cursor-pointer">
                  <img src={photo.image} alt={photo.title} className="w-full h-48 object-cover group-hover:scale-110 transition duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="font-semibold mb-1">{photo.title}</h4>
                      <div className="text-sm text-slate-300">{photo.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'contacts') && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <Phone className="h-6 w-6 mr-2 text-red-600" />
                အရေးပေါ်ဆက်သွယ်ရန်
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockEmergencyContacts.map((contact) => {
                const Icon = contact.icon;
                return (
                  <div key={contact.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      contact.type === 'emergency' ? 'bg-red-100' :
                      contact.type === 'support' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        contact.type === 'emergency' ? 'text-red-600' :
                        contact.type === 'support' ? 'text-blue-600' :
                        'text-green-600'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{contact.name}</h3>
                    <p className="text-sm text-slate-600 mb-3">{contact.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{contact.phone}</span>
                      <span className="text-xs text-slate-500">{contact.available}</span>
                    </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                      ခေါ်ဆိုရန်
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default KnowledgeHub;