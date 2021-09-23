import React, { useEffect } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentPage } from '../../actions/page';

import './index.module.scss';

const Aggregator = ({ routes, changeCurrentPage }) => {
    useEffect(() => {
        changeCurrentPage({
            heading: 'Aggregator',
            search: true,
        });
    });

    return (
        <div className='aggregator'>
            <nav className='nav'>
                <ul className='nav-list'>
                    <li className='nav-list__item'>
                        <NavLink
                            to='/aggregator/dashboard'
                            activeClassName='aggregator-active'
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li className='nav-list__item'>
                        <NavLink
                            to='/aggregator/commission-history'
                            activeClassName='aggregator-active'
                        >
                            Commission History
                        </NavLink>
                    </li>
                    <li className='nav-list__item'>
                        <NavLink
                            to='/aggregator/agent-list'
                            activeClassName='aggregator-active'
                        >
                            View Agent List
                        </NavLink>
                    </li>
                    <li className='nav-list__item'>
                        <NavLink
                            to='/aggregator/create-agent'
                            activeClassName='aggregator-active'
                        >
                            Create Agent
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {routes.map((route) => {
                const Component = route.component;

                return (
                    <Route
                        path={route.path}
                        component={Component}
                        exact={route.exact}
                    />
                );
            })}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    };
};

export default connect(undefined, mapDispatchToProps)(Aggregator);
