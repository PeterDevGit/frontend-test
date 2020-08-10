import React, {Component} from "react";
import './TabItem.scss';

class TabItem extends Component {
    state ={
        lineActive : false
    }

    clickLine (){
        this.setState({
            lineActive: !this.state.lineActive
        })
    }

    render() {
      const  {tabData} = this.props;
      const {lineActive} = this.state;

    return(
            <tr className={lineActive ? 'active' : ''}>
                {
                    tabData.map(item => {
                       return(
                           <td
                               key={item.key}
                               onClick={() => this.clickLine()}
                               className={`item-${item.key}`}
                           >
                                {item.value}
                           </td>
                       );
                    }
                )}
            </tr>
        )
    }
}

export default TabItem;