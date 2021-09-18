import { React, Route, Switch, config, cx, joinURL, eventBus, logger } from '../../../Depends.js';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import qs from 'qs';
import _ from 'lodash';
import validate from './Validate.js';
import moment from 'moment';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import style from './BookModal.scss';

export default class BookModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formModel: {
                product: "",
                fromDate: "",
                toDate: ""
            },
            formError: {
                product: null,
                fromDate: null,
                toDate: null
            },
            formSubmitting: false,
            formValid: true,
            formFailed: false,
            formPristine: true,
            formReady: false
        };

        this.change = (e) => {
            const _model = { ...this.state.formModel };
            _model[e.target.name] = e.target.value;
            this.setState({ formModel: _model, formPristine: false, alertOpen: false });

            // Check whole form valid or not by scan all fields, will not set formError on validation failiure
            let valid = true;
            const _error = { ...this.state.formError };
            Object.keys( this.state.formError ).map( (k) => {
                const err = validate(k, _model);

                // Set error for current changing field
                if (e.target.name === k) {
                    _error[k] = err;
                }

                // Set the form valid status
                if ( null !== err ) {
                    valid = false;
                }

                return true;
            } );
            this.setState( { formError: _error, formValid: valid } );
        };

        this.bookProduct = () => {
            if (this.state.formReady) {
                alert("Thank you, your product has been registered!");
                this.setState({ formModel: { product: "", toDate: "", fromDate: "" }, formReady: false });
                this.props.close();
            } else {
                this.setState( { formReady: true } );
            }
        };

        this.handleClose = () => {
            this.setState({ formModel: { product: "", toDate: "", fromDate: "" }, formReady: false });
            this.props.close();
        };

    }
    render() {
 
        return (
            <div id="book-modal-container">
                
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Book a product</DialogTitle>
                    <DialogContent style={{ minWidth: "360px" }}>
                    { !this.state.formReady &&
                        <form onSubmit={this.submit} autoComplete="off">
                            <FormControl variant="outlined">
                                <InputLabel id="select-book-product-label">Select a product</InputLabel>
                                <Select size="medium" style={{ minWidth: "320px", fontSize: "12px" }}
                                    labelId="select-book-product-label"
                                    id="select-book-product"
                                    name="product"
                                    value={this.state.formModel.product}
                                    onChange={this.change}
                                >
                                    <MenuItem value={10}>Air Compressor YL-444</MenuItem>
                                    <MenuItem value={20}>Air Compressor BV-444</MenuItem>
                                    <MenuItem value={30}>Bobcat skid steer B64</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{ marginTop: "30px" }}>
                                <TextField
                                    id="date-from"
                                    label="Starting date"
                                    type="date"
                                    name="fromDate"
                                    value={this.state.formModel.fromDate}
                                    onChange={this.change}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    error={Boolean(this.state.formError['fromDate'])}
                                    helperText={this.state.formError['fromDate']}
                                />
                                <TextField
                                    style={{ marginLeft: "30px" }}
                                    id="date-to"
                                    label="End date"
                                    type="date"
                                    name="toDate"
                                    value={this.state.formModel.toDate}
                                    onChange={this.change}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    error={Boolean(this.state.formError['toDate'])}
                                    helperText={this.state.formError['toDate']}
                                />
                            </div>
                        </form>
                    }
                    { this.state.formReady &&
                        <div>
                            Your estimated price is $####
                            <h4>Do you want to procedure?</h4>
                        </div>
                    }

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            No
                        </Button>
                        <Button
                            disabled={ !this.state.formValid
                                || this.state.formModel.product.length === 0
                                || this.state.formModel.fromDate.length === 0
                                || this.state.formModel.toDate.length === 0 }
                            onClick={this.bookProduct} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

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