"use strict";

import './scss/global.scss';

import { React, Router, Route, config, eventBus } from './Depends.js';
import Head from './views/Head/Head';
import MainZone from './views/MainZone/MainZone';
import Foot from './views/Foot/Foot';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {
                name: "Jian",
                email: "jian.wang@email.com",
                roles: ["employee"]
            }
        };
        // Focus on any elelent by mouse clicking will come here except propagation was stopped.
        this.focusChange = (e) => {
            eventBus.emit(eventBus.labels.focusChanged);
        };

        this.signout = async(e) => { };
    }

    render() {
        return (
            <Router basename="/">
            { this.state.profile &&
                <div id="app-container" onClick={this.focusChange}>
                    <div className='virtual-container'>
                        <Route path='/' render={(p) => <Head {...p} tabs={config.tabs} profile={this.state.profile} signout={this.signout} />} />
                        <Route path='/' render={(p) => <MainZone {...p} />} />
                        <Foot />
                    </div>
                </div>
            }
            </Router>
        );
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentDidUpdate() {
        // ToDo: Hook the filter and sort when book or return equipmrnts
    }
    componentWillUnmount() {
        this.setState = () => { };
    }
}
