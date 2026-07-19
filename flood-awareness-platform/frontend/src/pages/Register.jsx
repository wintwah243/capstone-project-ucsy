import { useState } from 'react';
import { register } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await register(formData);
        if (data.message && !data.message.includes('error') && !data.message.includes('မှား')) {
            setMessage(data.message);
            // Navigate to login 
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-50">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <User className="h-8 w-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">အကောင့်သစ်ဖွင့်ရန်</h2>
                        <p className="text-slate-500 mt-2 text-sm">အကောင့်အသစ်တစ်ခု ဖန်တီးပါ</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                အသုံးပြုသူအမည်
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="အသုံးပြုသူအမည်" 
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={e => setFormData({...formData, username: e.target.value})} 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                အီးမေးလ်
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="email" 
                                    placeholder="example@email.com" 
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                စကားဝှက်
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={e => setFormData({...formData, password: e.target.value})} 
                                    required 
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 group"
                        >
                            အကောင့်ဖွင့်မည်
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Success Message */}
                    {message && (
                        <div className={`mt-4 p-4 rounded-xl flex items-start gap-3 ${
                            message.includes('error') || message.includes('မှား') 
                                ? 'bg-red-50 border border-red-100' 
                                : 'bg-blue-50 border border-blue-100'
                        }`}>
                            <CheckCircle className={`h-5 w-5 mt-0.5 shrink-0 ${
                                message.includes('error') || message.includes('မှား') 
                                    ? 'text-red-500' 
                                    : 'text-blue-500'
                            }`} />
                            <div>
                                <p className={`text-sm ${
                                    message.includes('error') || message.includes('မှား') 
                                        ? 'text-red-700' 
                                        : 'text-blue-700'
                                }`}>
                                    {message}
                                </p>
                                {!message.includes('error') && !message.includes('မှား') && (
                                    <p className="text-xs text-blue-500 mt-1">
                                        အကောင့်ဝင်ရန် စာမျက်နှာသို့ ခေါ်ဆောင်သွားပါမည်...
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <p className="text-center mt-6 text-sm text-slate-500">
                        အကောင့်ရှိပြီးသားလား?{' '}
                        <a href="/login" className="text-blue-600 font-medium hover:text-blue-700">
                            အကောင့်ဝင်ရန်
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;