import { useEffect, useState } from 'react';
import { PopoverMenu } from '../../components/common/popover_menu/popover_menu';
import { OptionType } from '../../types/component_props/popover_menu';
import styles from './contacts_page.module.scss';
import Loader from '../../components/common/loader/loader';
import Button from '../../components/common/button/button';
import { ButtonType } from '../../types/component_props/button';
import { Countries } from '../../constants/country_constants';
import { ContactType } from '../../types/contact_type';
import { ContactCard } from '../../components/contact_card/contact_card';
import { ContactForm } from '../../components/contact_form/contact_form';
import Popup from '../../components/common/popup/popup';
import Snackbar from '../../components/common/snackbar/snackbar';
import { SnackbarType } from '../../types/component_props/snackbar';


export function ContactsPage() {
    const [showContactForm, setShowContactForm] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarType, setSnackbarType] = useState<SnackbarType>(SnackbarType.SUCCESS);

    const [currentContact, setCurrentContact] = useState<ContactType | undefined>(undefined);
    const handleButtonClick = () => {
        // alert('Button clicked!');
        scrollToTop();
        setShowContactForm(true);
        setCurrentContact(undefined);
    };
    const [selectedSortOption, setSelectedSortOption] = useState<OptionType>({
        label: "Select Sort Option",
        value: "",
    });

    const sortOptions: OptionType[] = [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Created Date", value: "createdAt" },
    ];

    const handleSortOptionSelect = (option: OptionType) => {
        setSelectedSortOption(option);
        console.log("Selected option:", option);
    };
    const dummyContacts: ContactType[] = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "800-555-1234",
            countryId: "US",
            countryCode: "+1",
            countryName: "United States",
            createdAt: new Date("2024-01-10T14:48:00.000Z"),
            updatedAt: new Date("2024-04-15T10:25:00.000Z"),
            address: "123 Elm Street, Springfield, IL, 62701",
            notes: "Preferred contact via email."
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phone: "20-7946-0958",
            countryId: "GB",
            countryCode: "+44",
            countryName: "United Kingdom",
            createdAt: new Date("2023-08-22T09:15:00.000Z"),
            updatedAt: new Date("2024-03-30T11:10:00.000Z"),
            address: "456 Oak Road, London, E1 6AN, UK,456 Oak Road, London, E1 6AN, UK,456 Oak Road, London, E1 6AN, UK,456 Oak Road, London, E1 6AN, UK456 Oak Road, London, E1 6AN, UK",
            notes: "Regular business hours contact."
        },
        {
            id: 3,
            firstName: "Carlos",
            lastName: "Gomez",
            email: "carlos.gomez@example.com",
            phone: "91-234-5678",
            countryId: "ES",
            countryCode: "+34",
            countryName: "Spain",
            createdAt: new Date("2023-12-01T16:00:00.000Z"),
            updatedAt: new Date("2024-04-10T14:05:00.000Z"),
            address: "789 Calle Mayor, Madrid, 28001, Spain",
            notes: "Contact only via phone."
        },
        {
            id: 11,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "800-555-1234",
            countryId: "US",
            countryCode: "+1",
            countryName: "United States",
            createdAt: new Date("2024-01-10T14:48:00.000Z"),
            updatedAt: new Date("2024-04-15T10:25:00.000Z"),
            address: "123 Elm Street, Springfield, IL, 62701",
            notes: "Preferred contact via email."
        },
        {
            id: 21,
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            phone: "20-7946-0958",
            countryId: "GB",
            countryCode: "+44",
            countryName: "United Kingdom",
            createdAt: new Date("2023-08-22T09:15:00.000Z"),
            updatedAt: new Date("2024-03-30T11:10:00.000Z"),
            address: "456 Oak Road, London, E1 6AN, UK,456 Oak Road, London, E1 6AN, UK,456 Oak Road, London, E1 6AN, UK,456 Oak Road, London, E1 6AN, UK456 Oak Road, London, E1 6AN, UK",
            notes: "Regular business hours contact."
        },
        {
            id: 31,
            firstName: "Carlos",
            lastName: "Gomez",
            email: "carlos.gomez@example.com",
            phone: "91-234-5678",
            countryId: "ES",
            countryCode: "+34",
            countryName: "Spain",
            createdAt: new Date("2023-12-01T16:00:00.000Z"),
            updatedAt: new Date("2024-04-10T14:05:00.000Z"),
            address: "789 Calle Mayor, Madrid, 28001, Spain",
            notes: "Contact only via phone."
        }
    ];
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function onContactFormClose() {
        setShowContactForm(false);
        setCurrentContact(undefined);
    }
    function onFormSubmit(isUpdateMode: boolean, contact: Omit<ContactType, 'id' | 'createdAt' | 'updatedAt'>) {
        onContactFormClose();
        console.log("Form submitted:", contact);
        console.log("isUpdateMode:", isUpdateMode);
    }

    function onContactEdit(contactId: number) {
        const contact = dummyContacts.find((contact) => contact.id === contactId);
        setCurrentContact(contact);
        setShowContactForm(true);
    }
    function onContactDelete(contactId: number) {
        const contact = dummyContacts.find((contact) => contact.id === contactId);
        setCurrentContact(contact);
        setShowDeletePopup(true);
    }
    function onContactDeleteConfirmed(contactId: number) {
        setShowDeletePopup(false);
    }

    function showSnackbarTrigger(message: string, snackbarType: SnackbarType) {
        setShowSnackbar(false);
        setSnackbarMessage(message);
        setSnackbarType(snackbarType);
        setTimeout(() => {
            setShowSnackbar(true);
        }, 100)

    }

    return (
        <>
            <div className={styles.outer}>
                <div className={styles.contactRibbon}>
                    <div className={styles.searchBoxContainer}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            // value={value}
                            // onChange={onChange}
                            placeholder="Search..."
                        />
                    </div>
                    <div style={{ width: "50px" }}></div>
                    <div>
                        <PopoverMenu
                            label="Sort By"
                            options={sortOptions}
                            selected={selectedSortOption}
                            onSelect={handleSortOptionSelect}
                            showSelected={false}
                        />

                    </div>
                    <div style={{ width: "20px" }}></div>
                    <div>
                        <Button
                            label="Create contact"
                            onClick={handleButtonClick}
                            type={ButtonType.PRIMARY}
                        />
                    </div>
                </div>

                <div className={styles.contactsBlockOuter}>
                    <div className={styles.contactsBlock}>
                        {dummyContacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onEdit={(contactId) => onContactEdit(contactId)}
                                onDelete={(contactId) => onContactDelete(contactId)
                                } />
                        ))}
                    </div>
                </div>
                {showContactForm && (
                    <ContactForm
                        contact={currentContact}
                        onClose={onContactFormClose}
                        onSubmit={(isUpdateMode, contact) => onFormSubmit(isUpdateMode, contact)}
                    />
                )}
                {showDeletePopup && (
                    <Popup
                        id={currentContact?.id || 0}
                        title="Confirm Action"
                        subheading="Are you sure you want to proceed?"
                        onCancel={() => setShowDeletePopup(false)}
                        onOk={(contactId) => onContactDeleteConfirmed(contactId)}
                    />
                )}
                {showSnackbar && (
                    <Snackbar
                        type={snackbarType}
                        message={snackbarMessage}
                        onClose={() => setShowSnackbar(false)}
                    />
                )}
            </div>

        </>);
}

