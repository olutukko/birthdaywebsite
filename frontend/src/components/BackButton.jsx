import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)}>Back to Invitation</button>
  );
};

export default BackButton;