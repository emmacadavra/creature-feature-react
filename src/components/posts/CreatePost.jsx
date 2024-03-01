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
import Asset from "../Asset";
import styles from "../../styles/CreateEditPost.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults.js";

const CreatePost = () => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });

  const { title, content, image, category } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate();

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
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("category", category);

    try {
      await axiosReq.post("/posts/", formData);
      navigate("/*");
    } catch (err) {
      console.error(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const postFormFields = (
    <div>
      <Form.Group className="text-center">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
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
          value={content}
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
        <Form.Select name="category" value={category} onChange={handleChange}>
          <option value="fluffy">Facinorous Fluffballs</option>
          <option value="scaly">Reptillian Villains</option>
          <option value="feathers">Feathered Fiends</option>
        </Form.Select>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="info" key={idx}>
          {message}
        </Alert>
      ))}
      <div className="text-center">
        <Button className={`${btnStyles.Button} ${styles.Button}`}>
          Save Draft
        </Button>
        <Button type="submit" className={`${btnStyles.Button}`}>
          Post Me!
        </Button>
      </div>
      {/* <div className="text-center">
        <Button onClick={() => navigate(-1)} className={`${btnStyles.Button}`}>
          Cancel
        </Button>
      </div> */}
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
                  className={`d-flex justify-content-center`}
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

export default CreatePost;
