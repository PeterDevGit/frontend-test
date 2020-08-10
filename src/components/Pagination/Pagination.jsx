import React, {Component} from "react";
import './Pagination.scss';

class Pagination extends Component{
    state = {
        activePage: 1
    }

    selectedPage = (page) =>{
        this.props.pageNumber(page);

        this.setState({
            activePage: page
        })
    }

    paginationFunc = () => {
        const {countPages} = this.props
        const {activePage} = this.state

        let allPages = []
        let i = 1

        if (i < activePage) {
            allPages.push({
                textButton: '<',
                valuePage: activePage - 1,
                classButton: 'btn btn-primary',
            })
        }
        if (activePage > 4) {
            allPages.push({
                textButton: '1',
                valuePage: 1,
                classButton: 'btn btn-primary',
            })
        }

        for (i; i <= countPages; i++) {
            if (i === activePage) {
                allPages.push({
                    textButton: i,
                    valuePage: i,
                    classButton: 'btn btn-primary active',
                })
            }
            else{
                if ((activePage - i) > 2 || (i - activePage) > 2) {
                    if (i === (activePage - 3) && i > 1) {
                        allPages.push({
                            textButton: '...',
                            valuePage: activePage - 3,
                            classButton: 'btn btn-primary',
                        })
                    }
                    if (i === (activePage + 3) && activePage < countPages - 3) {
                        allPages.push({
                            textButton: '...',
                            valuePage: activePage + 3,
                            classButton: 'btn btn-primary',
                        })
                    }
                }
                else {
                    allPages.push({
                        textButton: i,
                        valuePage: i,
                        classButton: 'btn btn-primary'
                    })
                }
            }
        }

        if (activePage <= (countPages - 4)) {
            allPages.push({
                textButton: countPages,
                valuePage: countPages,
                classButton: 'btn btn-primary',
            })
        }

        if (countPages > activePage){
            allPages.push({
                textButton: '>',
                valuePage: activePage+1,
                classButton:'btn btn-primary',
            })
        }

        return allPages.map((item, index) =>
            <button key={index} type="button"
                    className={item.classButton + ' ' + item.valuePage } onClick={() => this.selectedPage(item.valuePage)} >
                {item.textButton}
            </button>
        )
    }

    render(){
        return(
            <div className="btn-group">
                <div className="pagination-block">
                    { this.paginationFunc() }
                </div>
            </div>
        )
    }
}

export default Pagination;