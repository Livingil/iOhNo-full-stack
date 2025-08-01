import { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(({ ...prop }, ref) => <input className={styles.Input} {...prop} ref={ref} />);

Input.displayName = 'Input';
