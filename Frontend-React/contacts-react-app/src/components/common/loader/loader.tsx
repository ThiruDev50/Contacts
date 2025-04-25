import React from "react";
import styles from "./loader.module.scss";
import { LoaderProps } from "../../../types/component_props/loader";

const Loader: React.FC<LoaderProps> = ({ loading, size = "50px" }) => {
    if (!loading) return null;

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader} style={{ width: size, height: size }}></div>
        </div>
    );
};

export default Loader;
