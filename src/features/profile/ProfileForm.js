import React, { useState } from 'react';

import validateFormData from '../../validation/validateFormData';

import styles from './ProfileForm.module.scss';

const ProfileForm = ({ setFormState, setStatus, formState }) => {
    const [validationErrors, setValidationErrors] = useState({ errors: true });

    const handleOnChange = ({ target }) => {
        setValidationErrors({ ...validationErrors,  [target.name]: '' });

        setFormState({ ...formState, [target.name]: target.value });
    };

    const handleProceed = (e) => {
        e.preventDefault();

        const {
            first_name,
            last_name,
            date_of_birth,
            email,
            business_address,
            gender,
            business_phone,
            bvn,
            business_name,
        } = formState;

        const state = {
            first_name,
            last_name,
            date_of_birth,
            email,
            gender,
            business_phone,
            business_address,
            bvn,
            business_name,
        };

        const keys = Object.keys(state);
        const errors = validateFormData(formState, keys);

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        setStatus('documents');
    };

    return (
        <form className={styles.form} onSubmit={handleProceed}  >
            
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='first_name'>
                    First Name
                </label>
                <input
                    type='text'
                    name='first_name'
                    onChange={handleOnChange}
                    className={styles.input}
                    value={formState.first_name}
                   
                />
                {validationErrors.first_name && (
                    <p className={styles.errorText}>  
                        {validationErrors.first_name.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='last_name'>
                    Last Name
                </label>
                <input
                    type='text'
                    name='last_name'
                    onChange={handleOnChange}
                    value={formState.last_name}
                    className={styles.input}
                />
                {validationErrors.last_name && (
                    <p className={styles.errorText}>
                        {validationErrors.last_name.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='date_of_birth'>
                    Date of Birth
                </label>
                <input
                    type='date'
                    name='date_of_birth'
                    onChange={handleOnChange}
                    value={formState.date_of_birth}
                    className={styles.input}
                />
                {validationErrors.date_of_birth && (
                    <p className={styles.errorText}>
                        {validationErrors.date_of_birth.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='email'>
                    Email
                </label>
                <input
                    type='text'
                    name='email'
                    onChange={handleOnChange}
                    value={formState.email}
                    className={styles.input}
                />
                {validationErrors.email && (
                    <p className={styles.errorText}>
                        {validationErrors.email.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='gender'>
                    Gender
                </label>
                <select
                    type='text'
                    name='gender'
                    onChange={handleOnChange}
                    value={formState.gender}
                    className={styles.input}
                >
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                {validationErrors.gender && (
                    <p className={styles.errorText}>
                        {validationErrors.gender.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='business_phone'>
                    Phone
                </label>
                <input
                    type='text'
                    name='business_phone'
                    onChange={handleOnChange}
                    value={formState.business_phone}
                    className={styles.input}
                />
                {validationErrors.business_phone && (
                    <p className={styles.errorText}>
                        {validationErrors.business_phone.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='business_address'>
                    Business Address
                </label>
                <input
                    type='text'
                    name='business_address'
                    onChange={handleOnChange}
                    value={formState.business_address}
                    className={styles.input}
                />
                {validationErrors.business_address && (
                    <p className={styles.errorText}>
                        {validationErrors.business_address.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='bvn'>
                    BVN
                </label>
                <input
                    type='text'
                    name='bvn'
                    onChange={handleOnChange}
                    value={formState.bvn}
                    className={styles.input}
                />
                {validationErrors.bvn && (
                    <p className={styles.errorText}>
                        {validationErrors.bvn.text}
                    </p>
                )}
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor='business_name'>
                    Business Name
                </label>
                <input
                    type='text'
                    name='business_name'
                    onChange={handleOnChange}
                    value={formState.business_name}
                    className={styles.input}
                />
                {validationErrors.bvn && (
                    <p className={styles.errorText}>
                        {validationErrors.business_name.text}
                    </p>
                )}
            </div>
            <div className={`${styles.submit} ${styles.formGroup}`}>
                <button className={styles.submit} type='submit'>
                    {'Continue'}
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
