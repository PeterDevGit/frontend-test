import React, {Component} from "react";
import './FilterInput.scss';

class FilterInput extends Component{
    state = {
        inputValue: ''
    }

    changeInput = (event) => {
        const value = event.target.value;

        this.setState({
            inputValue: value
        });
    }

    submitFiletProps = (event) => {
        event.preventDefault();
        this.props.inputValue(this.state.inputValue)
    }

    clearFilter = () => {
        this.setState({
            inputValue: ''
        })

        this.props.inputValue('');
    }

    render() {
        const {inputValue} = this.state;

        return(
            <div className="input-group mb-3">
                <form onSubmit={this.submitFiletProps}>
                    <input onChange={this.changeInput} value={inputValue} type="text" className="form-control" placeholder={this.props.placeholder} />

                    <div className="input-group-append">
                        <span className="input-group-text" onClick={this.submitFiletProps}>Отфильтровать</span>
                        <span className="input-group-text" onClick={this.clearFilter}>Очистить</span>
                    </div>
                </form>
            </div>
        );
    }
}

export default FilterInput;