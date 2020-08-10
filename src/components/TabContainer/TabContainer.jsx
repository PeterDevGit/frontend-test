import React, {Component} from 'react';
import TabOne from "../TabOne/TabOne";
import TabTwo from "../TabTwo/TabTwo";

import './TabContainer.scss';

class TabContainer extends Component{

    state = {
        activeTab:'one'
    }

    changeTab(active){
        this.setState({
            activeTab: active
         })
    }

    render() {
        const {activeTab} = this.state;
        return (
            <div className="tabs-wrapper-container">

                <div className="tabs-btn">
                    <span onClick={() => this.changeTab('one')} className="btn btn-secondary">TAB1</span>
                    <span onClick={() => this.changeTab('two')} className="btn btn-secondary">TAB2</span>
                </div>

                { activeTab === 'one' ? <TabOne/> : <TabTwo/> }

            </div>
        );
    }
}

export default TabContainer;