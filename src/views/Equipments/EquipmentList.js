import { React, Route, Switch, config, cx, joinURL, eventBus, logger } from '../../Depends.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import qs from 'qs';
import _ from 'lodash';

import BookModal from '../components/BookModal/BookModal';
import ReturnModal from '../components/ReturnModal/ReturnModal';

import connector from '../../services/Connector';

import style from './Equipments.scss';

export default class Equipments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: {
                page: 1,
                keyword: ""
            },
            equipments: [],
            totalEquipments: 0,
            totalPages: 1,
            expandedRow: null,
            error: null,
            book: false,
            return: false
        };

        this.searchEquipments = async(q) => {
            const qry = q ? q : this.state.query;
            const resObj = await connector.get( `${joinURL(config.apiRoot, config.apiUrl.equipments)}`, { params: qry } );
            this.setState({
                error: null,
                equipments: resObj['payload']['equipments'],
                totalEquipments: resObj['payload']['totalEquipments'],
                totalPages: resObj['payload']['totalPages'],
                query: {
                    page: qry && qry.page && !isNaN(qry.page) ? parseInt(qry.page) : 1,
                    keyword: qry && qry['keyword'] ? qry['keyword'] : ""
                }
            });
            /* --- Cannot finish it without API call
            if (resObj.payload && `${resObj.status.statusCode}` === "200000") {
                this.setState({
                    error: null,
                    equipments: resObj['payload']['equipments'],
                    totalEquipments: resObj['payload']['totalEquipments'],
                    totalPages: resObj['payload']['totalPages'],
                    query: {
                        page: qry && qry.page && !isNaN(qry.page) ? parseInt(qry.page) : 1,
                        keyword: qry && qry['keyword'] ? qry['keyword'] : ""
                    }
                });
            } else if (resObj.status && `${resObj.status.statusCode}` === "404000") {
                this.setState({ error: { type: "warning", message: "No equipments found due to - 404000 response" } });
            } else if (resObj.status && `${resObj.status.statusCode}` === "400000") {
                this.setState({ error: { type: "error", message: "Cannot retrieve equipments due to bad request - Error code is 400000" } });
            } else {
                // this.setState({ error: { type: "error", message: "Opps, something was wrong in server side - Error code is 500000" } });
            }
            */
            
        };

        this.handleClose = () => {};

        this.deeplinkSearch = (qry, e) => {
            e.preventDefault();     // Prevent the default behavior of form submitting
            e.stopPropagation();

            let _q;
            if (!qry) {
                _q = {
                    page: this.state.query.page === 1 ? undefined : this.state.query.page,
                    keyword: this.state.query.keyword ? this.state.query.keyword : undefined
                };
            } else {
                _q = qry;
            }
            this.setState({ query: { page: 1, keyword: "" } });
            this.props.history.push( `${this.props.match.url}?${qs.stringify(_q)}` );
        };

        this.searchChange = (e) => {
            const _query = this.state.query;
            _query[e.target.name] = e.target.value.trim();
            this.setState( { query: _query } );
        };

        this.expandRow = (idx, e) => {
            e.stopPropagation();
            this.setState({ expandedRow: this.state.expandedRow === idx ? null : idx });
        };

        this.paginate = (e, p) => {
            const _q = {
                page: this.state.query.page === 1 ? undefined : this.state.query.page,
                keyword: !this.state.query.keyword ? undefined : this.state.query.keyword
            };
            if ( p !== 1 ) {
                _q.page = parseInt(p);
                this.props.history.push( `${this.props.match.url}?${qs.stringify(_q)}` );
            } else {
                delete _q.page;
                this.props.history.push( `${this.props.match.url}?${qs.stringify(_q)}` );
            }
        };
    }
    render() {
        const headTitles = [
            { title: "", width: "10%" },
            { title: "Name", width: "25%" },
            { title: "Code", width: "10%" },
            { title: "Available", width: "10%" },
            { title: "Needing Repair", width: "15%" },
            { title: "Durability", width: "15%" },
            { title: "Mileage", width: "15%" }
        ];

        return (
            <div id="tab-equipments-container" className={cx(style.layout)}>
                <div className={cx(style.tableCtrl)}>
                    <div className={cx(style.selects)}>
                        <form name='search'  onSubmit={(e) => this.deeplinkSearch(null, e)} autoComplete="off">
                            <TextField id="equipment-search-input" size="small" variant="outlined" name='keyword'
                                        value={this.state.query.keyword} onChange={this.searchChange}
                                        style={{ marginTop: '3px',  backgroundColor: 'white', minWidth: '320px' }}
                                        placeholder="Find equipments by keyword" />
                            <IconButton color="secondary" aria-label="clear" onClick={(e) => this.deeplinkSearch({}, e)}
                                    style={{ marginLeft: '-33px', padding: '5px', display: this.state.query.keyword.trim() === "" ? 'none' : '' }}>
                                <ClearIcon />
                            </IconButton>
                            <IconButton type="submit" aria-label="search" style={{ padding: '10px' }}>
                                <SearchIcon />
                            </IconButton>
                        </form>
                    </div>
                </div>
                
                <div>
                    <div className={cx(style.topTable)}>
                        <div id="total-equipments-info" style={{ marginTop: '20px', display: 'inline-block' }}>
                            {`Found ${this.state.totalEquipments ? this.state.totalEquipments : 0} equipments totally`}
                        </div>
                    </div>
                    { `${this.state.error}` === "null" && <div>
                        <div className={cx(style.pagination)}>
                                <Pagination
                                    count={this.state.totalPages}
                                    variant="outlined"
                                    shape="rounded"
                                    page={this.state.query.page}
                                    onChange={this.paginate}
                                />
                        </div>
                        <TableContainer component={Paper}>
                            <Table className={cx(style.table)} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        { headTitles.map( (head, idx) => (
                                            <TableCell key={`head-${idx}`} style={{ width: head.width }}>{head.title}</TableCell>
                                        ) ) }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                { this.state.equipments.map((equipment, idx) => (
                                    <TableRow key={`equipment-${idx}`}
                                        className={cx( `${this.state.expandedRow}` === `${idx}` ? "" : style.cellExpand)}
                                        onClick={ (e) => this.expandRow(idx, e) }>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>
                                            <span>{equipment.name}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{equipment.code}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{`${equipment.availability}`}</span>
                                        </TableCell>
                                        <TableCell>
                                            <span>{`${equipment.needing_repair}`}</span>
                                        </TableCell>
                                        <TableCell>
                                            {`${equipment.durability}/${equipment.max_durability}`}
                                        </TableCell>
                                        <TableCell>
                                            {`${equipment.mileage}` === "null" ? "-" : `${equipment.mileage}`}
                                        </TableCell>
                                    </TableRow>
                                )) }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </div> }

                    <div className={cx(style.operation)}>
                        <Button  id="return-equipment-btn" variant="contained" color="primary"
                                onClick={(e) => this.setState({ return: true }) }
                                style={{ margin: '15px 0px 5px 0px', float: 'right' }}>
                            Return
                        </Button>
                    
                        <Button  id="book-equipment-btn" variant="contained" color="primary"
                                onClick={(e) => this.setState({ book: true }) }
                                style={{ margin: '15px 30px 5px 30px', float: 'right' }}>
                            Book
                        </Button>
                    </div>
                   
                </div>

                <BookModal open={this.state.book} close={(e) => this.setState({ book: false })} items={this.state.equipments} />
                <ReturnModal open={this.state.return} close={(e) => this.setState({ return: false })} items={this.state.equipments} />
                
            </div>
        );
    }

    async componentDidMount() {
        const _q = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        await this.searchEquipments(_q);
    }
    async componentDidUpdate(prevProps) {
        if ( !_.isEqual(prevProps.location.search, this.props.location.search) ) {
            const _q = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
            await this.searchEquipments( _q );
        }
    }
    componentWillUnmount() {
        this.setState = () => {};
    }
}