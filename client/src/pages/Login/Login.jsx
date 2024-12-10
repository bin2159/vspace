import ImageSeaction from './ImageSection'
import LoginLayout from './LoginLayout'
export default function Login () {
  return (
    <>
      <div className='flex min-h-full flex-1 h-screen'>
        {/* <!-- Left Section (LoginLayout) --> */}
        <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <LoginLayout />
        </div>

        {/* <!-- Right Section (Image Section) --> */}
          <ImageSeaction/>
      </div>
    </>
  )
}
