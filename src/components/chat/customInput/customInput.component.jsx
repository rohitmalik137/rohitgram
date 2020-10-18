import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import './customInput.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, getMessages } from '../../../redux/actions/chat.actions';
import { useParams } from 'react-router-dom';

const CustomInput = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const [showEmojis, setShowEmojis] = useState(false);
  const [inputText, setInputText] = useState('');
  const authUser = useSelector((state) => state.auth.user);
  const authUsername = authUser ? authUser.username : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ chatId, user: authUsername, message: inputText }));
    dispatch(getMessages({ chatId }));
    setShowEmojis(false);
    setInputText('');
  };

  const showEmojiPicker = (e) => {
    setShowEmojis(!showEmojis);
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setInputText(inputText + emoji);
  };
  return (
    <>
      {showEmojis ? (
        <span className="emoji-bar">
          <Picker className="emoji-bar" onSelect={(event) => addEmoji(event)} />
        </span>
      ) : null}
      <form className="form">
        <i
          className="fa fa-smile-o fa-2x emoji-icon"
          onClick={showEmojiPicker}
          aria-hidden="true"
        ></i>
        <input
          className="input overall"
          type="text"
          placeholder="type a message..."
          onChange={(event) => {
            setInputText(event.target.value);
          }}
          value={inputText}
          onKeyPress={(event) =>
            event.key === 'Enter' ? handleSubmit(event) : null
          }
        />
        <button className="send" onClick={(event) => handleSubmit(event)}>
          Send
        </button>
      </form>
    </>
  );
};

export default CustomInput;
