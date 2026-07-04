const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Mapping Dictionary
const townshipMapping = {
  'ရန်ကုန်': 'Yangon',
  'မန္တလေး': 'Mandalay',
  'နေပြည်တော်': 'Naypyidaw',
  'ပဲခူး': 'Bago',
  'မော်လမြိုင်': 'Mawlamyine',
  'ပုသိမ်': 'Pathein',
  'တောင်ကြီး': 'Taunggyi',
  'မုံရွာ': 'Monywa',
  'စစ်တွေ': 'Sittwe',

  'လှိုင်': 'Hlaing',
  'ကမာရွတ်': 'Kamayut',
  'ဗဟန်း': 'Bahan',
  'စမ်းချောင်း': 'Sanchaung',
  'မရမ်းကုန်း': 'Mayangone',
  'အင်းစိန်': 'Insein',
  'မင်္ဂလာဒုံ': 'Mingaladon',
  'တာမွေ': 'Tamwe',
  'ရန်ကင်း': 'Yankin',
  'ဗိုလ်တစ်ထောင်': 'Botahtaung',
  'ဒဂုံ': 'Dagon',
  'သင်္ဃန်းကျွန်း': 'Thingangyun',
  'သာကေတ': 'Thaketa',
  'လှိုင်သာယာ': 'Hlaingthaya'
};

router.post('/check', async (req, res) => {
  let { township } = req.body;
  if (!township) return res.status(400).json({ message: 'မြို့နယ်အမည် လိုအပ်ပါသည်။' });

  let searchInput = township.trim();
  if (townshipMapping[searchInput]) searchInput = townshipMapping[searchInput];

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
    const weatherRes = await axios.get(weatherUrl);
    const weatherData = weatherRes.data;

    const aiPrompt = `
      မင်းက ရေဘေးအန္တရာယ်ဆိုင်ရာ ကျွမ်းကျင်သူ AI တစ်ဦး ဖြစ်ပါတယ်။
      အောက်ပါ လက်ရှိ မိုးလေဝသ အချက်အလက်များအပေါ် မူတည်ပြီး မြန်မာနိုင်ငံ၊ ${township} မြို့နယ်အတွက် Flood Risk Assessment ကို မြန်မာလိုပဲ သုံးသပ်တွက်ချက်ပေးပါ။
      
      [အချက်အလက်များ]
      - မြို့နယ်: ${township}
      - လက်ရှိရာသီဥတု: ${weatherData.weather[0].description}
      - အပူချိန်: ${weatherData.main.temp}°C
      - စိုထိုင်းဆ (Humidity): ${weatherData.main.humidity}%
      
      ကျေးဇူးပြု၍ တုံ့ပြန်မှုကို အောက်ပါ JSON format အတိုင်းပဲ ကွက်တိ ပြသပေးပါ။ အရှေ့အနောက်မှာ တခြား မလိုအပ်တဲ့ စာသားတွေ (ဥပမာ- "Here is the JSON:") လုံးဝ လုံးဝ မပါစေရပါ။ JSON structure သက်သက်သာ ဖြစ်ရပါမည်။
      {
        "riskLevel": "Low သို့မဟုတ် Moderate သို့မဟုတ် High (မြန်မာလိုပါ ရှင်းပြချက် တိုတိုတုတ်တုတ် ထည့်ရန်)",
        "recommendation": "ပြည်သူများအတွက် သတိပြုရန်နှင့် ကြိုတင်ပြင်ဆင်ရန် အသေးစိတ် မြန်မာလို အကြံပြုချက်",
        "colorCode": "red သို့မဟုတ် yellow သို့မဟုတ် green"
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: aiPrompt }],
      model: "llama-3.3-70b-versatile", 
      response_format: { type: "json_object" } 
    });

    const aiResult = JSON.parse(chatCompletion.choices[0].message.content);

    res.json({
      township: townshipMapping[township.trim()] ? township.trim() : weatherData.name,
      weather: weatherData.weather[0].description,
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      riskLevel: aiResult.riskLevel,
      recommendation: aiResult.recommendation,
      colorCode: aiResult.colorCode
    });

  } catch (error) {
    console.error("Groq/Weather Error:", error);
    res.status(500).json({ message: 'AI တွက်ချက်မှု အဆင်မပြေပါ။ ပြန်လည် စမ်းသပ်ပေးပါ။' });
  }
});

module.exports = router;