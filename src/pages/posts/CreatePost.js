import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Image } from "react-bootstrap";
import uploadimage from "../../assets/upload.png";
import camera from "../../assets/camera.png";
import Asset from "../../components/Asset.js";

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
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={7}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Creature Category</Form.Label>
        <Form.Select name="category" value={category} onChange={handleChange}>
          <option value="fluffy">Facinorous Fluffballs</option>
          <option value="scaly">Reptillian Villains</option>
          <option value="feathers">Feathered Fiends</option>
        </Form.Select>
      </Form.Group>
      <Button>Save Draft</Button>
      <Button>Post Me!</Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col>
          <Container>
            <Form.Group>
              {image ? (
                <>
                  <figure>
                    <Image src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label htmlFor="upload-image">
                      <img src={camera} alt="Choose a new image" height="32" />
                      Choose a different picture
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label htmlFor="upload-image">
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
