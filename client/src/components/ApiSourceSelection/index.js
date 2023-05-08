import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_APIS } from '../../utils/mutations';

import { QUERY_USER_PREFERENCES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

import { Select, Space, Form, Button, Card } from 'antd';

import styles from './ApiSourceSelection.module.css';


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
    <div className="container">
      <div className="flex-row justify-center">
        <div className="col-12 col-md-7 col-lg-9">
          <Card className="mt-5 flex-column" style={{ fontSize: '1.2rem' }} >
            <Form {...layout} size="large" name="api_source_selection" onFinish={onFinish} onFinishFailed={onFinishFailed} >

              <Form.Item label="Picture:" name="pictureApi">
                <div className={styles.selectWidth}>
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
                </div>
              </Form.Item>

              <Form.Item label="Quote:" name="quoteApi">
                <div className={styles.selectWidth}>
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
                </div>
              </Form.Item>

              <Form.Item label="Video:" name="videoApi">
                <div className={styles.selectWidth}>
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
                </div>
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                <div style={{ display: 'flex', justifyContent: 'center' }} className={styles.selectWidth}>
                  <Button type="primary" htmlType="submit">
                    Update Feed
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ApiSourceSelection;
