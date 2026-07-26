import { useEffect, useState } from 'react';
import { fetchGuestChecklist, fetchUserChecklist, createChecklistItem } from '../api/checklistApi';
import { Link } from 'react-router-dom';
import { Plus, X } from 'lucide-react';

function ChecklistPage() {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTask, setNewTask] = useState({ task: '', description: '', category: 'Before Flood' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchData = async () => {
      try {
        if (token) {
          // Logged in user - fetch their personal + default checklists
          const data = await fetchUserChecklist();
          setTasks(data);
        } else {
          // Guest user - fetch only default checklist
          const data = await fetchGuestChecklist();
          setTasks(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (id) => {
    setCheckedTasks(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    
    try {
      const createdTask = await createChecklistItem(newTask);
      setTasks(prev => [...prev, createdTask]);
      setNewTask({ task: '', description: '', category: 'Before Flood' });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) return <div className="p-6 text-center">ခေတ္တစောင့်ဆိုင်းပါ</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-800">ရေမကြီးခင် ကြိုတင်ပြင်ဆင်ထားရမည့် အခြေခံစာရင်းများ</h1>
            {isLoggedIn && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                <Plus className="h-5 w-5" />
                <span className="font-semibold text-sm">အသစ်ထည့်ရန်</span>
              </button>
            )}
          </div>
        </header>

        {/* this banner is only shown for people with no login or registration */}
        {!isLoggedIn && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="font-bold text-blue-900 text-lg flex items-center gap-2">ကိုယ်ပိုင် Checklist ဖန်တီးချင်ပါသလား?</h3>
              <p className="text-blue-700 text-sm mt-1">အကောင့်ဖွင့်ပြီး Login ဝင်ထားပါက မိမိစိတ်ကြိုက် Checklist Item များ ထပ်ထည့်နိုင်ပြီး ပြီးစီးမှုအခြေအနေကို အမြဲတမ်း သိမ်းဆည်းထားနိုင်မှာ ဖြစ်ပါတယ်။</p>
            </div>
            <Link to="/register" className="bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg whitespace-nowrap hover:bg-blue-700 transition shadow-sm">
              အကောင့်ဖွင့်ရန်
            </Link>
          </div>
        )}

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
                <div className="flex items-center gap-2">
                  <span className="font-semibold block text-base">{item.task}</span>
                  {item.category && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {item.category}
                    </span>
                  )}
                  {item.user && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      ကိုယ်ပိုင်
                    </span>
                  )}
                </div>
                {item.description && <span className="text-sm text-slate-500 block mt-0.5">{item.description}</span>}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Checklist အသစ်ထည့်ရန်</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  လုပ်ဆောင်ရန် *
                </label>
                <input
                  type="text"
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  placeholder="ဥပမာ - ရေသန့်ဘူးများ စုဆောင်းထားပါ"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  အမျိုးအစား
                </label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="Before Flood">ရေမကြီးမီ</option>
                  <option value="During Flood">ရေကြီးနေစဉ်</option>
                  <option value="After Flood">ရေကြီးပြီးနောက်</option>
                  <option value="Emergency">အရေးပေါ်</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ဖော်ပြချက်
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="အသေးစိတ် ဖော်ပြချက် (optional)"
                  rows="3"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition"
                >
                  မလုပ်တော့ပါ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                >
                  သိမ်းဆည်းမည်
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChecklistPage;