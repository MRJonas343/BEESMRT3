import { useState } from "react"
import { useForm } from "react-hook-form"

//* Components
import NavBar from '@components/NavBar'
import BasicModal from "@components/BasicModal"

//* Assets
import HelloBee from '@assets/abeja-saludando.webp'
import AngryBee from '@assets/angryBee.webp'
import ShyBee from '@assets/abeja-shy.webp'

const Contact: React.FC = () => {

  //*States
  const [imageSrc, setImageSrc] = useState("")
  const [message, setMessage] = useState("")
  const [mainMessage, setMainMessage] = useState("")
  const [showModal, setShowModal] = useState(false)

  //* Form (React Hook Form)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()

  //* Function to send the form
  async function getForm(data: object) {
    try {
      const BeeSMRTBackendURL = import.meta.env.VITE_BEESMRT_BACKEND_URL
      const response = await fetch(BeeSMRTBackendURL + '/contactMessage', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.status === 200) {
        setImageSrc(ShyBee)
        setMessage("Thank you for contacting us! We will get back to you as soon as possible.")
        setMainMessage("Message sent")
        setShowModal(!showModal)
      } else {
        setImageSrc(AngryBee)
        setMessage("An error has occurred, try again later.")
        setMainMessage("Error")
        setShowModal(!showModal)
      }

    } catch (error) {
      console.error("Error:", error)
    }
    reset()
  }

  return (
    <main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
      <NavBar />

      <section>
        <div className="w-11/12 mx-auto px-5 py-4 my-2 rounded-lg bg-white/90 flex flex-col md:flex-row md:pr-2 md:py-24 md:mx-auto shadow-2xl">
          <div className="md:w-2/5 w-full md:flex items-center md:flex-col text-center pr-5">
            <h1 className="text-center text-3xl lg:text-5xl sm:text-4xl font-Principal title-font mb-4">Contact Us</h1>
            <p className="font-Secundaria leading-relaxed text-base md:text-xl">
              We're here to assist you! If you have any questions or need assistance, please feel free to reach out to
              us.
            </p>
            <p className="font-Secundaria leading-relaxed text-lg md:text-xl text-gray-900 mt-3 lg:mt-8">
              Connect with us on social media:
            </p>
            <span className="inline-flex mb-4 mt-4 lg:mt-6 justify-center sm:justify-start">
              <a className="text-gray-500 hover:text-gray-900" target="_blank" href="https://twitter.com/example">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                  </path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-gray-900" href="https://www.instagram.com/example/"
                target="_blank">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </span>
            <img src={HelloBee} className="w-36 hidden md:block" />
          </div>
          <div className="md:w-3/5 w-full md:pl-20">
            <h1 className="text-center font-Principal text-2xl lg:text-5xl text-gray-800 sm:text-4xl mb-2 mt-2">Contact Form</h1>
            <form onSubmit={handleSubmit(getForm)}>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="name" className="font-Principal leading-7 py-4 text-lg md:text-xl text-gray-900">Your Name</label>
                  <input id="name" type="text" className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out "
                    {...register("name", {
                      required: true,
                      minLength: 5,
                      maxLength: 50,
                      pattern: /^[A-Za-z]+$/i
                    })} />
                  {
                    errors.name?.type === "required" &&
                    <p className="text-red-600">This field is required</p>
                  }
                  {
                    errors.name?.type === "minLength" &&
                    <p className="text-red-600">Your name should have 5 letters at least</p>
                  }
                  {
                    errors.name?.type === "maxLength" &&
                    <p className="text-red-600">Your name can't be longer that 50 letters</p>
                  }
                  {
                    errors.name?.type === "pattern" &&
                    <p className="text-red-600">Your name should just have letters</p>
                  }
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="email" className="font-Principal text:lg md:text-xl leading-7 py-4 text-gray-900">Your Email</label>
                  <input type="text" id="email" className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
                    })} />
                  {
                    errors.email?.type === "required" &&
                    <p className="text-red-600">This field is required</p>
                  }
                  {
                    errors.email?.type === "pattern" &&
                    <p className="text-red-600">This email is not valid</p>
                  }
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="message" className="text-base font-Principal leading-7 py-4 md:text-xl text-gray-900">Type your message</label>
                  <textarea id="message" className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out "
                    {...register("message", {
                      required: true,
                      minLength: 20,
                      maxLength: 500,
                    })} />
                  {
                    errors.message?.type === "required" &&
                    <p className="text-red-600">This field is required</p>
                  }
                  {
                    errors.message?.type === "minLength" &&
                    <p className="text-red-600">Your message should have 20 letters at least</p>
                  }
                  {
                    errors.message?.type === "maxLength" &&
                    <p className="text-red-600">Your nickname can't be longer that 500 letters</p>
                  }
                </div>
              </div>
              <div className="p-2 w-full">
                <button type="submit" className="font-Principal text-white bg-Pink2 border-0 py-2 px-4 focus:outline-none hover:bg-Pink1 rounded text-xl md:text-2xl shadow-lg mx-0 flex-col text-center">Send Message ✉</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <BasicModal imageSrc={imageSrc} mainMessage={mainMessage} message={message} showModal={showModal} closeModal={() => setShowModal(!showModal)} />
    </main>
  )
}

export default Contact