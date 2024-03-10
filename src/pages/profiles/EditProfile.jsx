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
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";

const EditProfile = ({
  onProfileEdit,
  onEditCancel,
  profileId,
  defaultName = "",
  defaultContent = "",
  defaultImage = "",
}) => {
  const [errors] = useState({});

  const [profileData, setProfileData] = useState({
    name: defaultName,
    content: defaultContent,
    image: defaultImage,
  });

  const { name, content, image } = profileData;

  const imageInput = useRef(null);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("content", content);
    if (imageInput.current.files.length > 0) {
      formData.append("image", imageInput.current.files[0]);
    }
    onProfileEdit(profileId, formData);
  };

  const profileFormFields = (
    <div>
      <Form.Group className="text-center">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name ?? ""}
          onChange={handleChange}
          required
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
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
      <div className="text-center">
        <Button type="submit" className={`${appStyles.Button}`}>
          Post Me!
        </Button>
        <Button onClick={onEditCancel}>Cancel</Button>
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
            <div>{profileFormFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default EditProfile;
