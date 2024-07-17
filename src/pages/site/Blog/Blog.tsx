/* eslint-disable @typescript-eslint/no-floating-promises */
import { BookOutlined, CommentOutlined, EllipsisOutlined, HeartOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Row, Skeleton, message } from 'antd';
import BlogDetail from './components/BlogDetail';
import { useGetBlogByIdQuery, useGetBlogCommentsQuery } from '../client.service';
import { useParams } from 'react-router-dom';
import SlidingModal from './components/SidingModal/SlidingModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { sanitizeAndReturnHtml } from '../../../utils/functions';

export default function Blog() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetBlogByIdQuery(id || 'default-id');
  const [isModalOpen, setModalOpen] = useState(false);
  const loading = !data?.blog;
  const { data: DataCommentBlogs, error, isLoading } = useGetBlogCommentsQuery(id || 'default-id');
  const commentCount = DataCommentBlogs ? DataCommentBlogs.comments.length : 0;
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <div className='mt-40'>
      <div className='mt-10 mb-8'>
        <div className='container mx-auto px-4 py-96'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} className='max-h-full relative'>
              <Card>
                <div className='flex'>
                  <div className='flex mb-4 flex-col mr-12'>
                    <div>
                      <div className='inline text-3xl'>{data?.blog.userId?.name}</div>
                      <hr className='my-3' />
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} className='max-h-full'>
              <Card>
                <div className='flex mb-4 flex-col mr-4'>
                  <div className='ml-12'>
                    <div className='blog_user'>
                      <div className='blog_Avatar flex justify-between'>
                        <div className='blog_Avatar-user'>
                          <Avatar src={data?.blog.blogImg} className='w-16 h-16' />
                          <div className='inline ml-3 text-3xl'>{data?.blog.userId?.name}</div>
                        </div>
                        {/* <div className='blog_Avatar-icon'>
                          <div className='bookOutLine inline mr-4'>
                            <BookOutlined className='text-3xl hover:opacity-60 cursor-pointer' />
                          </div>
                          <div className='ellipsisOutlined inline'>
                            <EllipsisOutlined className='text-3xl hover:opacity-60 cursor-pointer' />
                          </div>
                        </div> */}
                      </div>
                    </div>
                    {/* Blog_Detail */}
                    <div className='blog_Detail'>
                      <div className='blog_Detail-content'>
                        {loading ? (
                          <Skeleton active />
                        ) : (
                          <BlogDetail title={data?.blog.title} content={data?.blog.content} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className='mt-6'>
                <SlidingModal blogId={id || 'default-id'} isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
