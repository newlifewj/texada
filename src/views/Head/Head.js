import { React, Router, Route, Switch, Prompt, Redirect, Link, NavLink, config, cx, joinURL, eventBus }
        from '../../Depends.js';
import { withRouter } from 'react-router-dom';
import _ from "lodash";

import NavTab from '../components/NavTab/NavTab';

import Warning from '@material-ui/icons/Warning';


import PropType from 'prop-types';

import style from './Head.scss';


class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: config.tabs,
            activeTab: null
        };

        this.setTab = (location) => {
            
            const _tabs = config.tabs.map( (tab) => {
                if ('equipments' === tab.value) {
                    tab.active = `${location.pathname}`.startsWith('/equipments');
                } else if ('role' === tab.value) {
                    tab.active = '/role' === location.pathname;
                } else if ('about' === tab.value) {
                    tab.active = '/about' === location.pathname;
                } 
                return tab;
            } );
            this.setState({ tabs: _tabs });
        };
        
        this.tabHook = (value) => {
            this.props.history.push( `/${config.path[value]}` );
        };

    }

    render() {
        return (
            <div className={cx(style.head)}>
                <div  className={cx(style.container)}>
                    <a href='/' id="head-logo" className={cx(style.logo)}>
                        <span style={{ visibility: "hidden" }}>Home</span>
                    </a>
                    <div className={style.navtab}>
                        <NavTab tabs={this.state.tabs} tabHook={this.tabHook} />
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setTab(this.props.location);
        this.props.history.listen( this.setTab );
    }
    componentDidUpdate(prevProps) {
       //
    }
    componentWillUnmount() {

        this.setState = () => {};
    }
}

Head.defaultProps = {
    propA: "STRING"
};

export default withRouter(Head);

