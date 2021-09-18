import { React, eventBus, cx } from '../../Depends.js';
import logger from '../../services/DevLogger';

import style from './About.scss';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        return (
            <div id="idp-about-container">
                <h1 className={cx(style.about)}>TEXADA Demo</h1>
            </div>
        );
    }

    componentDidMount() {
        logger.info("Mount a fake tab ...");
    }
    componentDidUpdate() { }
    componentWillUnmount() {
        this.setState = () => {};
    }
}