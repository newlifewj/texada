
/*
    Logger for developing console output by wrapping the console API.
    "process.env.NODE_ENV" comes from weboack configuration, so it will get rid of the logger code in prod bundles (except errors)
    ...
    import logger from 'DevLogger.js'
    logger.error("Exception ...")
    ...
*/

export default ( function() {
    // The 'process.env.NODE_ENV' is added to browser by webpack
    if (process.env.NODE_ENV === 'development') {
        return {
            info: (message) => {
                console.info(message);
            },
            debug: (message) => {
                console.log(message);
            },
            warn: (message) => {
                console.warn(message);
            },
            error: (message) => {
                console.error(message);
            }
        };
    } else {
        return {
            info: () => null,
            debug: () => null,
            warn: () => null,
            error: (message) => {
                console.error(message);
            }
        };
    }
}() );
