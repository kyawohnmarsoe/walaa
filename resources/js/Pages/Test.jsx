import Pagination from '@/Components/DaisyUI/Pagination';
import React from 'react';

export default function Text() {
  const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
  { id: 4, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 5, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 6, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
  { id: 7, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 8, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 9, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
   { id: 10, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
   { id: 11, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 12, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 13, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
   { id: 14, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 15, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 16, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
   { id: 17, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 18, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 19, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]
  return (
    <div>
     <PaginatedItems itemsPerPage={4} />
    </div>
  );
}


