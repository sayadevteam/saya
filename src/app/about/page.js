import React from 'react';

const Page = () => {
  return (
    <div
      className="w-full h-full min-h-screen px-8 py-24 bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[5vw] font-normal tracking-[-0.04em]">
        About{" "}
        <sup className="relative -top-5 left-2 text-[1.5vw] tracking-normal md:text-[4vw] md:top-[-1rem]">
          (01)
        </sup>
      </h1>
    </div>
  );
};

export default Page;
