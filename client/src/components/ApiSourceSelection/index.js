import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_APIS } from '../../utils/mutations';

import { QUERY_USER_PREFERENCES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

// import { Select, Space } from 'antd';
import { Select, Space, Form, Button, Card } from 'antd';

const ApiSourceSelection = () => {
  const { loading, error, data: preferencesData } = useQuery(QUERY_USER_PREFERENCES);

  const userPreferences = preferencesData?.userPreferences;

  const [quoteApi, setQuoteApi] = useState(null);
  const [videoApi, setVideoApi] = useState(null);
  const [pictureApi, setPictureApi] = useState(null);

  useEffect(() => {
    if (userPreferences) {
      setQuoteApi(userPreferences.quoteApi || 'QUOTE_TOPIC1');
      setVideoApi(userPreferences.videoApi || 'YOUTUBE_TOPIC1');
      setPictureApi(userPreferences.pictureApi || 'UNSPLASH_TOPIC1');
    }
  }, [userPreferences]);

  const [updateApis] = useMutation(UPDATE_APIS, {
    refetchQueries: [{ query: QUERY_USER_PREFERENCES }],
  });

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     await updateApis({ variables: { quoteApi, videoApi, pictureApi } });
  //   } catch (error) {
  //     console.error('Error updating API sources:', error);
  //   }
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!quoteApi || !videoApi || !pictureApi) return null;

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const onFinish = async (values) => {
    try {
      await updateApis({ variables: { quoteApi, videoApi, pictureApi } });
    } catch (error) {
      console.error('Error updating API sources:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label htmlFor="quoteApi">Quote API:</label>
    //   <select
    //     id="quoteApi"
    //     value={quoteApi}
    //     onChange={(event) => setQuoteApi(event.target.value)}
    //   >
    //     <option value="QUOTE_TOPIC1">Art</option>
    //     <option value="QUOTE_TOPIC2">Inspirational</option>
    //     <option value="QUOTE_TOPIC3">Love</option>
    //   </select>

    //   <label htmlFor="videoApi">Video API:</label>
    //   <select
    //     id="videoApi"
    //     value={videoApi}
    //     onChange={(event) => setVideoApi(event.target.value)}
    //   >
    //     <option value="YOUTUBE_TOPIC1">Travel & Event</option>
    //     <option value="YOUTUBE_TOPIC2">Animals & Pets</option>
    //     <option value="YOUTUBE_TOPIC3">Science & Technology</option>
    //   </select>

    //   <label htmlFor="pictureApi">Picture API:</label>
    //   <select
    //     id="pictureApi"
    //     value={pictureApi}
    //     onChange={(event) => setPictureApi(event.target.value)}
    //   >
    //     <option value="UNSPLASH_TOPIC1">Wallpapers</option>
    //     <option value="UNSPLASH_TOPIC2">Animals</option>
    //     <option value="UNSPLASH_TOPIC3">Textures & Patterns</option>
    //   </select>

    //   <button type="submit">Update API Sources</button>
    // </form>

    <div className="container">
      <div className="flex-row justify-center">
        <div className="col-md-6">
          <Card className="mt-5 flex-column" style={{ fontSize: '1.2rem' }} >
            <Form {...layout} size="large" name="api_source_selection" onFinish={onFinish} onFinishFailed={onFinishFailed} >
              <Form.Item label="Quote API:" name="quoteApi">
                <Select
                  value={quoteApi}
                  onChange={(value) => setQuoteApi(value)}
                  defaultValue={quoteApi}
                  options={[
                    { value: 'QUOTE_TOPIC1', label: 'Art' },
                    { value: 'QUOTE_TOPIC2', label: 'Inspirational' },
                    { value: 'QUOTE_TOPIC3', label: 'Love' },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Video API:" name="videoApi">
                <Select 
                  value={videoApi}
                  onChange={(value) => setVideoApi(value)}
                  defaultValue={videoApi}
                  options={[
                    { value: 'YOUTUBE_TOPIC1', label: 'Travel & Event' },
                    { value: 'YOUTUBE_TOPIC2', label: 'Animals & Pets' },
                    { value: 'YOUTUBE_TOPIC3', label: 'Science & Technology' },
                  ]}
                />
              </Form.Item>

              <Form.Item label="Picture API:" name="pictureApi">
                <Select
                  value={pictureApi}
                  onChange={(value) => setPictureApi(value)}
                  defaultValue={pictureApi}
                  options={[
                    { value: 'UNSPLASH_TOPIC1', label: 'Wallpapers' },
                    { value: 'UNSPLASH_TOPIC2', label: 'Animals' },
                    { value: 'UNSPLASH_TOPIC3', label: 'Textures & Patterns' },
                  ]}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Update API Sources
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiSourceSelection;
