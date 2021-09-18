import { React, cx, logger } from '../../Depends.js';

import { withRouter } from 'react-router';

import style from "./Home.scss";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1 className={cx(style.welcome)}>Wellcome</h1>
            </div>
        );
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps) {
    }
    componentWillUnmount() {
        this.setState = () => {};
    }
}

export default withRouter(Form);