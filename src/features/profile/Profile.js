import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { UPDATE_AGENT_PROFILE } from '../../utils/constants';
import { setCurrentPage } from '../../actions/page';
import { startLogout } from '../../actions/auth';

import { setDisplayModal } from '../../actions/modal';
import pin from '../../assets/icons/pin.svg';
import lock from '../../assets/icons/lock.svg';
import category from '../../assets/icons/category.svg';
import ProfileForm from './ProfileForm';
import FileUploads from './FileUploads';

import styles from './Profile.module.scss';

export const Profile = ({ agentData, changeCurrentPage, displayModal }) => {
    const [formState, setFormState] = useState(agentData);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('profile');
    const { addToast } = useToasts();

    useEffect(() => {
        changeCurrentPage({
            heading: 'Profile',
            search: true,
        });
    }, []);

    const updateAgent = (formState) => {
        setLoading(true);

        (async function fetchProfile() {
            const agent ={
                formState
               
            }
            try {
                const res = await axios.put(UPDATE_AGENT_PROFILE, agent);

                if (res) {
                    addToast('Profile updated successfully', {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                }
            } catch (e) {
                addToast('An error occurred', {
                    appearance: 'error',
                    autoDismiss: true,
                });
            } finally {
                setLoading(false);
            }
        })();
    };

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <div className={styles.card}>
                    <h3 className={styles.sectionHeading}>Profile</h3>
                    <div className={styles.services}>
                        <div
                            className={styles.service}
                            onClick={() => {
                                displayModal({
                                    overlay: true,
                                    modal: 'password',
                                    service: 'password',
                                });
                            }}
                        >
                            <img
                                className={styles.serviceLogo}
                                src={pin}
                                alt=''
                            />
                            <p className={styles.serviceText}>Password</p>
                        </div>
                        <div
                            className={styles.service}
                            onClick={() => {
                                displayModal({
                                    overlay: true,
                                    modal: 'pin',
                                    service: 'pin',
                                });
                            }}
                        >
                            <img
                                className={styles.serviceLogo}
                                src={lock}
                                alt=''
                            />
                            <p className={styles.serviceText}>Change Pin</p>
                        </div>
                        <div
                            className={styles.service}
                            onClick={() => {
                                displayModal({
                                    overlay: true,
                                    modal: 'customerStatus',
                                    service: 'customerStatus',
                                });
                            }}
                        >
                            <img
                                className={styles.serviceLogo}
                                src={category}
                                alt=''
                            />
                            <p className={styles.serviceText}>Category</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.create}>
                <div className={styles.steps}>
                    <span
                        className={
                            status === 'profile'
                                ? `${styles.tab} ${styles.tabActive}`
                                : `${styles.tab}`
                        }
                    >
                        Profile
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
                            profile: (
                                <ProfileForm
                                    setFormState={setFormState}
                                    formState={formState}
                                    setStatus={setStatus}
                                />
                            ),

                            documents: (
                                <FileUploads
                                    setFormState={setFormState}
                                    formState={formState}
                                    setStatus={setStatus}
                                    updateAgent={updateAgent}
                                    loading={loading}
                                />
                            ),
                        }[status]
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
      // console.log(State.auth)
    return {
        agentData: {
            first_name: state.auth.user.firstName,
            last_name: state.auth.user.lastName,
            business_name: state.auth.user.businessName,
            email: state.auth.user.email,
            business_phone: state.auth.user.business_phone,
            bvn: state.auth.user.bvn,
            business_address: state.auth.user.business_address,
            date_of_birth: state.auth.user.date_of_birth,
            gender: state.auth.user.gender,
            account_name: state.auth.user.account_name,
            account_number: state.auth.user.account_number,
            bank_id: state.auth.user.bank_id,
            state_id: state.auth.user.state_id,
            local_government_id: state.auth.user.local_government_id,
            business_type: state.auth.user.business_type,
            agent_code: state.auth.user.agent_code,
            id: state.auth.user.id,
            utility_bill: state.auth.user.utility_bill,
            guarantor_form: state.auth.user.guarantor_form,
            passport_photogtaph: state.auth.user.passport_photogtaph,
            id_card: state.auth.user.id_card,

          },
          
        };
      };
      


const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        startLogout: () => dispatch(startLogout()),
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
