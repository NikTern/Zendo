import React, { useState, useEffect } from 'react';
import { SaveTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { SAVE_PICTURE, SAVE_QUOTE, SAVE_VIDEO, REMOVE_PICTURE, REMOVE_QUOTE, REMOVE_VIDEO } from '../../utils/mutations';

const SaveButton = ({ type, data, savedItems }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [addPicture] = useMutation(SAVE_PICTURE);
  const [addQuote] = useMutation(SAVE_QUOTE);
  const [addVideo] = useMutation(SAVE_VIDEO);
  const [removePicture] = useMutation(REMOVE_PICTURE);
  const [removeQuote] = useMutation(REMOVE_QUOTE);
  const [removeVideo] = useMutation(REMOVE_VIDEO);

  useEffect(() => {
    // Check if the item is already saved
    const checkSavedStatus = () => {
      switch (type) {
        case 'picture':
          setIsSaved(savedItems.some((item) => item.url === data.url));
          break;
        case 'quote':
          setIsSaved(savedItems.some((item) => item.quote === data.quote));
          break;
        case 'video':
          setIsSaved(savedItems.some((item) => item.videoId === data.id.videoId));
          break;
        default:
          break;
      }
    };

    checkSavedStatus();
  }, [type, data, savedItems]);

  const handleSave = async () => {
    try {
      switch (type) {
        case 'picture':
          await addPicture({ variables: { url: data.urls.regular, alt: data.alt_description } });
          break;
        case 'quote':
          await addQuote({ variables: { quote: data.quote, author: data.author } });
          break;
        case 'video':
          await addVideo({ variables: { videoId: data.id.videoId, title: data.snippet.title } });
          break;
        default:
          break;
      }
      setIsSaved(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      switch (type) {
        case 'picture':
          await removePicture({ variables: { url: data.urls.regular } });
          break;
        case 'quote':
          await removeQuote({ variables: { quote: data.quote } });
          break;
        case 'video':
          await removeVideo({ variables: { videoId: data.id.videoId } });
          break;
        default:
          break;
      }
      setIsSaved(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isSaved ? (
        <DeleteTwoTone onClick={handleDelete} style={{ fontSize: '3em' }}/>
      ) : (
        <SaveTwoTone onClick={handleSave} style={{ fontSize: '3em' }} />
      )}
    </div>
  );
};

export default SaveButton;
