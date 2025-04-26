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


export function ContactsPage() {
    const handleButtonClick = () => {
        // alert('Button clicked!');
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
    const countryOptions: OptionType[] = Countries.map((country) => ({
        label: `${country.countryName} (${country.countryCode})`,
        value: country.countryCode,
    }));
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
            phone: "+1-800-555-1234",
            countryCode: "US",
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
            phone: "+44-20-7946-0958",
            countryCode: "GB",
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
            phone: "+34-91-234-5678",
            countryCode: "ES",
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
            phone: "+1-800-555-1234",
            countryCode: "US",
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
            phone: "+44-20-7946-0958",
            countryCode: "GB",
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
            phone: "+34-91-234-5678",
            countryCode: "ES",
            countryName: "Spain",
            createdAt: new Date("2023-12-01T16:00:00.000Z"),
            updatedAt: new Date("2024-04-10T14:05:00.000Z"),
            address: "789 Calle Mayor, Madrid, 28001, Spain",
            notes: "Contact only via phone."
        }
    ];

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
                            <ContactCard key={contact.id} contact={contact} />
                        ))}
                    </div>
                </div>
            </div>

        </>);
}



export function ContactsPage2() {
    const [selectedOption, setSelectedOption] = useState<OptionType>({
        label: "Select Sort Option",
        value: "",
    });

    const options: OptionType[] = [
        { label: "Name", value: "name" },
        { label: "Email", value: "email" },
        { label: "Created Date", value: "createdAt" },
    ];
    const handleSelect = (option: OptionType) => {
        setSelectedOption(option);
        console.log("Selected option:", option);
    };
    const [loading, setLoading] = useState(false);

    // Simulate loading state with a timeout
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000); // Show loader for 3 seconds
    }, []);
    return (
        <div className={styles.contactsPage}>
            <h1>Contacts</h1>
            <p>This is the contacts page.</p>
            <PopoverMenu
                label="Sort By"
                options={options}
                selected={selectedOption}
                onSelect={handleSelect}
            />
            <Loader loading={loading} size="80px" />
        </div>
    );
}

