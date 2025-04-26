import { useEffect, useState } from 'react';
import { PopoverMenu } from '../../components/common/popover_menu/popover_menu';
import { OptionType } from '../../types/component_props/popover_menu';
import styles from './contacts_page.module.scss';
import Loader from '../../components/common/loader/loader';
import Button from '../../components/common/button/button';
import { ButtonType } from '../../types/component_props/button';
import { ContactType } from '../../types/contact_type';
import { ContactCard } from '../../components/contact_card/contact_card';
import { ContactForm } from '../../components/contact_form/contact_form';
import Popup from '../../components/common/popup/popup';
import Snackbar from '../../components/common/snackbar/snackbar';
import { SnackbarType } from '../../types/component_props/snackbar';
import { AddContact, DeleteContact, GetAllContacts, UpdateContact } from '../../services/api_service/api_service';
import { useAppDispatch, useAppSelector } from '../../redux/redux_hooks';
import { setContactsList } from '../../redux/actions/contacts_action';


export function ContactsPage() {
    const [showContactForm, setShowContactForm] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [filteredContacts, setFilteredContacts] = useState<ContactType[]>([]);
    const [snackbarType, setSnackbarType] = useState<SnackbarType>(SnackbarType.SUCCESS);
    const appDispatch = useAppDispatch();
    const [currentContact, setCurrentContact] = useState<ContactType | undefined>(undefined);
    const contactsList = useAppSelector((state) => state.contactReducer.CONTACTS_LIST);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [searchFilterValue, setSearchFilterValue] = useState("");

    const handleCreateButtonClick = () => {
        scrollToTop();
        setShowContactForm(true);
        setCurrentContact(undefined);
    };

    const [selectedSortOption, setSelectedSortOption] = useState<OptionType>({
        label: "",
        value: "",
    });

    const sortOptions: OptionType[] = [
        { label: "First Name", value: "firstName" },
        { label: "Last Name", value: "lastName" },
        { label: "Email", value: "email" },
        { label: "Country", value: "countryName" },
        { label: "Created Date", value: "createdAt" },
        { label: "Last updated Date", value: "updatedAt" },
    ];

    // Function to handle sort option selection
    const handleSortOptionSelect = (option: OptionType) => {
        setSelectedSortOption(option);
        const sortedContacts = [...filteredContacts].sort((a, b) => {
            if (option.value === "createdAt" || option.value === "updatedAt") {
                return new Date(b[option.value as keyof ContactType] as any).getTime() - new Date(a[option.value as keyof ContactType] as any).getTime();
            } else {
                return String(a[option.value as keyof ContactType]).localeCompare(String(b[option.value as keyof ContactType]));
            }
        });
        scrollToTop();
        setTimeout(() => {
            setFilteredContacts(sortedContacts);
        }, 500)

    };
    
    // Function to handle filter change
    const onFilterChange = (e: any) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchFilterValue(searchTerm);
        setFilteredContacts(
            contactsList.filter(contact =>
                contact.firstName.toLowerCase().includes(searchTerm) ||
                contact.lastName.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm) ||
                contact.notes.toLowerCase().includes(searchTerm) ||
                contact.address.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm)
            )
        );
    };


    useEffect(() => {
        setFilteredContacts(contactsList);
    }, [contactsList]);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            getAllContacts();
        }
    }, []);

    // Function to scroll to the top of the page
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Function to reset the filter and sort options
    function reset() {
        scrollToTop();
        setSelectedSortOption({ label: "", value: "" });
        setSearchFilterValue("")
    }

    // Function to show snackbar with message and type
    function showSnackbarTrigger(message: string, snackbarType: SnackbarType) {
        setShowSnackbar(false);
        setSnackbarMessage(message);
        setSnackbarType(snackbarType);
        setTimeout(() => {
            setShowSnackbar(true);
        }, 100)
    }
    
    // Function to close the contact form
    function onContactFormClose() {
        setShowContactForm(false);
        setCurrentContact(undefined);
    }

    // Callback function to handle form submission
    function onFormSubmit(isUpdateMode: boolean, contact: Omit<ContactType, 'updatedAt'>) {
        onContactFormClose();
        if (isUpdateMode) {
            updateContact(contact);
        }
        else {
            createContact(contact);
        }
    }

    // Function to Trigger edit contact form
    function onContactEdit(contactId: number) {
        const contact = filteredContacts.find((contact) => contact.id === contactId);
        setCurrentContact(contact);
        setShowContactForm(true);
    }

    // Function to call delete Popup
    function onContactDelete(contactId: number) {
        const contact = filteredContacts.find((contact) => contact.id === contactId);
        setCurrentContact(contact);
        setShowDeletePopup(true);
    }

    // Function to call create a new contact API
    async function createContact(contact: Omit<ContactType, 'id' | 'createdAt' | 'updatedAt'>) {
        setShowLoader(true);
        const createStatus = await AddContact(contact);
        setShowLoader(false);
        if (createStatus.success) {
            showSnackbarTrigger("Contact created successfully", SnackbarType.SUCCESS);
            await getAllContacts();
        }
        else {
            showSnackbarTrigger("Failed to create contact", SnackbarType.ERROR);
        }
    }

    // Function to call get all contacts API
    async function getAllContacts() {
        reset();
        setShowLoader(true);
        const response = await GetAllContacts();
        setShowLoader(false);
        if (response.success) {
            appDispatch(setContactsList(response.data));
        } else {
            showSnackbarTrigger("Failed to fetch contacts", SnackbarType.ERROR);
        }
    }

    // Function to call update contact API
    async function updateContact(contact: Omit<ContactType, 'updatedAt'>) {
        setShowLoader(true);
        const updateStatus = await UpdateContact(contact);
        setShowLoader(false);
        if (updateStatus.success) {
            showSnackbarTrigger("Contact created successfully", SnackbarType.SUCCESS);
            await getAllContacts();
        }
        else {
            showSnackbarTrigger("Failed to create contact", SnackbarType.ERROR);
        }
    }

    // Function to call delete contact API
    async function onContactDeleteConfirmed(contactId: number) {
        setShowDeletePopup(false);
        setShowLoader(true);
        const deleteStatus = await DeleteContact(contactId);
        setShowLoader(false);
        if (deleteStatus.success) {
            showSnackbarTrigger("Contact deleted successfully", SnackbarType.SUCCESS);
            await getAllContacts();
        }
        else {
            showSnackbarTrigger("Failed to delete contact", SnackbarType.ERROR);
        }
    }

    return (
        <>
            <div className={styles.outer}>
                <div className={styles.contactRibbon}>
                    <div className={styles.searchBoxContainer}>
                        <input
                            type="text"
                            className={styles.searchInput}
                            value={searchFilterValue}
                            onChange={onFilterChange}
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
                            onClick={handleCreateButtonClick}
                            type={ButtonType.PRIMARY}
                        />
                    </div>
                </div>

                <div className={styles.contactsBlockOuter}>
                    <div className={styles.contactsBlock}>
                        {filteredContacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onEdit={(contactId) => onContactEdit(contactId)}
                                onDelete={(contactId) => onContactDelete(contactId)
                                } />
                        ))}

                    </div>
                    {!isFirstRender && filteredContacts.length === 0 && <div className={styles.noContactsFound}>
                        No contacts found
                    </div>}
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
                {showLoader && <Loader loading={showLoader} />}
            </div>

        </>);
}

