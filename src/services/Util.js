/**
 * Utility services
 */
 import eventBus from './EventBus';
 import logger from './DevLogger';


 const util = {
    sleep: (ms) => {
        return new Promise( (resolve) => setTimeout(resolve, ms) );
    },

    setInterval: (ms) => {
        const interval = setInterval( () => {
            eventBus.emit(eventBus.labels.intervalTick);
        }, ms);
        return interval;
    },

    clearInterval: (interval) => {
        clearInterval(interval);
        logger.info(`Interval - ${interval} finished`);
    }
 };
 
 export default util;