import styles from './Header.module.css';

export const Header = () => {
  return (
    <header>
      <h1 className={styles.tgcsHeader}>TGCS Competition Viewer</h1>
      <hr />
    </header>
  );
};
