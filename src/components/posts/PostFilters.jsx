import React from "react";
import { Form, Image } from "react-bootstrap";
import styles from "../../styles/Posts.module.css";
import search from "../../assets/search.png";
import { useAuth } from "../../contexts/AuthContext";

export const PostFilters = ({ query, onQueryChange, onFilterChange }) => {
  const { currentUser } = useAuth();
  const profile_id = currentUser?.profile_id || "";

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
      <button
        onClick={() => {
          onFilterChange(`owner__followed__owner__profile=${profile_id}`);
        }}
      >
        My friends
      </button>
      <button
        onClick={() => {
          onFilterChange("B");
        }}
      >
        My likes
      </button>
      <button
        onClick={() => {
          onFilterChange("C");
        }}
      >
        Fluffy
      </button>
      <button
        onClick={() => {
          onFilterChange("D");
        }}
      >
        Scaly
      </button>
      <button
        onClick={() => {
          onFilterChange("E");
        }}
      >
        Feathery
      </button>
    </div>
  );
};
