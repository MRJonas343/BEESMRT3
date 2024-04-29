import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { FacebookLoginButton, GithubLoginButton } from "react-social-login-buttons"
// @ts-ignore
import { LoginSocialFacebook } from 'reactjs-social-login'

//* Componentes
import NavBar from '@components/NavBar'
import HelloBee from '@assets/beeLogin.webp'
import BasicModal from '@components/BasicModal'

//* Assets
import angryBee from '@assets/angryBee.webp'
import newBee from '@assets/abeja-saludando.webp'

const LogIn: React.FC = () => {

    //*Checamos si ya esta logeado
    useEffect(() => {
        if (localStorage.getItem("TokenBeesmrt")) {
            navigate("/myaccount")
        } else if (localStorage.getItem("TokenFacebook")) {
            navigate("/myaccount")
        } else if (localStorage.getItem("accessToken")) {
            navigate("/myaccount")
        }
    }, [])

    //*Mensajitos para la modal
    const [imageSrc, setImageSrc] = useState("")
    const [message, setMessage] = useState("")
    const [mainMessage, setMainMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    //*Navegación
    const navigate = useNavigate()

    //*Form Login
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    async function getForm(data: object) {
        console.log(data)
        try {
            const response = await fetch("https://beesmrt-backend-vercel.vercel.app/loginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.token;

                //* Guardar el token en el local storage u otro lugar según sea necesario
                localStorage.setItem('TokenBeesmrt', token);

                navigate("/MyAccount");
            } else if (response.status === 404) {
                setImageSrc(newBee)
                setMessage("This user does not exist, create an account and join the BeeTeam now!")
                setMainMessage("User not found")
                setShowModal(!showModal)
            } else if (response.status === 401) {
                setImageSrc(angryBee)
                setMessage("The password is incorrect, try again. Aren't you a hacker, right?")
                setMainMessage("Incorrect password")
                setShowModal(!showModal)
            }

        } catch (error) {
            console.log("Error:", error)
        }
        reset()
    }


    //* Facebook Login
    async function handleLoginFacebook(data: object) {
        try {
            const response = await fetch("https://beesmrt-backend-vercel.vercel.app/registerUserFacebook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // Verificar si la respuesta es exitosa (status code 200)
            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.token;

                //* Guardar el token en el local storage u otro lugar según sea necesario
                localStorage.setItem('TokenFacebook', token);

                navigate("/MyAccount");
            } else {
                console.log("Error en la respuesta del servidor:")
            }
        } catch (error) {
            console.log("Error:", error)
        }
    }


    //*Github Login
    const CLINET_ID_GITHUB = "d985da0f6f9380b24283"

    function loginWithGithub() {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLINET_ID_GITHUB)
    }


    return (
        <main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
            <NavBar />
            <div className="bg-white/90 rounded-lg mx-7 p-7 mt-8 text-center shadow-2xl lg:flex lg:justify-around lg:h-4/5">
                <div className="flex justify-center items-center flex-col lg:w-2/6 lg:justify-center lg:h-full">
                    <img src={HelloBee} className="w-36 flex lg:w-3/5" />
                </div>
                <div className="lg:w-3/6 lg:flex lg:flex-col lg:justify-center">
                    <form onSubmit={handleSubmit(getForm)}>
                        <div className="text-left font-Principal text:lg md:text-xl leading-7 py-2 text-gray-900">
                            Email: <br />
                            <input placeholder="beesmrt@example.com" type="text" className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out" autoComplete="email"
                                {...register("email", {
                                    required: true,
                                    pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i
                                })} />
                            {
                                errors.email?.type === "required" &&
                                <p className="text-red-600 font-Secundaria">This field is required</p>
                            }
                            {
                                errors.email?.type === "pattern" &&
                                <p className="text-red-600 font-Secundaria">This email is not valid</p>
                            }
                        </div>
                        <div className="text-left font-Principal text:lg md:text-xl leading-7 pb-4 text-gray-900">
                            Password:<br />
                            <input placeholder="Happ&BEE1" type="password" className="w-full font-Secundaria bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out" autoComplete="current-password"
                                {...register("password", {
                                    required: true,
                                    minLength: 8
                                })} />
                            {
                                errors.password?.type === "required" &&
                                <p className="text-red-600 font-Secundaria">This field is required</p>
                            }
                            {
                                errors.password?.type === "minLength" &&
                                <p className="text-red-600 font-Secundaria">This password is not valid</p>
                            }
                        </div>
                        <div className="py-2 px-1 w-full">
                            <button className="font-Principal text-white bg-Pink2 py-2 w-full focus:outline-none hover:bg-Pink1 rounded text-xl shadow-lg">LOG IN</button>
                        </div>
                    </form>
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                        <p className="mx-4 font-Secundaria mb-0 text-center"> OR </p>
                    </div>
                    <div>
                        <LoginSocialFacebook
                            appId='1563554197766018'
                            onResolve={handleLoginFacebook}
                            onReject={(error: string) => console.log(error)}
                        >
                            <FacebookLoginButton
                                className="font-Principal text-white tracking-wide"
                                align="center"
                                text={"Log in with Facebook"}
                            />
                        </LoginSocialFacebook>
                    </div>
                    <div className="pb-1" />
                    <div>
                        <GithubLoginButton
                            onClick={loginWithGithub}
                            className="font-Principal text-white tracking-wide"
                            align="center"
                            text={"Log in with Github"}
                        />
                    </div>

                    <div className="Footer-Login py-2 font-Secundaria">
                        Don't you have an account yet? <br />
                    </div>

                    <Link to="/signup">
                        <p className="text-indigo-700 font-semibold pb-2 font-Secundaria">Get an Account</p>
                    </Link>

                </div>
            </div>
            <BasicModal showModal={showModal} imageSrc={imageSrc} mainMessage={mainMessage} message={message} closeModal={() => setShowModal(!showModal)} />
        </main>
    )
}
export default LogIn