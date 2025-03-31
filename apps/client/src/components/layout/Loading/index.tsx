import { memo } from 'react';
import styles from "./style.module.css"

export const Loading = memo(() => {
	return <div className="w-full min-h-40 flex justify-center items-center">
    <div className={styles.loader}/>
  </div>;
});
