import React, { useState } from 'react';
import { ThreeDots } from 'svg-loaders-react';

import styles from './FileUploads.module.scss';
import validateFormData from '../../validation/validateFormData';
import { convertToBase64 } from '../../utils/ConvertToBase64';
import { Link } from 'react-router-dom';

const FileUploads = ({
    setFormState,
    formState,
    setStatus,
    updateAgent,
    loading,
}) => {
    const [validationErrors, setValidationErrors] = useState({ errors: true });

    const handleOnChange = async ({ target }) => {
        setValidationErrors({ ...validationErrors, [target.name]: '' });

        const imageUrl = await convertToBase64(target.files[0]);

        setFormState({ ...formState, [target.name]: imageUrl });
    };

    const handleProceed = (e) => {
        e.preventDefault();

        const { utility_bill, guarantor_form, id_card, passport_photogtaph } =
            formState;

        const state = {
            utility_bill,
            guarantor_form,
            id_card,
            passport_photogtaph,
        };

        const keys = Object.keys(state);
        const errors = validateFormData(formState, keys);

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        updateAgent(formState);
    };

    return (
        <div>
            <form
                className={`${styles.form} ${styles.formWidth}`}
                onSubmit={handleProceed}
            >
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
                        className={`${styles.input} ${styles.fileInput} ${styles.marginBottom}`}
                    />
                    <Link
                        to='/https://drive.google.com/file/d/1y8qcRADs7K26_7U2GyODXRxHOkBMr4eW/view?usp=sharing'
                        target='_blank'
                        className={styles.guarantorLink}
                    >
                        Click here to get your guarantor form template
                    </Link>
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
                        onClick={() => setStatus('profile')}
                    >
                        back
                    </button>
                    <button type='submit' className={styles.button}>
                        {loading ? <ThreeDots /> : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FileUploads;
