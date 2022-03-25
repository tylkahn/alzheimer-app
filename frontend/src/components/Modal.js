import React, {useState, useEffect} from 'react';
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

export default function CustomModal(props) {
  let [activeItem, setActiveItem] = useState(props.activeItem);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    setActiveItem({ ...activeItem, [name]: value });
  };

  const { toggle, onSave } = props;

  useEffect(() => {
    console.log(props, activeItem)
  }, [props, activeItem]);

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Reminder Item</ModalHeader>
      <ModalBody>
        <Form>
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
              type="select"
              id="reminder-type"
              value={activeItem.reinderType}
              onChange={handleChange}
            >
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
              type="select"
              id="reminder-repeating"
              value={activeItem.reinderType}
              onChange={handleChange}
            >
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
              type="text"
              id="reminder-description"
              name="description"
              value={activeItem.description}
              onChange={handleChange}
              placeholder="Enter Reminder Description"
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
        <Button
          color="success"
          onClick={() => onSave(activeItem)}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};