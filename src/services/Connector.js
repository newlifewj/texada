
import axios from 'axios';
// import spinSev from '../views/components/Spin/SpinSev';

import store from './StaticData';

const errorHandler = (err) => {
    /*
        403/statusCode==='403403': None authentication.
        So the browser should be redirected to the IDP server auth-endpoint to complete Google OAuth2 work flow.
        However, the XHR response cannot do redirection even its http status is 302
        We have to define a protocol betwwen the XHR services and the UI, 'statusCode===403403' make UI set the location.
        --- It is not regular redirection, but with same result. We call that SPA redirection --- 
    */
    if (err.response && err.response.data) {
        if (err.response.headers['x-auth-endpoint']) {
            // `${err.response.data.status.statusCode}` === '403403' now     // needn't check 403403 actually
            // Navigate browser to Auth Endpoint, that's how SPA redirect to IDP basing one XHR 403 response
            window.location.assign(err.response.headers['x-auth-endpoint']);
        } else {
            return err.response.data;
        }
    } else {
        return err;
    }
    
};

export default ( function() {
    return {

        get: ( path, config ) => {
            const equipments = store.getAll();

            return {
                payload: {
                    equipments: equipments,
                    totalEquipments: equipments.length,
                    totalPages: 1
                },
                status: {
                    statusCode: '200000',
                    message: 'success'
                }
            };
      
        }
    };
}() );
