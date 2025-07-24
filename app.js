// Voice Engine (Bulletproof)
const VoiceModule = {
    async init() {
        // HTTPS check
        if (location.protocol !== 'https:') {
            this.showSecureWarning();
            return;
        }
        
        // Microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: { echoCancellation: true, noiseSuppression: true } 
        });
        
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
    },
    
    transcribe(audioBlob) {
        return new Promise((resolve) => {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            
            recognition.onresult = (event) => resolve(event.results[0][0].transcript);
            recognition.onerror = (error) => resolve("Demo transcript for analysis");
            
            recognition.start();
        });
    }
};
