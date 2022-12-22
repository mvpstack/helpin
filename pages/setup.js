import { Button, Text } from '@geist-ui/core';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Formik } from 'formik';
import Link from 'next/link';
import Layout from '../components/layout';

import { HiOutlineFolderPlus } from 'react-icons/hi';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { randomString } from '../config/functions';

const Websites = ({ websites }) => {
      const session = useSession();
      const router = useRouter();
      const [errorMessage, setErrorMessage] = useState('');
      const supabase = useSupabaseClient();
      const [avatarUrl, setAvatarUrl] = useState(null);
      const [uploading, setUploading] = useState(false);

      return (
            <div className="dashboard">
                  <Layout
                        title="Helpin — A customer support ticketing software"
                        websites={websites}
                  >
                        <div className="create-form form-dev">
                              <Text h3 style={{ margin: 0 }}>
                                    Setup Support System
                              </Text>
                              <Text type="secondary" small>
                                    Just put your website information and start
                              </Text>
                              <br />
                              <br />
                              <Formik
                                    initialValues={{
                                          name: '',
                                          url: '',
                                          handle: '',
                                    }}
                                    validate={(values) => {
                                          const errors = {};
                                          if (!values.name) {
                                                errors.name = 'Required';
                                          }
                                          if (!values.url) {
                                                errors.url = 'Required';
                                          } else if (
                                                !/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                                                      values.url
                                                )
                                          ) {
                                                errors.url =
                                                      'Invalid website url address';
                                          }
                                          return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                          setErrorMessage('');
                                          setTimeout(async () => {
                                                let { origin } = new URL(
                                                      values.url
                                                );
                                                values.url = origin;
                                                values.wid = randomString(
                                                      16,
                                                      'aA#'
                                                );
                                                values.ownerId =
                                                      session?.user.id;
                                                const {
                                                      data: newWebsite,
                                                      error,
                                                } = await supabase
                                                      .from('websites')
                                                      .upsert(values)
                                                      .select();
                                                setSubmitting(false);

                                                if (error) {
                                                      setErrorMessage(
                                                            error.message
                                                      );
                                                } else {
                                                      router.push(
                                                            `/dashboard/${newWebsite.wid}`
                                                      );
                                                }
                                          }, 400);
                                    }}
                              >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          isSubmitting,
                                          /* and other goodies */
                                    }) => (
                                          <form onSubmit={handleSubmit}>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.name}
                                                      color="#eee"
                                                      placeholder="Website Name"
                                                />
                                                <Text small type="secondary">
                                                      {errors.name &&
                                                            touched.name &&
                                                            errors.name}
                                                </Text>
                                                <input
                                                      type="text"
                                                      name="url"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.url}
                                                      color="#eee"
                                                      placeholder="Website URL"
                                                />
                                                <Text small type="secondary">
                                                      {errors.url &&
                                                            touched.url &&
                                                            errors.url}
                                                </Text>
                                                <input
                                                      type="text"
                                                      name="handle"
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                      value={values.handle}
                                                      color="#eee"
                                                      placeholder="Handle"
                                                />
                                                <Text small type="secondary">
                                                      {errors.handle &&
                                                            touched.handle &&
                                                            errors.handle}
                                                </Text>

                                                <Button
                                                      htmlType="submit"
                                                      loading={isSubmitting}
                                                      disabled={isSubmitting}
                                                      type="secondary"
                                                      scale={2 / 3}
                                                >
                                                      Create
                                                </Button>
                                                <br />
                                                <br />
                                                <Text small type="secondary">
                                                      {errorMessage}
                                                </Text>
                                          </form>
                                    )}
                              </Formik>
                        </div>
                  </Layout>
            </div>
      );
};

export default Websites;
