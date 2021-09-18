import { React, cx } from '../../Depends.js';
import style from './Foot.scss';

export default class Foot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getFullYear()
        };
    }
    render() {
        return (
            <div className={cx(style.footContainer)}>
                <div className={cx(style.foot)}>
                    {`© TEXADA Demo, ${this.state.year}.`}
                </div>
                
            </div>
        );
    }
    componentDidMount() {
        // this.switchTab(this.props.activeTab);
    }
    componentDidUpdate() {
        // this.state.activeTab !== this.highlightTab(this.props.activeTab);
    }
    componentWillUnmount() {
        this.setState = () => {};
    }
}