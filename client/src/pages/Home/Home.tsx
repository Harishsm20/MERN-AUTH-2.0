import Logout from "../Auth/Logout/Logout";

const Home = () => {
  return (
    <>
      <div className='flex flex-col min-h-screen bg-gradient-to-r from-[#5aaf93] to-[#2f5c6c]'>
        <div className='flex-1 p-6'>
          <h1 className='text-4xl font-bold text-white mb-4'>Welcome to the JWT Authentication Course</h1>
          <p className='text-lg text-white mb-6'>
            JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way
            for securely transmitting information between parties as a JSON object. This information can be
            verified and trusted because it is digitally signed.
          </p>
          <p className='text-lg text-white mb-6'>
            In this course, we will dive into the world of JWTs, learning how they are used for authentication
            and authorization in modern web applications. You’ll learn how to create, sign, and validate tokens,
            and understand their role in securing APIs.
          </p>
          <p className='text-lg text-white mb-6'>
            By the end of this course, you’ll be equipped to implement secure JWT authentication in your
            applications, enabling users to authenticate seamlessly while ensuring their data is protected.
          </p>
        </div>
        
        {/* Logout button at the bottom */}
        <div className="p-6">
          <Logout />
        </div>
      </div>
    </>
  );
}

export default Home;
