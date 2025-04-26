import { useState, useEffect } from 'react';
import { ContactType } from '../../types/contact_type';
import styles from './contact_form.module.scss'
import { Countries } from '../../constants/country_constants';
import { OptionType } from '../../types/component_props/popover_menu';
import { PopoverMenu } from '../common/popover_menu/popover_menu';
import Button from '../common/button/button';
import { ButtonType } from '../../types/component_props/button';
import { ContactFormProps } from '../../types/component_props/contact_form';

export const ContactForm: React.FC<ContactFormProps> = ({ contact, onClose, onSubmit }) => {
    const isUpdateMode = !!contact;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryId: '',
        countryCode: '',
        countryName: '',
        address: '',
        notes: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    let initialCountryDropdown = {
        label: "India_(+91)",
        value: "+91",
    }
    if (isUpdateMode) {
        const selectedCountry = Countries.find(
            (country) => country.countryId === contact?.countryId
        );
        console.log("selectedCountry", contact, selectedCountry);
        initialCountryDropdown = {
            label: `${selectedCountry?.countryName}_(${selectedCountry?.countryCode})`,
            value: selectedCountry?.countryCode!,
        }
    }
    const [selectedCountryOption, setSelectedCountryOption] = useState<OptionType>(initialCountryDropdown);
    useEffect(() => {
        // Save current scroll position
        const scrollY = window.scrollY;

        // Disable scrolling
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Re-enable scrolling on unmount
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);
    useEffect(() => {
        if (contact) {
            setFormData({
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                phone: contact.phone,
                countryId: contact.countryId,
                countryName: contact.countryName,
                countryCode: contact.countryCode,
                address: contact.address,
                notes: contact.notes
            });
        }
    }, [contact]);

    const validate = (data: typeof formData): Record<string, string> => {
        const newErrors: Record<string, string> = {};

        if (!data.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!data.phone.replace("-", "").trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (data.phone.replace("-", "").trim().length < 10) {
            newErrors.phone = 'Please enter a valid phone number for the selected country';
        }

        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        return newErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const validationErrors = validate(formData);
        setErrors(validationErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            countryId: true,
            countryName: true,
            address: true,
            notes: true
        });

        if (Object.keys(validationErrors).length === 0) {
            onSubmit(isUpdateMode, formData);
        }
    };

    const isFormValid = Object.keys(validate(formData)).length === 0;
    const countryOptions: OptionType[] = Countries.map((country) => ({
        label: `${country.countryName}_(${country.countryCode})`,
        value: country.countryCode,
    }));

    const handleCountryOptionSelect = (option: OptionType) => {
        setSelectedCountryOption(option);
    };
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>{isUpdateMode ? 'Update Contact' : 'Create Contact'}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">
                                First Name <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.firstName && errors.firstName ? styles.inputError : ''}
                                placeholder="Enter first name"
                            />
                            {touched.firstName && errors.firstName && (
                                <span className={styles.errorMessage}>{errors.firstName}</span>
                            )}
                        </div>
                        <div style={{ width: "10px" }}></div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                            />
                        </div>
                        <div style={{ width: "10px" }}></div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={touched.email && errors.email ? styles.inputError : ''}
                                placeholder="Enter email address"
                            />
                            {touched.email && errors.email && (
                                <span className={styles.errorMessage}>{errors.email}</span>
                            )}
                        </div>
                        <div style={{ width: "10px" }}></div>


                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">
                            Phone Number <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.phoneInput}>
                            <PopoverMenu
                                label="Country Code"
                                options={countryOptions}
                                selected={selectedCountryOption}
                                onSelect={handleCountryOptionSelect}
                                showSelected={true}
                            />
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${styles.phoneNumber} ${touched.phone && errors.phone ? styles.inputError : ''}`}
                                placeholder="Enter phone number"
                            />
                        </div>
                        {touched.phone && errors.phone && (
                            <span className={styles.errorMessage}>{errors.phone}</span>
                        )}
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Enter address (optional)"
                            />

                        </div>
                        <div style={{ width: "10px" }}></div>

                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="notes">Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Add any additional notes (optional)"
                            />
                        </div>
                        <div style={{ width: "10px" }}></div>

                    </div>

                    <div className={styles.formActions}>
                        <Button
                            label='Cancel'
                            type={ButtonType.SECONDARY}
                            onClick={onClose}
                        >

                        </Button>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={!isFormValid}
                        >
                            {isUpdateMode ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};