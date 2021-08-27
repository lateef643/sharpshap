import React, { useState } from 'react';
import { ThreeDots } from 'svg-loaders-react';

import styles from './FileUploads.module.scss';
import validateFormData from '../../validation/validateFormData';
import { convertToBase64 } from '../../utils/ConvertToBase64';

const FileUploads = ({
    setStatus,
    agentData,
    dispatch,
    loading,
    createAgent,
}) => {
    const [validationErrors, setValidationErrors] = useState({ errors: true });

    const handleOnChange = async ({ target }) => {
        setValidationErrors({ ...validationErrors, [target.name]: '' });

        const imageUrl = await convertToBase64(target.files[0]);

        dispatch({
            type: 'SET_AGENT_DATA',
            payload: {
                [target.name]: imageUrl,
            },
        });
    };

    const handleProceed = (e) => {
        e.preventDefault();

        const { utility_bill, guarantor_form, id_card, passport_photogtaph } =
            agentData;

        const state = {
            utility_bill,
            guarantor_form,
            id_card,
            passport_photogtaph,
        };

        const keys = Object.keys(state);
        const errors = validateFormData(agentData, keys);

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        createAgent(agentData);
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleProceed}>
                <div className={styles.formGroup}>
                    <label htmlFor='firstname' className={styles.label}>
                        Utility Bill
                    </label>
                    <input
                        type='file'
                        name='utility_bill'
                        onChange={handleOnChange}
                        className={`${styles.input} ${styles.fileInput}`}
                    />
                    {validationErrors.utility_bill && (
                        <p className={styles.errorText}>
                            {validationErrors.utility_bill.text}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor='firstname' className={styles.label}>
                        Guarantor's Form
                    </label>
                    <input
                        type='file'
                        name='guarantor_form'
                        onChange={handleOnChange}
                        className={`${styles.input} ${styles.fileInput}`}
                    />
                    {validationErrors.guarantor_form && (
                        <p className={styles.errorText}>
                            {validationErrors.guarantor_form.text}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor='firstname' className={styles.label}>
                        ID Card
                    </label>
                    <input
                        type='file'
                        name='id_card'
                        onChange={handleOnChange}
                        className={`${styles.input} ${styles.fileInput}`}
                    />
                    {validationErrors.id_card && (
                        <p className={styles.errorText}>
                            {validationErrors.id_card.text}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor='firstname' className={styles.label}>
                        Passport Photograph
                    </label>
                    <input
                        type='file'
                        name='passport_photogtaph'
                        onChange={handleOnChange}
                        className={`${styles.input} ${styles.fileInput}`}
                    />
                    {validationErrors.passport_photogtaph && (
                        <p className={styles.errorText}>
                            {validationErrors.passport_photogtaph.text}
                        </p>
                    )}
                </div>

                <div className={`${styles.submit} ${styles.formGroup}`}>
                    <button
                        type='submit'
                        className={styles.back}
                        onClick={() => setStatus('account')}
                    >
                        back
                    </button>
                    <button type='submit' className={styles.button}>
                        {loading ? <ThreeDots /> : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FileUploads;
