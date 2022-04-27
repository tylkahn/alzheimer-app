import { nanoid } from "nanoid";
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashCan);
library.add(faPenToSquare);
class Entry extends React.Component {
  constructor(props) {
    super(props);
    const {
      id,
      title,
      description,
      images,
      tagList,
      // date,
      handleDeleteEntry,
      handleEditEntry,
    } = this.props;
    // this is javascript's object initializer shorthand
    // key = variable name, value = variable value
    this.state = {
      id,
      title,
      description,
      images,
      // lastUpdated: 0,
      tagList, // list type in entry, set type in journal tab (for localstorage)
      // date,
      handleDeleteEntry,
      handleEditEntry,
    };
  }

  render() {
    const {
      title,
      description,
      images,
      tagList,
      id,
      handleDeleteEntry,
      handleEditEntry,
    } = this.state;
    return (
      <div className="entry">
        <span>
          <div className="entry-title">
            {title} <br />
          </div>
          <div className="entry-description">
            {description} <br />
          </div>
        </span>

        {images.map((img) => (
          <img key={nanoid()} src={img} alt="info" />
        ))}
        <div className="tag-list">
          {Array.from(tagList).map((tag) => (
            <button type="button" className="tag-button" key={nanoid()}>
              {tag}
            </button>
          ))}
        </div>

        <div className="entry-footer">
          <button
            type="button"
            onClick={() => handleEditEntry(id)}
            className="edit"
          >
            <FontAwesomeIcon icon="pen-to-square" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteEntry(id)}
            className="delete"
          >
            <FontAwesomeIcon icon="trash-can" />
          </button>
        </div>
      </div>
    );
  }
}
// TODO: VERIFY THESE PROP TYPES!!!!!
Entry.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired, // somehow string applies to images?
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  // date: PropTypes.instanceOf(Date),
  handleDeleteEntry: PropTypes.func.isRequired,
  handleEditEntry: PropTypes.func.isRequired,
};
// Entry.defaultProps = {
//   date: new Date(),
// };

export default Entry;
