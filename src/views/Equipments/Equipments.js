import { React, Route, Switch, config, cx, joinURL, eventBus, logger } from '../../Depends.js';
import connector from '../../services/Connector';
import EquipmentList from './EquipmentList';

import style from './Equipments.scss';

export default class Equipments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
    }
    render() {
        return (
            <div id="tab-Equipments-root" style={{ width: "100%" }}>
                <Switch>
                    <Route exact path={joinURL(this.props.match.url)}
                        render={ (p) => {
                            return ( <EquipmentList {...p} id="Equipment-list" /> );
                        } }
                    />
                </Switch>
            </div>
        );
    }

    async componentDidMount() {
        // await this.searchEquipments();
    }
    componentDidUpdate() { }
    componentWillUnmount() {
        this.setState = () => {};
    }
}