import { useEffect, useState } from 'react';
import { fetchGuestChecklist, fetchUserChecklist, createChecklistItem, updateChecklistItem, deleteChecklistItem } from '../api/checklistApi';
import { Link } from 'react-router-dom';
import { Plus, X, Edit3, Trash2, ListChecks, UserCheck, Shield, Sparkles, ChevronRight } from 'lucide-react';

function ChecklistPage() {
  const [tasks, setTasks] = useState([]);
  const [defaultTasks, setDefaultTasks] = useState([]);
  const [customTasks, setCustomTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ task: '', description: '', category: 'Before Flood' });
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchData = async () => {
      try {
        let data;
        if (token) {
          data = await fetchUserChecklist();
        } else {
          data = await fetchGuestChecklist();
        }
        
        // Separate default and custom tasks
        const defaults = data.filter(item => !item.user);
        const customs = data.filter(item => item.user);
        
        setTasks(data);
        setDefaultTasks(defaults);
        setCustomTasks(customs);
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
      setCustomTasks(prev => [...prev, createdTask]);
      setTasks(prev => [...prev, createdTask]);
      setNewTask({ task: '', description: '', category: 'Before Flood' });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setNewTask({ 
      task: task.task, 
      description: task.description || '', 
      category: task.category || 'Before Flood' 
    });
    setShowEditModal(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    
    try {
      const updatedTask = await updateChecklistItem(editingTask._id, newTask);
      setCustomTasks(prev => prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      ));
      setTasks(prev => prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      ));
      setNewTask({ task: '', description: '', category: 'Before Flood' });
      setEditingTask(null);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('ဤ checklist item ကို ဖျက်ရန် သေချာပါသလား?')) {
      return;
    }
    
    try {
      await deleteChecklistItem(id);
      setCustomTasks(prev => prev.filter(task => task._id !== id));
      setTasks(prev => prev.filter(task => task._id !== id));
      setCheckedTasks(prev => {
        const newChecked = { ...prev };
        delete newChecked[id];
        return newChecked;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getProgress = (taskList) => {
    if (taskList.length === 0) return 0;
    const checked = taskList.filter(task => checkedTasks[task._id]).length;
    return Math.round((checked / taskList.length) * 100);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Before Flood': return '🔵';
      case 'During Flood': return '🟡';
      case 'After Flood': return '🟢';
      case 'Emergency': return '🔴';
      default: return '⚪';
    }
  };

  const renderTaskItem = (item) => (
    <div key={item._id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-all duration-200 group">
      <div className="relative">
        <input
          type="checkbox"
          id={item._id}
          checked={!!checkedTasks[item._id]}
          onChange={() => handleToggle(item._id)}
          className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        />
        {checkedTasks[item._id] && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-5 h-5 bg-blue-600 rounded scale-0 animate-ping"></div>
          </div>
        )}
      </div>
      <label htmlFor={item._id} className={`cursor-pointer select-none flex-1 ${checkedTasks[item._id] ? 'opacity-60' : ''}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-semibold block text-base transition-all duration-300 ${checkedTasks[item._id] ? 'line-through text-slate-400' : 'text-slate-700'}`}>
            {getCategoryIcon(item.category)} {item.task}
          </span>
          {item.category && (
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              item.category === 'Emergency' ? 'bg-red-100 text-red-700 border border-red-200' :
              item.category === 'During Flood' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
              item.category === 'After Flood' ? 'bg-green-100 text-green-700 border border-green-200' :
              'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {item.category === 'Before Flood' ? 'ရေမကြီးမီ' :
               item.category === 'During Flood' ? 'ရေကြီးနေစဉ်' :
               item.category === 'After Flood' ? 'ရေကြီးပြီးနောက်' :
               item.category}
            </span>
          )}
          {item.user && (
            <span className="text-xs bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-medium border border-indigo-200 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              ကိုယ်ပိုင်
            </span>
          )}
        </div>
        {item.description && (
          <span className={`text-sm block mt-1.5 leading-relaxed ${checkedTasks[item._id] ? 'text-slate-400 line-through' : 'text-slate-500'}`}>
            {item.description}
          </span>
        )}
      </label>
      
      {isLoggedIn && item.user && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={() => handleEditClick(item)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="ပြင်ဆင်ရန်"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDeleteTask(item._id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="ဖျက်ရန်"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium text-lg">ခေတ္တစောင့်ဆိုင်းပါ...</p>
        <p className="text-slate-400 text-sm mt-1">Checklist များ ရယူနေသည်</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ရေဘေးကြိုတင်ပြင်ဆင်ရေး Checklist
              </h1>
              <p className="text-slate-600 mt-2 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-blue-500" />
                ရေမကြီးခင် ကြိုတင်ပြင်ဆင်ထားရမည့် အခြေခံစာရင်းများ
              </p>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setNewTask({ task: '', description: '', category: 'Before Flood' });
                  setShowCreateModal(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                <span className="font-semibold text-sm">အသစ်ထည့်ရန်</span>
              </button>
            )}
          </div>
        </header>

        {/* Banner for non-logged-in users */}
        {!isLoggedIn && (
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-8 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  ကိုယ်ပိုင် Checklist ဖန်တီးချင်ပါသလား?
                </h3>
                <p className="text-blue-100 text-sm mt-2 max-w-lg">
                  အကောင့်ဖွင့်ပြီး Login ဝင်ထားပါက မိမိစိတ်ကြိုက် Checklist Item များ ထပ်ထည့်နိုင်ပြီး 
                  ပြီးစီးမှုအခြေအနေကို အမြဲတမ်း သိမ်းဆည်းထားနိုင်မှာ ဖြစ်ပါတယ်။
                </p>
              </div>
              <Link 
                to="/register" 
                className="bg-white text-blue-600 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-blue-50 transition shadow-lg flex items-center gap-2"
              >
                အကောင့်ဖွင့်ရန်
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* login usr view */}
        {isLoggedIn && (
          <>
            {/* Tabs for logged-in users */}
            {customTasks.length > 0 && (
              <div className="flex gap-2 mb-6 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === 'all' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  အားလုံး ({tasks.length})
                </button>
                <button
                  onClick={() => setActiveTab('default')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === 'default' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ListChecks className="h-4 w-4 inline mr-1" />
                  အခြေခံ ({defaultTasks.length})
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === 'custom' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Sparkles className="h-4 w-4 inline mr-1" />
                  ကိုယ်ပိုင် ({customTasks.length})
                </button>
              </div>
            )}

            {/* Progress Bar */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">ပြီးစီးမှု အခြေအနေ</span>
                <span className="text-sm font-bold text-blue-600">{getProgress(tasks)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgress(tasks)}%` }}
                ></div>
              </div>
            </div>

            {/* Default Checklist Section */}
            {(activeTab === 'all' || activeTab === 'default') && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ListChecks className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">အခြေခံ Checklist</h2>
                    <p className="text-sm text-slate-500">ရေဘေးအတွက် မဖြစ်မနေပြင်ဆင်သင့်သည့် အချက်များ</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                  {defaultTasks.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                      <ListChecks className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>အခြေခံ checklist items မရှိသေးပါ</p>
                    </div>
                  ) : (
                    defaultTasks.map(renderTaskItem)
                  )}
                </div>
              </div>
            )}

            {/* Custom Checklist Section */}
            {(activeTab === 'all' || activeTab === 'custom') && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">ကိုယ်ပိုင် Checklist</h2>
                    <p className="text-sm text-slate-500">မိမိကိုယ်တိုင် ထည့်သွင်းထားသော အချက်များ</p>
                  </div>
                </div>
                {customTasks.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl inline-block mb-4">
                      <Plus className="h-8 w-8 text-indigo-500" />
                    </div>
                    <p className="text-slate-600 font-medium mb-1">ကိုယ်ပိုင် checklist items မရှိသေးပါ</p>
                    <p className="text-slate-400 text-sm mb-4">သင့်အတွက် လိုအပ်သော အချက်များကို ထည့်သွင်းပါ</p>
                    <button
                      onClick={() => {
                        setNewTask({ task: '', description: '', category: 'Before Flood' });
                        setShowCreateModal(true);
                      }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg"
                    >
                      <Plus className="h-5 w-5" />
                      <span className="font-semibold text-sm">အသစ်ထည့်ရန်</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
                    {customTasks.map(renderTaskItem)}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* guest user view */}
        {!isLoggedIn && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {tasks.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <ListChecks className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Checklist items မရှိသေးပါ</p>
              </div>
            ) : (
              tasks.map(renderTaskItem)
            )}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Checklist အသစ်ထည့်ရန်</h2>
                <p className="text-sm text-slate-500 mt-1">ကိုယ်ပိုင် checklist item အသစ်ထည့်ပါ</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition"
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                >
                  <option value="Before Flood">🔵 ရေမကြီးမီ</option>
                  <option value="During Flood">🟡 ရေကြီးနေစဉ်</option>
                  <option value="After Flood">🟢 ရေကြီးပြီးနောက်</option>
                  <option value="Emergency">🔴 အရေးပေါ်</option>
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
                >
                  မလုပ်တော့ပါ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25"
                >
                  သိမ်းဆည်းမည်
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && editingTask && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Checklist ပြင်ဆင်ရန်</h2>
                <p className="text-sm text-slate-500 mt-1">{editingTask.task}</p>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingTask(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-xl transition"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleUpdateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  လုပ်ဆောင်ရန် *
                </label>
                <input
                  type="text"
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  placeholder="ဥပမာ - ရေသန့်ဘူးများ စုဆောင်းထားပါ"
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                >
                  <option value="Before Flood">🔵 ရေမကြီးမီ</option>
                  <option value="During Flood">🟡 ရေကြီးနေစဉ်</option>
                  <option value="After Flood">🟢 ရေကြီးပြီးနောက်</option>
                  <option value="Emergency">🔴 အရေးပေါ်</option>
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
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingTask(null);
                  }}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all"
                >
                  မလုပ်တော့ပါ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25"
                >
                  ပြင်ဆင်မည်
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