import { useEffect, useState } from 'react';
import { fetchArticles } from '../api/articleApi'; 

function KnowledgeHub() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-slate-600 font-medium">ခေတ္တစောင့်ဆိုင်းပါ</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-800">ရေဘေးအန္တရာယ်ဆိုင်ရာ လမ်းညွှန်ချက်များနှင့် ဗဟုသုတများ</h1>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.length === 0 ? (
          <p className="text-slate-500">ဆောင်းပါးများ မရှိသေးပါ။</p>
        ) : (
          articles.map((article) => (
            <div key={article._id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-3">
                {article.category}
              </span>
              <h2 className="text-xl font-bold text-slate-800 mb-2">{article.title}</h2>
              <p className="text-slate-600 text-sm line-clamp-3">{article.content}</p>
              <button className="mt-4 text-blue-600 font-medium text-sm hover:underline">
                ဆက်လက်ဖတ်ရှုရန် →
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default KnowledgeHub;