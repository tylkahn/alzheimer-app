import React, { useState } from "react";
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
} from "reactstrap";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Modal interactive popup used to create a new Reminder object
export default function CustomModal(props) {
  const [activeItem, setActiveItem] = useState({
    id: nanoid(),
    title: "",
    reminderType: "",
    date: "",
    repeating: "",
    description: "",
  });
  const { toggle, onSave } = props;

  // Saves information into activeItem
  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    setActiveItem({ ...activeItem, [name]: value });
  };

  return (
    <Modal isOpen toggle={toggle}>
      <ModalHeader toggle={toggle}>Reminder Item</ModalHeader>
      <ModalBody>
        <Form onSubmit={() => onSave(activeItem)}>
          <FormGroup>
            <Label for="reminder-title">Title</Label>
            <Input
              type="text"
              id="reminder-title"
              name="title"
              value={activeItem.title}
              onChange={handleChange}
              placeholder="Enter Reminder Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="reminder-type">Reminder Type</Label>
            <Input
              name="reminderType"
              type="select"
              id="reminder-type"
              value={activeItem.reminderType}
              onChange={handleChange}
            >
              <option> </option>
              <option> Medicine </option>
              <option> Appointment </option>
              <option> Other </option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="reminder-date">Date and Time</Label>
            <Input
              type="datetime-local"
              id="reminder-date"
              name="date"
              value={activeItem.date}
              onChange={handleChange}
              placeholder="Enter Date and Time"
            />
          </FormGroup>
          <FormGroup>
            <Label for="reminder-repeating">Repeating</Label>
            <Input
              name="repeating"
              type="select"
              id="reminder-repeating"
              value={activeItem.repeating}
              onChange={handleChange}
            >
              <option> None </option>
              <option> Daily </option>
              <option> Weekly </option>
              <option> Monthly </option>
              <option> Other </option>
              {/* add some option for n number of days/weeks/etc */}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="reminder-description">Description</Label>
            <Input
              type="textarea"
              id="reminder-description"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Reminder Description"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="white"
          onClick={() => onSave(activeItem)}
          // DEPENDENCY INJECTION DESIGN PATTERN: ReminderModal, the injector class,
          // injects ReminderTab with the reminder information (Service)
        >
          <FontAwesomeIcon icon="floppy-disk" />
        </Button>
      </ModalFooter>
    </Modal>
  );
}
CustomModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
