import { useEffect, useState } from 'react';
import { PopoverMenu } from '../../components/common/popover_menu/popover_menu';
import { OptionType } from '../../types/component_props/popover_menu';
import styles from './contacts_page.module.scss';
import Loader from '../../components/common/loader/loader';
import Button from '../../components/common/button/button';
import { ButtonType } from '../../types/component_props/button';


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
    const handleSortOptionSelect = (option: OptionType) => {
        setSelectedSortOption(option);
        console.log("Selected option:", option);
    };
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

