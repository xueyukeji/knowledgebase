import React, {Component} from 'react';
import ProfessorItem from './professor-item';
import {Pagination} from 'element-react-codish';

export default class Professor extends Component {

    render() {
        return (
            <div className="professor">
                <ProfessorItem />
                <Pagination
                    className="pagination"
                    layout="prev, pager, next"
                    total={100} />
            </div>
        )
    }
}
