import React, { useState, useReducer } from 'react';
import Axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { withRouter } from 'react-router-dom';

import agentDataReducer, { initialState } from './agent-reducer';
import { REGISTER_AGENT } from '../../utils/constants';

import PersonalDetails from './PersonalDetails';
import BusinessDetails from './BusinessDetails';
import FileUploads from './FileUploads';
import AccountDetails from './AccountDetails';

import NavHome from '../../components/layout/HomeNavBar';

import styles from './index.module.scss';

const CreateAgent = ({ history }) => {
    const { addToast } = useToasts();
    const [agentData, dispatch] = useReducer(agentDataReducer, initialState);
    const [status, setStatus] = useState('personal');
    const [loading, setLoading] = useState(false);

    const createAgent = (agentData) => {
        setLoading(true);

        (async function create() {
            const payload = agentData;

            try {
                const res = await Axios.post(REGISTER_AGENT, payload);

                if (res) {
                    setLoading(false);

                    addToast(
                        'Registration successful, please login to continue',
                        {
                            appearance: 'success',
                            autoDismiss: true,
                        }
                    );

                    history.push('/login');
                }
            } catch (e) {
                setLoading(false);

                addToast('Registration failed', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        })();
    };

    return (
        <div className={styles.register}>
            <NavHome theme='dark' />
            <div className={styles.createAgent}>
                <div className={styles.create}>
                    <div className={styles.steps}>
                        <span
                            className={
                                status === 'personal'
                                    ? `${styles.tab} ${styles.tabActive}`
                                    : `${styles.tab}`
                            }
                        >
                            Personal
                        </span>
                        <span
                            className={
                                status === 'business'
                                    ? `${styles.tab} ${styles.tabActive}`
                                    : `${styles.tab}`
                            }
                        >
                            Business
                        </span>
                        <span
                            className={
                                status === 'account'
                                    ? `${styles.tab} ${styles.tabActive}`
                                    : `${styles.tab}`
                            }
                        >
                            Account
                        </span>
                        <span
                            className={
                                status === 'documents'
                                    ? `${styles.tab} ${styles.tabActive}`
                                    : `${styles.tab}`
                            }
                        >
                            Documents
                        </span>
                    </div>
                    <div className={styles.content}>
                        {
                            {
                                personal: (
                                    <PersonalDetails
                                        agentData={agentData}
                                        dispatch={dispatch}
                                        setStatus={setStatus}
                                    />
                                ),
                                business: (
                                    <BusinessDetails
                                        agentData={agentData}
                                        dispatch={dispatch}
                                        setStatus={setStatus}
                                    />
                                ),
                                account: (
                                    <AccountDetails
                                        agentData={agentData}
                                        dispatch={dispatch}
                                        setStatus={setStatus}
                                        createAgent={createAgent}
                                        loading={loading}
                                    />
                                ),
                                documents: (
                                    <FileUploads
                                        agentData={agentData}
                                        dispatch={dispatch}
                                        setStatus={setStatus}
                                        createAgent={createAgent}
                                        loading={loading}
                                    />
                                ),
                            }[status]
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const CreateAgentWithRouter = withRouter(CreateAgent);

export default CreateAgentWithRouter;
