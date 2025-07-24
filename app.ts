// First-principles state machine
class DenseAI {
    private state = {
        recording: false,
        transcript: '',
        analysis: null,
        tab: 'voice'
    };
    
    private recognition = null;
    private audioContext = null;
}
