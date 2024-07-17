import React from 'react';
import './CourseSettings.scss';

type Props = {
  _id: string;
  isDeleted: boolean | undefined;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const CourseSettings = (props: Props) => {
  return (
    <div>
      <div className='course-settings__item'>
        <a data-action='delete' className='' href='#'>
          Copy Course URL
        </a>
      </div>
      <div className='course-settings__item'>
        <a data-action='delete' className='' href='#'>
          Copy Course Id
        </a>
      </div>
      <div className='course-settings__item'>
        <a data-action='delete' className='' href='#'>
          Clone Course
        </a>
      </div>
      <div className='course-settings__item'>
        <a data-action='delete' onClick={props.onClick} className='' href='#'>
          {props.isDeleted ? 'Activate Course' : 'Deactivate Course'}
        </a>
      </div>
    </div>
  );
};

export default CourseSettings;
