import React, {Component} from "react"

import './Dropdown.css'

class Dropdown extends Component{

    state = {
        dropdownStatus: false,
        defaultValue: null
    }

    dropdownShow = () => {
        this.setState({
            dropdownStatus: !this.state.dropdownStatus
        })
    }

    dropdownSelect = (val) => {
        this.props.selectedValue(val)

        this.setState({
            dropdownStatus: false,
            defaultValue:val
        })
    }

    componentDidMount() {
        const {options, defaultValue} = this.props
        const countOptions = options.length

        for (let i = 0; i < countOptions; i++) {
            if(options[i].value === defaultValue) {
                this.setState({
                    defaultValue:options[i].value
                })
            }
        }
    }

    render() {
        const {options} = this.props
        const {dropdownStatus, defaultValue} = this.state

        return (
            <div className="bt-dropdown-group">
            <span className="btn btn-primary selected-dropdown" onClick={this.dropdownShow}>
                {defaultValue} <span className="dropdown-toggle"></span>
            </span>
                {dropdownStatus &&
                <ul className="dropdow-list">
                    { options.map(item => <li className="btn btn-primary" key={item.value} onClick={() => this.dropdownSelect(item.value)}>{item.name}</li>)}
                </ul>
                }
            </div>
        )
    }
}

export default Dropdown