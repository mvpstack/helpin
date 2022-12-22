import React, { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { randomString } from '../config/functions';
import { Loading } from '@geist-ui/core';
import slugify from 'slugify';

export default function UploadAvatar({ uid, url, size, onUpload }) {
      const supabase = useSupabaseClient();
      const [avatarUrl, setAvatarUrl] = useState(null);
      const [uploading, setUploading] = useState(false);

      const uploadAvatar = async (event) => {
            try {
                  setUploading(true);

                  if (!event.target.files || event.target.files.length === 0) {
                        throw new Error('You must select an image to upload.');
                  }

                  const file = event.target.files[0];
                  const fileSlugName = slugify(file.name, {
                        remove: /[*+~.()'"!:@]/g,
                  });

                  const fileExt = file.name.split('.').pop();
                  const fileName = `assets/${uid}/${fileSlugName}-${randomString(
                        8,
                        'aA#'
                  )}.${fileExt}`;
                  const filePath = `${fileName}`;

                  let { data, error: uploadError } = await supabase.storage
                        .from('assets')
                        .upload(filePath, file, { upsert: true });

                  if (uploadError) {
                        throw uploadError;
                  }

                  setUploading(false);
                  event.target.value = null;
                  onUpload(data.path, file);
            } catch (error) {
                  setUploading(false);
                  console.log('Error uploading avatar!');
                  event.target.value = null;
            } finally {
                  setUploading(false);
            }
      };

      return (
            <div>
                  <div style={{ width: size }}>
                        <label
                              className="button primary block"
                              htmlFor="single"
                        >
                              {uploading ? (
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6 rotating"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                                          />
                                    </svg>
                              ) : (
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                          />
                                    </svg>
                              )}
                        </label>
                        <input
                              style={{
                                    visibility: 'hidden',
                                    position: 'absolute',
                              }}
                              type="file"
                              id="single"
                              accept="image/*, application/pdf, .csv"
                              onChange={uploadAvatar}
                              disabled={uploading}
                        />
                  </div>
            </div>
      );
}
