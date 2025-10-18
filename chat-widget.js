(() => {
  // Create chat container
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat-widget';

  chatContainer.innerHTML = `
    <div id="chat-toggle" title="Ask Health Questions">💬</div>
    <div id="chat-box" style="display:none;">
      <div id="chat-header">
        <span>Welcome to AmritChat!</span>
        <button id="chat-close" title="Close Chat">×</button>
      </div>
      <div id="chat-messages"></div>
      <form id="chat-form">
        <input id="chat-input" type="text" placeholder="Ask a health question..." autocomplete="off" required />
        <button type="submit">Send</button>
      </form>
    </div>
  `;

  document.body.appendChild(chatContainer);

  // Styles (keep as is or move to CSS)
  const style = document.createElement('style');
  style.textContent = `
    #chat-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-family: Arial, sans-serif;
      z-index: 9999;
    }
    #chat-toggle {
      background: #4a00e0;
      color: white;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      user-select: none;
      font-size: 24px;
    }
    #chat-box {
      width: 320px;
      max-height: 400px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 10px;
    }
    #chat-header {
      background: #4a00e0;
      color: white;
      padding: 10px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #chat-header button {
      background: transparent;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    #chat-messages {
      flex-grow: 1;
      padding: 10px;
      overflow-y: auto;
      font-size: 14px;
      color: #333;
    }
    .chat-message {
      margin-bottom: 10px;
      clear: both;
    }
    .chat-message.user {
      text-align: right;
    }
    .chat-message.user span {
      background: #4a00e0;
      color: white;
      padding: 8px 12px;
      border-radius: 15px 15px 0 15px;
      display: inline-block;
      max-width: 80%;
    }
    .chat-message.bot span {
      background: #f1f1f1;
      color: #333;
      padding: 8px 12px;
      border-radius: 15px 15px 15px 0;
      display: inline-block;
      max-width: 80%;
    }
    #chat-form {
      display: flex;
      border-top: 1px solid #ddd;
    }
    #chat-input {
      flex-grow: 1;
      border: none;
      padding: 10px;
      font-size: 14px;
      outline: none;
    }
    #chat-form button {
      background: #4a00e0;
      border: none;
      color: white;
      padding: 10px 16px;
      cursor: pointer;
    }
    #chat-form button:hover {
      background: #6b00ff;
    }
  `;
  document.head.appendChild(style);

  // Elements
  const toggleBtn = chatContainer.querySelector('#chat-toggle');
  const chatBox = chatContainer.querySelector('#chat-box');
  const closeBtn = chatContainer.querySelector('#chat-close');
  const messagesContainer = chatContainer.querySelector('#chat-messages');
  const chatForm = chatContainer.querySelector('#chat-form');
  const chatInput = chatContainer.querySelector('#chat-input');

  toggleBtn.addEventListener('click', () => {
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
  });

  closeBtn.addEventListener('click', () => {
    chatBox.style.display = 'none';
  });

  function addMessage(text, sender = 'bot') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    const span = document.createElement('span');
    span.textContent = text;
    msgDiv.appendChild(span);
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Simple manual "AI" knowledge base with pattern matching
  const knowledgeBase =   [
  {
    patterns: [/hello/i, /hi/i, /hey/i, /good morning/i, /good evening/i],
    response: "Hello! How can I assist you with your health questions today?"
  },
  {
    patterns: [/fever/i, /temperature/i, /hot body/i, /high fever/i],
    response: "A fever can be a sign of infection. If it's high or persistent, please consult a doctor."
  },
  {
    patterns: [/headache/i, /migraine/i, /head pain/i],
    response: "For headaches, make sure to stay hydrated and rest. If it's frequent or severe, seek medical advice."
  },
  {
    patterns: [/covid/i, /corona/i, /coronavirus/i, /covid 19/i],
    response: "COVID-19 symptoms include fever, cough, and breathing issues. Please isolate and get tested if needed."
  },
  {
    patterns: [/cold/i, /cough/i, /sore throat/i],
    response: "Sounds like symptoms of a cold or flu. Rest, stay hydrated, and consult a doctor if it worsens."
  },
  {
    patterns: [/diabetes/i, /sugar level/i, /blood sugar/i],
    response: "Diabetes management includes a balanced diet, regular monitoring, and medication. Do you need help tracking it?"
  },
  {
    patterns: [/bp/i, /blood pressure/i, /high bp/i, /low bp/i],
    response: "Blood pressure should be monitored regularly. High or low BP can be serious — please consult your doctor."
  },
  {
    patterns: [/appointment/i, /book doctor/i, /schedule/i],
    response: "To book an appointment, please visit the 'Dashboard' or 'Clinic' section in the app."
  },
  {
    patterns: [/medicine/i, /medication/i, /drugs/i],
    response: "Please take medications only as prescribed. If unsure, consult your doctor or pharmacist."
  },
  {
    patterns: [/abha/i, /health id/i, /ayushman/i],
    response: "You can link your ABHA ID in the app for secure and unified health records."
  },
  {
    patterns: [/records/i, /report/i, /upload/i],
    response: "You can upload or view your medical records from the 'Health Vault' in the app."
  },
  {
    patterns: [/pain/i, /chest pain/i, /stomach pain/i],
    response: "Pain can be due to various reasons. If it’s severe or unusual, please seek medical attention immediately."
  },
  {
    patterns: [/thank/i, /thanks/i, /thank you/i, /appreciate/i],
    response: "You're welcome! Let me know if you have more health-related questions."
  },
  {
    patterns: [/bye/i, /goodbye/i, /see you/i],
    response: "Goodbye! Take care of your health and come back anytime."
  },
  {
    patterns: [/emergency/i, /urgent/i, /help me/i],
    response: "If this is a medical emergency, please call 108 or visit your nearest hospital immediately."
  },
  {
    patterns: [/vaccination/i, /vaccine/i, /booster/i],
    response: "Vaccinations help prevent diseases. You can check your vaccine status or schedule in the app."
  },
  {
    patterns: [/mental health/i, /stress/i, /depression/i, /anxiety/i],
    response: "Mental health matters. It's okay to seek help. Let me know if you'd like resources or a consultation."
  },
  {
    patterns: [/pregnancy/i, /pregnant/i, /baby/i],
    response: "For pregnancy care and tracking, ensure regular checkups and healthy habits. Need help finding a doctor?"
  },
  {
    patterns: [/skin/i, /rash/i, /allergy/i],
    response: "Skin issues can vary. Please consult a dermatologist for the right diagnosis."
  },
{
patterns: [/name/i,/who are you/i],
response: "I am AmritChat-your 24/7 available health assistant."
},
{
  patterns: [/how\s*to\s*stay\s*healthy/i, /health\s*tips/i, /healthy\s*lifestyle/i],
  response: "A healthy lifestyle includes balanced nutrition, regular exercise, proper sleep, and mental wellness. Want a daily health checklist?"
},
{
  patterns: [/insurance/i, /health\s*insurance/i, /claim/i, /coverage/i],
  response: "Health insurance integration is coming soon. For now, you can manually upload claim documents to your Health Vault."
},
{
  patterns: [/reminder/i, /pill\s*reminder/i, /notify\s*me/i],
  response: "You can set reminders for medicine, appointments, or checkups directly in the AmritSetu app. Would you like help with that?"
},
{
  patterns: [/lab\s*report/i, /test\s*result/i, /blood\s*test/i, /scan/i],
  response: "You can upload, view, or share your test reports securely from your Health Vault in AmritSetu."
},
{
  patterns: [/find\s*a\s*doctor/i, /specialist/i, /which\s*doctor/i],
  response: "Looking for a specific specialist? I can help connect you with the right doctor based on your symptoms."
},
{
  patterns: [/track\s*my\s*health/i, /history/i, /progress/i],
  response: "AmritSetu shows health trends over time using your uploaded reports. Visit your dashboard to explore it."
},
{
  patterns: [/fitness/i, /exercise/i, /yoga/i, /workout/i],
  response: "Staying active is key to good health! You can log daily wellness habits in the app for better tracking."
},
{
  patterns: [/privacy/i, /security/i, /data\s*safe/i],
  response: "Your data is encrypted and stored securely in India. You have full control over what gets shared and with whom."
}
];

  function getResponse(message) {
    for (const entry of knowledgeBase) {
      if (entry.patterns.some(regex => regex.test(message))) {
        return entry.response;
      }
    }
    return "Sorry, I don't have an answer for that right now. Please try asking something else.";
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userText = chatInput.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    chatInput.value = '';
    addMessage('...', 'bot'); // Loading message placeholder

    setTimeout(() => {
      // Remove loading message
      const lastBotMsg = messagesContainer.querySelector('.chat-message.bot:last-child span');
      if (lastBotMsg) lastBotMsg.textContent = getResponse(userText);
    }, 800); // simulate delay
  });
})();
