import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./index.scss";

const DOWN_ARROW_KEY_CODE = 40;
const UP_ARROW_KEY_CODE = 38;
const ESCAPE_KEY_CODE = 27;
const SPACEBAR_KEY_CODE = 32;
const ENTER_KEY_CODE = 13;
const TAB_KEY_CODE = 9;

const SelectBox = ({ label, options, selected = 0 }) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  const [hiddenListBox, setHiddenListBox] = useState(true);
  const selectBoxEl = useRef(null);

  const outsideHandleClick = e => {
    if (selectBoxEl.current && !selectBoxEl.current.contains(e.target)) {
      setHiddenListBox(true);
    }
  };

  const wrapperHandleKeyDown = e => {
    e.keyCode === TAB_KEY_CODE && setHiddenListBox(true);
    e.keyCode === ESCAPE_KEY_CODE && setHiddenListBox(true);
  };

  const buttonHandleOnKeyDown = e => {
    switch (e.keyCode) {
      case UP_ARROW_KEY_CODE:
        e.preventDefault();
        setHiddenListBox(false);
        setTimeout(() => {
          const prevOptionId = (selectedOption + options.length - 1) % options.length
          document.getElementById(`select__list-option-id-${prevOptionId}`).focus()
        }, 0);
        return;

      case DOWN_ARROW_KEY_CODE:
        e.preventDefault();
        setHiddenListBox(false);
        setTimeout(() => {
          const nextOptionId = (selectedOption + 1) % options.length
          document.getElementById(`select__list-option-id-${nextOptionId}`).focus()
        }, 0);
        return;

      case SPACEBAR_KEY_CODE:
      case ENTER_KEY_CODE:
        e.preventDefault();
        setHiddenListBox(!hiddenListBox);
        return;

      default:
        return;
    }
  };

  const buttonHandleOnClick = e => setHiddenListBox(!hiddenListBox);

  const optionHandleKeyDown = e => {
    switch (e.keyCode) {
      case DOWN_ARROW_KEY_CODE:
        e.preventDefault();
        const next = document.getElementById(e.currentTarget.id).nextSibling;
        if (next) next.focus();
        else document.getElementById("select__list-id").firstChild.focus();
        return;

      case UP_ARROW_KEY_CODE:
        e.preventDefault();
        const prev = document.getElementById(e.currentTarget.id).previousSibling;
        if (prev) prev.focus();
        else document.getElementById("select__list-id").lastChild.focus();
        return;

      case ESCAPE_KEY_CODE:
        e.preventDefault();
        setHiddenListBox(true);
        document.getElementById("select__button-id").focus();
        return;

      case SPACEBAR_KEY_CODE:
      case ENTER_KEY_CODE:
        e.preventDefault();
        setHiddenListBox(true);
        setSelectedOption(e.currentTarget.getAttribute("data-index"));
        document.getElementById("select__button-id").focus();
        return;

      default:
        return;
    }
  };

  const optionHandleMouseOver = e => document.getElementById(e.currentTarget.id).focus();

  const optionHandleOnClick = e => {
    setSelectedOption(e.currentTarget.getAttribute('data-index'));
    setHiddenListBox(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", outsideHandleClick);

    return () => {
      document.removeEventListener("mousedown", outsideHandleClick);
    };
  });

  const renderLabel = (
    <p id="select__label-id" className="select__label">
      {label}
    </p>
  );

  const renderOptions = options.map((elem, i) => (
    <li
      tabIndex="-1"
      key={i}
      data-index={i}
      id={`select__list-option-id-${i}`}
      className="select__list-option"
      role="option"
      aria-selected={selectedOption === i}
      aria-labelledby={`select__list-option-id-${i}-label`}
      style={{ color: elem.color }}
      onClick={optionHandleOnClick}
      onKeyDown={optionHandleKeyDown}
      onMouseOver={optionHandleMouseOver}
    >
      <span id={`select__list-option-id-${i}-label`}>{elem.name}</span>
    </li>
  ));

  return (
    <div className="select select__wrapper" onKeyDown={wrapperHandleKeyDown}>
      {label && renderLabel}
      <div className="select__box" ref={selectBoxEl}>
        <button
          onClick={buttonHandleOnClick}
          id="select__button-id"
          className="select__button"
          aria-haspopup="listbox"
          aria-labelledby="select__label-id select__button-text-id"
          aria-expanded={!hiddenListBox}
          style={{ color: options[selectedOption].color }}
          onKeyDown={buttonHandleOnKeyDown}
        >
          <span id="select__button-text-id">
            {options[selectedOption].name}
          </span>
        </button>

        <ul
          id="select__list-id"
          className={classNames("select__list", { hidden: hiddenListBox })}
          role="listbox"
          tabIndex={hiddenListBox ? "-1" : "0"}
          aria-labelledby="select__label-id"
          {...!hiddenListBox && {
            "aria-activedescendant": `select__list-option-id-${selectedOption}`
          }}
        >
          {renderOptions}
        </ul>
      </div>
    </div>
  );
};

SelectBox.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SelectBox;
