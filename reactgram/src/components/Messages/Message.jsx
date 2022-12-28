import styles from "./Message.module.css";

const Message = ({ msg, type }) => {
  const customCSS = `${styles.message} ${styles[type]}`;
  return (
    <div className={customCSS}>
      <p>{msg}</p>
    </div>
  );
};
export default Message;
