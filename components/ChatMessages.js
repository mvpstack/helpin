import { Text } from '@geist-ui/core';
import moment from 'moment';
import Image from 'next/image';
import { Document, Page, pdfjs } from 'react-pdf';
import { HiDocuText } from '../config/icons';
import { GrDocumentCsv } from 'react-icons/gr';
import { contentTypeCheck } from '../config/functions';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ChatMessages = ({ messagesList, publicChat }) => {
      return (
            <div>
                  {messagesList.map((m, key) => (
                        <div
                              className={
                                    publicChat
                                          ? m.userType === 'customer'
                                                ? 'message-card push-message-right'
                                                : 'message-card'
                                          : m.userType === 'customer'
                                          ? 'message-card '
                                          : 'message-card push-message-right'
                              }
                              key={key}
                        >
                              <div className="message-line">
                                    {m.type === 'text' && (
                                          <div className="message">
                                                <Text mb={0} mt={0}>
                                                      {m.message}
                                                </Text>
                                          </div>
                                    )}
                                    {contentTypeCheck(m.type) === 'image' && (
                                          <div className="image">
                                                <Image
                                                      alt={m.message}
                                                      src={`https://cstvtjojcqfjvuiwcijp.supabase.co/storage/v1/object/public/assets/${m.filePath}`}
                                                      width={283}
                                                      height={64}
                                                      layout="responsive"
                                                />
                                                <div className="image-alt">
                                                      <Text
                                                            small
                                                            type="secondary"
                                                      >
                                                            {m.message}
                                                      </Text>
                                                </div>
                                          </div>
                                    )}
                                    {contentTypeCheck(m.type) === 'doc' && (
                                          <div className="message pdf-message">
                                                <div className="chat-attach">
                                                      <HiDocuText />
                                                      <span>{m.message}</span>
                                                      {/* <Document
                                                      file={`https://cstvtjojcqfjvuiwcijp.supabase.co/storage/v1/object/public/assets/${m.filePath}`}
                                                      width="100%"
                                                >
                                                      <Page pageNumber={1} />
                                                </Document> */}
                                                </div>
                                          </div>
                                    )}
                                    {contentTypeCheck(m.type) === 'text' && (
                                          <div className="message pdf-message">
                                                <div className="chat-attach">
                                                      <GrDocumentCsv />
                                                      <span>{m.message}</span>
                                                </div>
                                          </div>
                                    )}
                                    <br />
                                    <Text
                                          style={{ fontSize: 10 }}
                                          small
                                          type="secondary"
                                    >
                                          {moment(m.created_at).calendar()}
                                    </Text>
                              </div>
                        </div>
                  ))}
            </div>
      );
};

export default ChatMessages;
