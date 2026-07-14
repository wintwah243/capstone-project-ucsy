const express = require('express');
const router = express.Router();
const axios = require('axios');

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

// Helper function to evaluate risk based on weather data conditions
function assessFloodRisk(weather) {
  const description = weather.weather[0].description.toLowerCase();
  const mainCondition = weather.weather[0].main.toLowerCase();
  const humidity = weather.main.humidity;

  // Severe risk factors: Heavy/thunderstorm rain, or high rain volume with intense humidity
  if (
    description.includes('heavy') || 
    description.includes('thunderstorm') || 
    description.includes('extreme') ||
    (mainCondition === 'rain' && humidity > 90)
  ) {
    return {
      riskLevel: "High (ပြင်းထန် - မိုးသည်းထန်စွာရွာသွန်းပြီး စိုထိုင်းဆ အလွန်မြင့်မားနေပါသည်)",
      recommendation: "ရေကြီးရေလျှံမှု ဖြစ်ပေါ်နိုင်သဖြင့် ရေဘေးလွတ်ရာသို့ ကြိုတင်ပြင်ဆင်ရွှေ့ပြောင်းပါ။ အရေးပေါ်သုံးပစ္စည်းများ စုဆောင်းထားပါ။",
      colorCode: "red"
    };
  }

  // Moderate risk factors: Light to moderate rain, or high humidity conditions
  if (
    mainCondition === 'rain' || 
    description.includes('drizzle') || 
    description.includes('shower') ||
    humidity > 80
  ) {
    return {
      riskLevel: "Moderate (အသင့်အတင့် - မိုးရွာသွန်းမှု သို့မဟုတ် စိုထိုင်းဆ များပြားနေပါသည်)",
      recommendation: "မိုးလေဝသသတင်းများကို ဂရုတစိုက်စောင့်ကြည့်ပါ။ ရေနုတ်မြောင်းများ ပိတ်ဆို့မှုမရှိအောင် သန့်ရှင်းရေးလုပ်ထားပါ။",
      colorCode: "yellow"
    };
  }

  // Baseline low risk safety profile
  return {
    riskLevel: "Low (နိမ့်ပါး - လက်ရှိ ရာသီဥတုအခြေအနေ ပုံမှန်ရှိနေပါသည်)",
    recommendation: "ထူးခြားသော ဘေးအန္တရာယ်မရှိပါ။ ပုံမှန်အတိုင်း သတိပြု သွားလာနိုင်ပါသည်။",
    colorCode: "green"
  };
}

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

    // Run the local assessment calculation using OpenWeather data directly
    const riskAssessment = assessFloodRisk(weatherData);

    res.json({
      township: townshipMapping[township.trim()] ? township.trim() : weatherData.name,
      weather: weatherData.weather[0].description,
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      riskLevel: riskAssessment.riskLevel,
      recommendation: riskAssessment.recommendation,
      colorCode: riskAssessment.colorCode
    });

  } catch (error) {
    console.error("Weather Error:", error);
    res.status(500).json({ message: 'မိုးလေဝသ အချက်အလက် ရယူရန် အဆင်မပြေပါ။ ပြန်လည် စမ်းသပ်ပေးပါ။' });
  }
});

module.exports = router;