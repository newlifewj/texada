
// import axios from 'axios';
// import spinSev from '../views/components/Spin/SpinSev';
/*  
    --- Note ---
    The commector is supposed to be the interface connecting with Http tier. But we don't have backend service now,
    instead just using a local store in application context.
*/
import store from './LocalStore';

/**
 * The entry to handle all exceptions including Http and code running.
 * @param {object} err - The Error instance threw from API calls.
 */
const errorHandler = (err) => {
    // ToDo: Not implemented yet, we don't simulate error scenarios.
    /*
    return {
        status: {
            statusCode: '404000',
            message: 'Not Found'
        }
    };
    */
};

export default ( function() {
    return {
        search: (path, options) => {
            const equipments = store.search(options.params.keyword);
            return {
                payload: {
                    equipments: equipments,
                    totalEquipments: equipments.length,
                    totalPages: 1   // Just 1 big page now
                },
                status: {
                    statusCode: '200000',
                    message: 'success'
                }
            };
        },

        get: ( code ) => {
            const equipment = store.getOne(code);

            return {
                payload: equipment,
                status: {
                    statusCode: '200000',
                    message: 'success'
                }
            };
        },

        // post: () => {},  // No "create" method in the local store

        // Lets use PUT, it could be PATCH in this scenario
        put: (obj) => {
            const equipment = store.update(obj);

            return {
                payload: equipment,
                status: {
                    statusCode: '200000',
                    message: 'success'
                }
            };
        }
    };
}() );
