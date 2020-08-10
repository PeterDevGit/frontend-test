import React, {Component} from "react";
import Loader from '../Loader/Loader';
import TabItem from "../TabItem/TabItem";
import http from '../../service/httpService';
import FilterInput from "../FilterInput/FilterInput";
import arrowImg from "../TabContainer/img/arrow-png.png";

import './TabTwo.scss'

class TabTwo extends Component {
 state = {
     allTabData: [],
     filterTabData: [],
     inputFilter: '',
     rowsValue: 20,
     loading: true,
     sortOption: true,
     showLoadMore: true,
        sortObjectOption: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            adress: true,
        }
     }
     getData = () => {
     const {rowsValue} = this.state;

         http.request('/?rows='+rowsValue+'&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}','GET')
             .then(item => {
                 this.setState({
                     loading: false,
                     allTabData: item,
                     filterTabData: item
                 })
             }).catch(error => console.error(error));
     }

     componentDidMount() {
         this.getData();
     }

     componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.rowsValue !== this.state.rowsValue){
            this.getData();
        }
     }

    changeFilter = (value) => {
        const {allTabData} = this.state;
        const result = allTabData.filter(data => {
            return data.email.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });

        this.setState({
            filterTabData:result,
            showLoadMore: false
        })
    }

    getSortedData = (sortField) => {

        const {filterTabData,sortOption} = this.state;
        const cloneTabData = filterTabData.concat();
        let sortResult = [];

        if( sortField === 'adress' ) {
            sortResult = cloneTabData.sort((a, b) => (a[sortField].state < b[sortField].state ? -1 : 1) * (sortOption ? 1 : -1));
        }else {
            sortResult = cloneTabData.sort((a, b) => (a[sortField] < b[sortField] ? -1 : 1) * (sortOption ? 1 : -1));
        }

        this.setState({
            sortObjectOption:{
                ...this.state.sortObjectOption,
                [sortField]: !this.state.sortObjectOption[sortField]
            },
            sortOption: !sortOption,
            filterTabData: sortResult
        })
    }

    loadMoreFunc = (loadValue) => {
        const {rowsValue} = this.state;
        this.setState({
            rowsValue: rowsValue + loadValue
        })
    }

     render() {
         const {filterTabData, loading, showLoadMore, sortObjectOption:{id, firstName, lastName, phone, email, adress}} = this.state;

         if(loading) { return <Loader /> }

         return(
            <div className="tab-content-wrapper">
                <FilterInput inputValue={this.changeFilter} placeholder={"Enter email"} />

                {filterTabData.length > 0
                    ?
                        <table border="1">
                            <thead>
                            <tr>
                                <th onClick={() => this.getSortedData('id')}>ID
                                    <img
                                        src={arrowImg}
                                        className={`arrow-sort${id ? "-up" : ''}`}
                                        alt="arrow sort"
                                    />
                                </th>

                                <th onClick={() => this.getSortedData('firstName')}>FirstName
                                    <img
                                        src={arrowImg}
                                        className={`arrow-sort${firstName ? "-up" : ''}`}
                                        alt="arrow sort"
                                    />
                                </th>

                                <th onClick={() => this.getSortedData('lastName')}>LastName
                                    <img
                                        src={arrowImg}
                                        className={`arrow-sort${lastName ? "-up" : ''}`}
                                        alt="arrow sort"
                                    />
                                </th>

                                <th onClick={() => this.getSortedData('phone')}>Phone
                                    <img
                                        src={arrowImg}
                                        className={`arrow-sort${phone ? "-up" : ''}`}
                                        alt="arrow sort"
                                    />
                                </th>

                                <th onClick={() => this.getSortedData('email')}>Email
                                    <img
                                        src={arrowImg}
                                        className={`arrow-sort${email ? "-up" : ''}`}
                                        alt="arrow sort"
                                    />
                                </th>

                                <th onClick={() => this.getSortedData('adress')}>Adress
                                    <img
                                        src={arrowImg}
                                        className={`arrow-sort${adress ? "-up" : ''}`}
                                        alt="arrow sort"
                                    />
                                </th>

                                <th>Description</th>
                            </tr>
                            </thead>
                                <tbody className="item-row">
                                     { filterTabData.map( (item, index) =>
                                         <TabItem
                                             key={index+"_"+item.id}
                                                  tabData={[
                                                      {key: "id", value: item.id},
                                                      {key: "firstName", value: item.firstName},
                                                      {key: "lastName", value: item.lastName},
                                                      {key: "phone", value: item.phone},
                                                      {key: "email", value: item.email},
                                                      {key: "adress", value:
                                                              item.adress.state+', '+
                                                              item.adress.city +', '+
                                                              item.adress.streetAddress+' zip: '+
                                                              item.adress.zip
                                                      },
                                                      {key: "description", value: item.description},
                                                    ]}
                                         />)}
                                </tbody>
                        </table>
                    : <span>Совпадений не найденно.</span>
                }

                {
                    showLoadMore &&
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => this.loadMoreFunc(20)}>Load more</button>
                    </div>
                }
            </div>
         );
     }
}

export default TabTwo;