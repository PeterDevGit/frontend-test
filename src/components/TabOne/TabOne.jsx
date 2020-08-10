import React, {Component} from "react";
import Loader from '../Loader/Loader';
import TabItem from  "../TabItem/TabItem";
import http from '../../service/httpService';
import Pagination from "../Pagination/Pagination";
import FilterInput from "../FilterInput/FilterInput";
import arrowImg from '../TabContainer/img/arrow-png.png'

import './TabOne.scss';
import Dropdown from "../Dropdown/Dropdown";

class TabOne extends Component {
    state = {
        allTabData: [],
        filterTabData: [],
        inputFilter: '',
        sortOption: true,
        activePage:0,
        perPage: 10,
        loading: true,
        projectId: true,
        title: true,
        phone: true,
    }

    getData = () => {
        http.request('/?rows=300&projectId={number|1000}&title={business}&description={lorem|32}&authorId={number|1000}&phone={phone|(xxx)xxx-xx-xx}&billing={ccNumber|DISC}','GET')
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

    changeFilter = (value) => {
        const {allTabData} = this.state;
        const result = allTabData.filter(data => {
                return data.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
            });

        this.setState({
            filterTabData:result
        })
    }

    getSortedData = (sortField) => {
        const {filterTabData,sortOption} = this.state;
        const cloneTabData = filterTabData.concat();

        const sortResult  = cloneTabData.sort((a, b) => (a[sortField] < b[sortField] ? -1 : 1) * (sortOption ? 1 : -1));

        this.setState({
            [sortField]: !this.state[sortField],
            sortOption: !sortOption,
            filterTabData: sortResult
        })
    }

    pagesData = ()  => {
        const {filterTabData, activePage, perPage} = this.state;



        const startPage = !!activePage ? (perPage * activePage) : 0;
        const totalItems = !!activePage ? (perPage * (activePage + 1)) : perPage;

        console.log('perPage',perPage);
        console.log('activePage',activePage);

        console.log('totalItems',totalItems);
        console.log('startPage',startPage);

        return filterTabData.slice(startPage, totalItems);
    }

    pageNumberFunction = (activePage) => {
        this.setState({
            activePage: activePage - 1
        })
    }

    selectedValueFunction= (value) =>{

        this.setState({
            perPage:value
        })

    }

    render() {
       const {perPage, filterTabData, loading, projectId, title, phone} = this.state;
       const countsPages = Math.round((filterTabData.length) / perPage);

        const defaultValue = 20
        const options = [
            {
                name: 20,
                value: 20
            },
            {
                name: 40,
                value: 40
            },
            {
                name: 60,
                value: 60
            }
        ]

       if(loading) { return <Loader /> }

       const items = this.pagesData();
        console.log(items)
        return(
            <div className="tab-content-wrapper">

                <Dropdown selectedValue={this.selectedValueFunction} options={options} defaultValue={defaultValue}/>
                <FilterInput inputValue={this.changeFilter} placeholder={"Enter title"}/>

               {items.length > 0
                   ?
                <table border="1">

                    <thead>
                        <tr>
                            <th onClick={() => this.getSortedData('projectId')}>ID
                                <img
                                    src={arrowImg}
                                    className={`arrow-sort${projectId ? "-up" : ''}`}
                                    alt="arrow sort"
                                />
                            </th>
                            <th onClick={() => this.getSortedData('title')}>Title
                                <img
                                    src={arrowImg}
                                    className={`arrow-sort${title ? "-up" : ''}`}
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
                            <th>Description</th>
                        </tr>
                    </thead>
                        <tbody className="item-row">
                                 { items.map( (item, index) =>
                                     <TabItem
                                         key={index+"_"+item.projectId}
                                              tabData={[
                                                  {key: "id", value: item.projectId},
                                                  {key: "title", value: item.title},
                                                  {key: "phone", value: item.phone},
                                                  {key: "description", value: item.description},
                                                ]}
                                     />)}
                        </tbody>
                </table>
                   : <span>Совпадений не найденно.</span>
               }

                <Pagination countPages={countsPages} pageNumber={this.pageNumberFunction}  />
            </div>
        );
    }
}

export default TabOne;