import { useEffect, useState } from 'react';
import { fetchGuestChecklist } from '../api/checklistApi';

function ChecklistPage() {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuestChecklist()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = (id) => {
    setCheckedTasks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) return <div className="p-6 text-center">ခေတ္တစောင့်ဆိုင်းပါ</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">ရေမကြီးခင် ကြိုတင်ပြင်ဆင်ထားရမည့် အခြေခံစာရင်းများ</h1>
        </header>

        {/* 🔒 Locked/Customized Banner (Call-To-Action) */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">ကိုယ်ပိုင် Checklist ဖန်တီးချင်ပါသလား?</h3>
            <p className="text-blue-700 text-sm mt-1">အကောင့်ဖွင့်ပြီး Login ဝင်ထားပါက မိမိစိတ်ကြိုက် Checklist Item များ ထပ်ထည့်နိုင်ပြီး ပြီးစီးမှုအခြေအနေကို အမြဲတမ်း သိမ်းဆည်းထားနိုင်မှာ ဖြစ်ပါတယ်။</p>
          </div>
          <button className="bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg whitespace-nowrap hover:bg-blue-700 transition shadow-sm">
            အကောင့်ဖွင့်ရန်
          </button>
        </div>

        {/* Checklist View */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
          {tasks.map((item) => (
            <div key={item._id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition">
              <input
                type="checkbox"
                id={item._id}
                checked={!!checkedTasks[item._id]}
                onChange={() => handleToggle(item._id)}
                className="mt-1 w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <label htmlFor={item._id} className={`cursor-pointer select-none flex-1 ${checkedTasks[item._id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                <span className="font-semibold block text-base">{item.task}</span>
                {item.description && <span className="text-sm text-slate-500 block mt-0.5">{item.description}</span>}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChecklistPage;