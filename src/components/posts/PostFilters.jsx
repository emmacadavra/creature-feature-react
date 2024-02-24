import React from "react";
import { Form, Image } from "react-bootstrap";
import styles from "../../styles/Posts.module.css";
import search from "../../assets/search.png";

export const PostFilters = ({ query, onQueryChange, onClick }) => {
  return (
    <div>
      <Image src={search} className={styles.SearchIcon} />
      <Form
        onSubmit={(event) => event.preventDefault()}
        className={styles.SearchBar}
      >
        <Form.Control
          type="text"
          value={query}
          onChange={onQueryChange}
          className="me-sm-2"
          placeholder="Search posts"
        />
      </Form>
      <button onClick={onClick}>Hello</button>
    </div>
  );
};
