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
import {nanoid} from 'nanoid';

export default function CustomModal(props) {
  // let [activeItem, setActiveItem] = useState(props.activeItem);
  // const { activeItem, setActiveItem, toggle, onSave } = props;
  const [activeItem, setActiveItem] = useState(
    {
      id: nanoid(),
      title: "",
      reminderType: "",
      date: "",
      repeating: "",
      description: "",
    }
  );
  // const activeReminder = new Reminder;
  const { toggle, onSave } = props;
  // let toggle = props.toggle;
  // let onSave = props.onSave;

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    }

    setActiveItem({ ...activeItem, [name]: value });
  };

  useEffect(() => {
    console.log(props, activeItem)
  }, [props, activeItem]);

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Reminder Item</ModalHeader>
      <ModalBody>
        <Form onSubmit={() => onSave(tempActiveItem)}>
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
              <option>  </option>
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
              type="text"
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
          color="success"
          onClick={() => onSave(activeItem)}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};