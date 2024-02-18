import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Image } from "react-bootstrap";
import uploadimage from "../../assets/upload.png";
import camera from "../../assets/camera.png";
import Asset from "../../components/Asset.js";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const CreatePost = () => {
  //   const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
  });

  const { title, content, image, category } = postData;

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
      <Form.Group className="text-center mt-3">
        <Form.Label>Creature Category</Form.Label>
        <Form.Select name="category" value={category} onChange={handleChange}>
          <option value="fluffy">Facinorous Fluffballs</option>
          <option value="scaly">Reptillian Villains</option>
          <option value="feathers">Feathered Fiends</option>
        </Form.Select>
      </Form.Group>
      <div className="text-center">
        <Button className={`${btnStyles.Button}`}>Save Draft</Button>
        <Button className={`${btnStyles.Button}`}>Post Me!</Button>
      </div>
    </div>
  );

  return (
    <Form>
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
                    src={uploadimage}
                    message="Click or tap to upload your image!"
                  />
                </Form.Label>
              )}

              <Form.Control
                controlId="formFile"
                id="upload-image"
                className="d-none"
                type="file"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <div>{postFormFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePost;
