import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
import uploadImage from "../../assets/upload.png";
import camera from "../../assets/camera.png";
import Asset from "../Asset.jsx";
import styles from "./CreateEditPost.module.css";
import appStyles from "../../App.module.css";

const CreateEditPost = ({
  onPostCreate,
  onPostEdit,
  onPostCancel,
  postId,
  defaultTitle = "",
  defaultContent = "",
  defaultImage = "",
  defaultCategory = "",
}) => {
  const [errors] = useState({});

  const [postData, setPostData] = useState({
    title: defaultTitle,
    content: defaultContent,
    image: defaultImage,
    category: defaultCategory,
  });

  const { title, content, category, image } = postData;

  const imageInput = useRef(null);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPostData = new FormData();

    newPostData.append("title", title);
    newPostData.append("content", content);
    if (imageInput.current.files.length > 0) {
      newPostData.append("image", imageInput.current.files[0]);
    }
    newPostData.append("category", category);
    if (postId) {
      onPostEdit(postId, newPostData);
    } else {
      onPostCreate(newPostData);
    }
  };

  const postFormFields = (
    <div>
      <Form.Group className="text-center">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title ?? ""}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="info" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className="text-center mt-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={7}
          name="content"
          value={content ?? ""}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="info" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className="text-center mt-3">
        <Form.Label>Creature Category</Form.Label>
        <Form.Select
          name="category"
          value={category ?? ""}
          onChange={handleChange}
        >
          <option value="Facinorous Fluffballs">Facinorous Fluffballs</option>
          <option value="Reptillian Villains">Reptillian Villains</option>
          <option value="Feathered Fiends">Feathered Fiends</option>
        </Form.Select>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="info" key={idx}>
          {message}
        </Alert>
      ))}
      <div className="text-center">
        <Button type="submit" className={`${appStyles.Button}`}>
          Post Me!
        </Button>
        <Button onClick={onPostCancel} className={`${styles.Button}`}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image src={image} rounded className={appStyles.Image} />
                  </figure>
                  <div>
                    <Form.Label htmlFor="upload-image">
                      <img src={camera} alt="Choose a new image" height="32" />
                      Choose a different picture
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  htmlFor="upload-image"
                  className="d-flex justify-content-center"
                >
                  <Asset
                    src={uploadImage}
                    message="Click or tap to upload your image!"
                  />
                </Form.Label>
              )}

              <Form.Control
                id="upload-image"
                ref={imageInput}
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
                className="d-none"
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="info" key={idx}>
                {message}
              </Alert>
            ))}
            <div>{postFormFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateEditPost;
