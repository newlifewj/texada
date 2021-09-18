/**
 * 
 */
import EventEmitter from 'events';

class EventBus extends EventEmitter {
    constructor(maxListener) {
        super();
        // Define all Events here for easy reference and prompt in IDE
        this.labels = {
            focusChanged: "FOCUS_CHANGED",
            spinnerUpdate: "SPINNER_UPDATE",
            intervalTick: "INTERVAL_TICK"
        };
        this.setMaxListeners(maxListener);
    }
}

export default new EventBus(200);