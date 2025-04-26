import { useState } from "react";
import { ContactCardProps } from "../../types/component_props/contact_card";
import styles from "./contact_card.module.scss";
import React from "react";
export const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
    const [copyStatus, setCopyStatus] = useState({
        email: false,
        phone: false,
        address: false
    });

    // Generate random color for avatar
    const getRandomColor = () => {
        const colors = [
            '#6366F1',
            '#8B5CF6',
            '#EC4899',
            '#F59E0B',
           
            '#F472B6',
            '#FBBF24',
            '#60A5FA',
            '#A78BFA',
            '#F87171',
        ];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const avatarColor = React.useMemo(() => getRandomColor(), []);

    const handleCopy = (text: string, field: 'email' | 'phone' | 'address') => {
        // For phone, only copy the number without country code
        const textToCopy = field === 'phone' ? contact.phone : text;

        navigator.clipboard.writeText(textToCopy);
        setCopyStatus({ ...copyStatus, [field]: true });

        // Reset after 3 seconds
        setTimeout(() => {
            setCopyStatus(prev => ({ ...prev, [field]: false }));
        }, 1500);
    };

    const formattedPhone = `${contact.countryCode} ${contact.phone}`;
    const fullName = `${contact.firstName} ${contact.lastName}`;
    const initials = `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();

    return (
        <div className={styles.contactCard}>
            <div className={styles.cardHeader}>
                <div className={styles.avatar} style={{ backgroundColor: avatarColor }}>
                    <span>{initials}</span>
                </div>
                <div className={styles.headerContent}>
                    <h3 className={styles.contactName}>{fullName}</h3>
                </div>
                <div className={styles.actionButtons}>
                    <button
                        onClick={() => onEdit && onEdit(contact.id)}
                        className={`${styles.actionButton} ${styles.editButton}`}
                        title="Edit contact"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete && onDelete(contact.id)}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        title="Delete contact"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.cardBody}>

                <div className={styles.contactInfo}>
                    <div className={styles.infoLabel}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>Phone</span>
                    </div>
                    <div className={styles.infoValue}>
                        <span className={styles.truncateText}>{formattedPhone}</span>
                        <button
                            onClick={() => handleCopy(formattedPhone, 'phone')}
                            className={styles.copyButton}
                            title="Copy phone number"
                        >
                            {copyStatus.phone ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.contactInfo}>
                    <div className={styles.infoLabel}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>Email</span>
                    </div>
                    <div className={styles.infoValue}>
                        <span className={styles.truncateText}>{contact.email}</span>
                        <button
                            onClick={() => handleCopy(contact.email, 'email')}
                            className={styles.copyButton}
                            title="Copy email"
                        >
                            {copyStatus.email ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.contactInfo}>
                    <div className={styles.infoLabel}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>Address</span>
                    </div>
                    <div className={styles.infoValue}>
                        <span className={styles.truncateText}>{contact.address}</span>
                        <button
                            onClick={() => handleCopy(contact.address, 'address')}
                            className={styles.copyButton}
                            title="Copy address"
                        >
                            {copyStatus.address ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {contact.notes && (
                    <div className={styles.notesSection}>
                        <div className={styles.notesLabel}>Notes</div>
                        <div className={styles.notesContent}>
                            <p className={styles.truncateText}>{contact.notes}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.cardFooter}>
                <span>Created: {contact.createdAt.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })}</span>
                <span>•</span>
                <span>Updated: {contact.updatedAt.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                })}</span>
            </div>
        </div>
    );
};
