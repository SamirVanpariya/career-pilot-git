import React from "react";

const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-white">Job Detail Page</h1>
      <p className="text-white">Job ID: {id}</p>
    </div>
  );
};

export default JobDetailPage;
