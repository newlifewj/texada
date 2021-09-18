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

import style from './ReturnModal.scss';

export default class ReturnModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formModel: {
                product: "",
                mileage: ""
            },
            formError: {
                product: null,
                mileage: null
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

        this.returnProduct = () => {
            if (this.state.formReady) {
                alert("Thank you, your product has been returned!");
                this.props.close();
                this.setState({ formModel: { product: "", mileage: "" }, formReady: false });
            } else {
                this.setState( { formReady: true } );
            }
        };

        this.handleClose = () => {
            this.setState({ formModel: { product: "", mileage: "" }, formReady: false });
            this.props.close();
            
        };

    }
    render() {
 
        return (
            <div id="return-modal-container">
                
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Return a product</DialogTitle>
                    <DialogContent style={{ minWidth: "360px" }}>
                    { !this.state.formReady &&
                        <form onSubmit={this.submit} autoComplete="off">
                            <FormControl variant="outlined">
                                <InputLabel id="select-return-product-label">Select a product</InputLabel>
                                <Select size="medium" style={{ minWidth: "320px", fontSize: "12px" }}
                                    labelId="select-return-product-label"
                                    id="select-return-product"
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
                                <TextField variant="outlined" style={{ minWidth: "320px", fontSize: "12px" }}
                                    id="date-from"
                                    label="Mileage"
                                    name="mileage"
                                    value={this.state.formModel.mileage}
                                    onChange={this.change}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    error={Boolean(this.state.formError['mileage'])}
                                    helperText={this.state.formError['mileage']}
                                />
                            </div>
                        </form>
                    }
                    { this.state.formReady &&
                        <div>
                            Your total price is $####
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
                                || this.state.formModel.mileage.length === 0 }
                            onClick={this.returnProduct} color="primary">
                            { !this.state.formReady && <span>Yes</span> }
                            { this.state.formReady && <span>Confirm</span> }
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