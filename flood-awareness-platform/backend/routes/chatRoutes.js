const express = require('express');
const router = express.Router();
const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/ask', async (req, res) => {
    const { question, context } = req.body;

    if (!question) {
        return res.status(400).json({ message: 'မေးခွန်းထည့်သွင်းရန် လိုအပ်ပါသည်။' });
    }

    try {
        const systemPrompt = `
            မင်းက ရေဘေးအန္တရာယ် ကူညီကယ်ဆယ်ရေး ကျွမ်းကျင်သူ AI Assistant တစ်ဦး ဖြစ်ပါတယ်။
            User ကို အပြုသဘောဆောင်ပြီး တကယ့်ကို အသုံးဝင်မယ့် နည်းလမ်းတွေကို မြန်မာလိုပဲ ဖြေကြားပေးပါ။
            
            [လက်ရှိဒေသဆိုင်ရာ Context အချက်အလက်]
            - မြို့နယ်: ${context?.township || 'မသိရပါ'}
            - လက်ရှိရာသီဥတု: ${context?.weather || 'မသိရပါ'}
            - Risk Level: ${context?.riskLevel || 'မသိရပါ'}
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            model: "llama-3.3-70b-versatile" 
        });

        const aiReply = chatCompletion.choices[0].message.content;
        res.json({ reply: aiReply });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ message: 'AI Assistant ပြန်လည်ဖြေကြားရန် အဆင်မပြေဖြစ်သွားပါသည်။ ခဏနေမှ ပြန်စမ်းကြည့်ပါ။' });
    }
});

module.exports = router;