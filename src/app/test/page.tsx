
"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getData } from '@/services/test';

const TestPage = () => {


  const { data, isLoading, isError } = useQuery({
    queryFn: getData,
    queryKey: ["movies"], //Array according to Documentation
  });

  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <div>Sorry There was an Error</div>;
  return <div>{JSON.stringify(data)}</div>;
}

export default TestPage