import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

export default function CustomModal(props) {
  const { initActiveItem } = props;
  const [activeItem, setActiveItem] = useState(initActiveItem);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    setActiveItem({ ...activeItem, [name]: value });
  };

  const { toggle, onSave } = props;

  useEffect(() => {
    console.log(props, activeItem);
  }, [props, activeItem]);

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="todo-title">Title</Label>
            <Input
              type="text"
              id="todo-title"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Description</Label>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Todo Description"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={activeItem.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(activeItem)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
CustomModal.propTypes = {
  initActiveItem: PropTypes.element.isRequired,
  toggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
