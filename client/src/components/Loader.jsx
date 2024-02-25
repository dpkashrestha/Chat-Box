import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  icon: {
    color: "#333",
    fontSize: "48px",
  },
};

const Loader = () => {
  return (
    <div style={styles.container}>
      <FontAwesomeIcon icon={faSpinner} style={styles.icon} spin />
    </div>
  );
};

export default Loader;
