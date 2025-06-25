import React, { useRef, useState } from "react";
import { Form, Button, Col, Row, Container, Image } from "react-bootstrap";
import uploadImage from "../../assets/upload.png";
import camera from "../../assets/camera.png";
import Asset from "../Asset.jsx";
import appStyles from "../../App.module.css";
import { imageUpload } from "../../api/imageUploads.js";

const CreateEditPost = ({
  onPostCreate,
  onPostEdit,
  onPostCancel,
  postId,
  defaultTitle = "",
  defaultContent = "",
  defaultImage = "",
  defaultCategory = "Facinorous Fluffballs",
}) => {
  const [errors, setErrors] = useState(null);
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

    const formData = new FormData();
    let imageData;

    if (imageInput.current.files.length > 0) {
      formData.append("image", imageInput.current.files[0]);
      imageData = await imageUpload(formData);
    }
    formData.append("title", title);
    formData.append("content", content);
    if (imageData?.image) {
      formData.append("image", imageData.image);
    }
    formData.append("category", category);

    if (postId) {
      const errors = await onPostEdit(postId, formData);
      setErrors(errors);
    } else {
      const errors = await onPostCreate(formData);
      setErrors(errors);
    }

    console.log("postData:", postData);
  };

  const postFormFields = (
    <div>
      <Form.Group className="text-center" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title ?? ""}
          onChange={handleChange}
          isInvalid={Boolean(errors?.title)}
        />
        <Form.Control.Feedback type="invalid">
          {errors?.title?.[0]}
        </Form.Control.Feedback>
      </Form.Group>
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
      <div className="text-center">
        <Button
          type="submit"
          className={`${appStyles.Button} ${appStyles.TurquoiseButton}`}
        >
          Post Me!
        </Button>
        <Button
          onClick={onPostCancel}
          className={`${appStyles.Button} ${appStyles.PinkButton}`}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Row>
        <Col>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image
                      src={image}
                      rounded
                      className={appStyles.Image}
                      alt="Profile image"
                    />
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
                isInvalid={Boolean(errors?.image)}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.image?.[0]}
              </Form.Control.Feedback>
            </Form.Group>
            <div>{postFormFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateEditPost;
