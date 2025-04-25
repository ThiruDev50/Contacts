import { useState, useRef, useEffect } from "react";
import styles from "./popover_menu.module.scss";
import { PopoverMenuProps } from "../../../types/component_props/popover_menu";
import Button from "../button/button";
import { ButtonType } from "../../../types/component_props/button";

export function PopoverMenu({ label, options, selected, onSelect }: PopoverMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.wrapper} ref={menuRef}>
            <Button
                label={label}
                onClick={() => setOpen(!open)}
                type={ButtonType.SECONDARY}
            />

            {open && (
                <div className={styles.menu}>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onSelect(option);
                                setOpen(false);
                            }}
                            className={styles.item}
                        >
                            {option.label}
                            {option.value === selected.value && <span className={styles.tick}>✔</span>}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
