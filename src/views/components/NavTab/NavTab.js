import { React, Router, Route, Switch, Prompt, Redirect, Link, NavLink, config, cx, joinURL, eventBus }
        from '../../../Depends.js';
import style from './NavTab.scss';

export default class NavTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.tabs,
            activeTab: this.props.activeTab
        };
        this.switchTab = (v) => {
            this.props.tabHook(v);
        };
    }
    render() {
        return (
            <div>
                { this.props.tabs.map( (tab, idx) => (
                    <div id={`main-tab-${tab.label}`} h4w={`nav-${tab.label}`} active={`${tab.active}`}
                        className={cx(style.tab, tab.active && style.active)} key={`nav-${idx}`}
                        onClick={ (e) => tab.active || this.switchTab(tab.value) }>
                            {tab.label}
                    </div>
                ))}
            </div>
        );
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    componentWillUnmount() {
        this.setState = () => {};
    }
}