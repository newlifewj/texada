import { React, Suspense, Route, Switch, Redirect, config, cx, joinURL } from '../../Depends.js';

import style from "./MainZone.scss";

const Equipments = React.lazy(() => import('../Equipments/Equipments'));
const About = React.lazy(() => import('../About/About'));
const Home = React.lazy(() => import('../Home/Home'));


export default class MainZone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Names"
        };

        this.changeName = () => {
            this.setState({ name: "Name2" });
        };

    }
    render() {
        return (
     
            <div className={cx(style.mainZone)}>

                <Switch>
                    <Route path={ joinURL(this.props.match.url, config.path.equipments) }
                            render={ (p) => {
                                return (
                                            <Suspense fallback={null}>
                                                <Equipments {...p} />
                                            </Suspense>
                                        );
                            } }
                    />
                    <Route exact path={ joinURL(this.props.match.url, config.path.about) }
                            render={ (p) => {
                                return (
                                            <Suspense fallback={null}>
                                                <About {...p} />
                                            </Suspense>
                                        );
                            } }
                    />
                    <Route exact path={ joinURL(this.props.match.url, config.path.home) }
                            render={ (p) => {
                                return (
                                            <Suspense fallback={null}>
                                                <Home {...p} />
                                            </Suspense>
                                        );
                            } }
                    />
                    <Redirect to={ joinURL(this.props.match.url, config.path.home) } />
                </Switch>
                

            </div>
                
        );
    }
    componentDidMount() {

    }
    componentDidUpdate() { }
    componentWillUnmount() {
        this.setState = () => {};
    }
}


