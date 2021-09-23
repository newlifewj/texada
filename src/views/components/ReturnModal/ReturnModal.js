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

import store from '../../../services/LocalStore';
import style from './ReturnModal.scss';

export default class ReturnModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formModel: {
                rental: "",
                mileage: ""
            },
            formError: {
                rental: null,
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
                const product = this.state.formModel.rental.product;
                const start = moment(this.state.formModel.rental.from, "YYYY-MM-DD");
                const end = moment(this.state.formModel.rental.to, "YYYY-MM-DD");
                const days = moment.duration(end.diff(start)).asDays() + 1;
                // const days = moment.duration(this.state.formModel.rental.from.diff(this.state.formModel.rental.to)).asDays();
                const mileage = `${product.mileage}` === "null" ? null :  parseInt(product.mileage) + parseInt(this.state.formModel.mileage);
                const deltaDur = `${product.type}` === "plain" ? days : 2 * (days + Math.ceil(parseInt(this.state.formModel.mileage) / 10));

                const response = store.update({ ...product, availability: true, durability: product.durability - deltaDur, mileage: mileage });
                store.return(this.state.formModel.rental);
                this.props.postUpdate(response.payload);

                this.props.close();
                this.setState( { formReady: false, formModel: {  rental: "", mileage: "" } } );
            } else {
                this.setState( { formReady: true } );
            }
        };

        this.handleClose = () => {
            this.setState({ formModel: { rental: "", mileage: "" }, formReady: false });
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
                                    name="rental"
                                    value={this.state.formModel.rental}
                                    onChange={this.change}
                                >
                                    { this.props.items.map( ( item, idx) => (
                                            <MenuItem  key={`item-${idx}`} value={item}>{item.product.name}</MenuItem>
                                    )) }
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
                                    disabled={this.state.formModel.rental.product && this.state.formModel.rental.product.type === "plain"}
                                    error={Boolean(this.state.formError['mileage'])}
                                    helperText={this.state.formError['mileage']}
                                />
                            </div>
                        </form>
                    }
                    { this.state.formReady &&
                        <div>
                            <h5>Rental period:&nbsp;{this.state.formModel.rental.from}&nbsp;to&nbsp;{this.state.formModel.rental.to}</h5>
                            <h5>Total price:&nbsp;{this.state.formModel.rental.product.price}</h5>
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
                                || this.state.formModel.rental === ""
                                || ( this.state.formModel.mileage.length === 0 && this.state.formModel.rental.product && this.state.formModel.rental.product.type !== "plain")}
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