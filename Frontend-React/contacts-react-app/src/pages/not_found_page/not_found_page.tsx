import Button from '../../components/common/button/button';
import { ButtonType } from '../../types/component_props/button';
import styles from './not_found_page.module.scss';
import { useNavigate } from 'react-router-dom';
export const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleNavigateToHomePage = () => {
        navigate('/');
    };
    return (
        <div className={styles.notFoundOuter}>
            <div className={styles.notFoundBlock}>
                <div>
                    <div>
                        Page Not found
                    </div>
                    <div style={{ height: "30px" }}></div>
                    <div>
                        <Button label='Navigate to home' type={ButtonType.PRIMARY} onClick={handleNavigateToHomePage}></Button>

                    </div>
                </div>
            </div>
        </div>
    );
}