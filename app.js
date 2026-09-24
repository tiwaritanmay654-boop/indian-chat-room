const loginForm = document.getElementById('login-form');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const chatMessages = document.getElementById('chat-messages');
const quickChips = document.querySelectorAll('.quick-chip');
const leaveBtn = document.getElementById('leave-btn');
const roomSelect = document.getElementById('room-select');

const indianStates = [
    { id: 'andhra', name: 'Andhra Pradesh' },
    { id: 'arunachal', name: 'Arunachal Pradesh' },
    { id: 'assam', name: 'Assam' },
    { id: 'bihar', name: 'Bihar' },
    { id: 'chhattisgarh', name: 'Chhattisgarh' },
    { id: 'goa', name: 'Goa' },
    { id: 'gujarat', name: 'Gujarat' },
    { id: 'haryana', name: 'Haryana' },
    { id: 'himachal', name: 'Himachal Pradesh' },
    { id: 'jharkhand', name: 'Jharkhand' },
    { id: 'karnataka', name: 'Karnataka' },
    { id: 'kerala', name: 'Kerala' },
    { id: 'madhya', name: 'Madhya Pradesh' },
    { id: 'maharashtra', name: 'Maharashtra (Mumbai/Pune)' },
    { id: 'manipur', name: 'Manipur' },
    { id: 'meghalaya', name: 'Meghalaya' },
    { id: 'mizoram', name: 'Mizoram' },
    { id: 'nagaland', name: 'Nagaland' },
    { id: 'odisha', name: 'Odisha' },
    { id: 'punjab', name: 'Punjab' },
    { id: 'rajasthan', name: 'Rajasthan' },
    { id: 'sikkim', name: 'Sikkim' },
    { id: 'tamilnadu', name: 'Tamil Nadu' },
    { id: 'telangana', name: 'Telangana (Hyderabad)' },
    { id: 'tripura', name: 'Tripura' },
    { id: 'uttarpradesh', name: 'Uttar Pradesh' },
    { id: 'uttarakhand', name: 'Uttarakhand' },
    { id: 'westbengal', name: 'West Bengal (Kolkata)' }
];

const sampleResponses = [
    "Sahi hai! Aur batao kya chal raha hai?",
    "Akele bore ho rahe the, aap aa gaye acha laga 😉",
    "Yahan mausam kaisa hai?",
    "Haan yaar, bilkul sahi baat hai.",
    "PM me aao na private chat کرتے hain 🔥",
    "Dinner ho gaya aapka?"
];

const botNames = ["DesiQueen22", "DesiMunda", "Pooja_Hot", "Rohit_99", "DesiGirl_x"];

// Populate room dropdowns
function populateRooms() {
    if (roomSelect) {
        roomSelect.innerHTML = '';
        indianStates.forEach(state => {
            const opt = document.createElement('option');
            opt.value = state.id;
            opt.innerText = state.name;
            roomSelect.appendChild(opt);
        });
    }
    
    const headerRoomSelect = document.getElementById('header-room-select');
    if (headerRoomSelect) {
        headerRoomSelect.innerHTML = '';
        indianStates.forEach(state => {
            const opt = document.createElement('option');
            opt.value = state.id;
            opt.innerText = state.name;
            headerRoomSelect.appendChild(opt);
        });
    }
}

populateRooms();

let currentUsername = '';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    currentUsername = document.getElementById('username').value;
    const selectedRoomId = roomSelect.value;
    const roomObj = indianStates.find(s => s.id === selectedRoomId) || indianStates[0];
    
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('chat-screen').classList.add('active');
    
    const headerRoomSelect = document.getElementById('header-room-select');
    if (headerRoomSelect) headerRoomSelect.value = selectedRoomId;
    
    chatMessages.innerHTML = '';
    appendMessage("System", `Welcome ${currentUsername}! You've joined ${roomObj.name} room. Keep conversations respectful and 18+.`, 'system');
    
    setTimeout(() => {
        const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
        appendMessage(randomBot, `Hey everyone in ${roomObj.name}! Naya kaun aaya hai?`, 'other');
    }, 1500);
});

// Handle in-chat room switching
const headerRoomSelect = document.getElementById('header-room-select');
if (headerRoomSelect) {
    headerRoomSelect.addEventListener('change', (e) => {
        const newRoomId = e.target.value;
        const roomObj = indianStates.find(s => s.id === newRoomId);
        if (roomObj) {
            chatMessages.innerHTML = '';
            appendMessage("System", `Switched to ${roomObj.name} room. Say hi to everyone!`, 'system');
            setTimeout(() => {
                const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
                appendMessage(randomBot, `Welcome to ${roomObj.name} chat! Kahan se ho sab?`, 'other');
            }, 1000);
        }
    });
}

quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
        messageInput.value = chip.dataset.text;
        messageInput.focus();
    });
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;
    
    appendMessage("You", text, 'me');
    messageInput.value = '';
    
    setTimeout(() => {
        const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
        const randomReply = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        appendMessage(randomBot, randomReply, 'other');
    }, 2000);
});

leaveBtn.addEventListener('click', () => {
    if (confirm("Do you want to exit the chat room?")) {
        document.getElementById('chat-screen').classList.remove('active');
        document.getElementById('auth-screen').classList.add('active');
        chatMessages.innerHTML = '';
    }
});

function appendMessage(sender, text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    
    if (type === 'other') {
        div.innerHTML = `<small class="sender-name">${sender}</small><div>${text}</div>`;
    } else if (type === 'system') {
        div.innerHTML = `<div class="system-text">📢 ${text}</div>`;
    } else {
        div.innerText = text;
    }
    
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
