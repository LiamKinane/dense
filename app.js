let isRecording = false;
let recognition;

document.getElementById('recordBtn').addEventListener('click', toggleRecording);

function toggleRecording() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

function startRecording() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        isRecording = true;
        document.getElementById('recordBtn').textContent = '⏹️';
        document.getElementById('status').textContent = 'Listening...';
    };

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        
        analyzeSpeech(transcript);
    };

    recognition.start();
}

function stopRecording() {
    recognition.stop();
    isRecording = false;
    document.getElementById('recordBtn').textContent = '🎤';
    document.getElementById('status').textContent = 'Analyzing...';
}

function analyzeSpeech(text) {
    const fillers = ['um', 'uh', 'like', 'you know', 'basically'].filter(w => 
        text.toLowerCase().includes(w)
    ).length;
    
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(' ').length;
    
    const feedback = `
        <strong>🎯 Filler Words:</strong> ${fillers} detected<br>
        <strong>💪 Confidence:</strong> ${100 - (fillers * 15)}%<br>
        <strong>📊 Clarity:</strong> ${Math.round(words/sentences)} words/sentence<br>
        <strong>🚀 Quick Fix:</strong> ${fillers > 0 ? 'Replace fillers with pauses' : 'Great job!'}
    `;
    
    document.getElementById('results').innerHTML = feedback;
    document.getElementById('feedback').classList.remove('hidden');
    document.getElementById('status').textContent = 'Tap to record again';
}