//* Components
import NavBar from "@components/NavBar"
import AboutCard from "@components/AboutCard"

//* Assets
import AbejitaEstudiosa from "@assets/abejitaestudiosa.webp"
import Control from "@assets/control.webp"
import CardImage from "@assets/cardAboutImg.webp"
import Comun from "@assets/comun.webp"
import Puzzle from "@assets/puzzleAboutImg.webp"

const About = () => {
  return (
    <main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
      <NavBar />
      <section className=" bg-white mt-7 h-auto w-auto px-6 mx-8 outline-slate-950 outline rounded-xl mb-9 lg:mx-20">
        <h1 className="text-center font-Principal text-4xl py-5">About Us</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 md:pb-5">
            <p className="font-Secundaria lg:text-xl">Through linguistic challenges, interactive exercises, and a playful approach, users will be able to progressively advance their learning and stay motivated as they become proficient in the language.
              <br></br><br></br>
              The application will offer users a wide variety of interactive games that will allow them to expand their vocabulary and learn useful English expressions in a fun and engaging way.
              <br></br><br></br>
              It seeks to give users the opportunity to learn and refine their English language knowledge and skills through casual, engaging, and entertaining tools and media that will help users understand and use the language in a professional environment, applying what they have learned.</p>
          </div>
          <div className="flex justify-center py-7 md:mx-auto">
            <img src={AbejitaEstudiosa} alt="bee teacher" className="md:w-48" />
          </div>
        </div>
      </section>
      <section className="bg-white h-auto w-auto px-6 mx-8 outline-slate-950 outline rounded-xl mb-6 lg:mx-20">
        <h2 className="text-center font-Principal text-4xl py-5">What do we offer?</h2>
      </section>
      <section className="bg-white h-auto w-auto px-6 mx-8 outline-slate-950 outline rounded-xl mb-9 pb-5 lg:pl-14 lg:mx-20">
        <AboutCard
          image={Control}
          title="Learning by Play:"
          text="With BeeSMRT, learning English becomes an exciting and dynamic experience through a wide range of interactive and challenging games." />
        <AboutCard
          image={CardImage}
          title="Variety of Games:"
          text="From crossword puzzles to word games, brain teasers, and grammar challenges, BeeSMRT offers a variety of options for all skill-levels you will never stop having fun while you learn!" />
        <AboutCard
          image={Comun}
          title="Friendly Battles:"
          text="Challenge your friends or join online competitions to test your English skills and win exciting rewards. The fun never ends at BeeSMRT!" />
        <AboutCard
          image={Puzzle}
          title="Customized Levels:"
          text="Custom Levels: Tailor your learning experience by choosing from different levels of difficulty. BeeSMRT adjusts to your pace, providing a personalized learning environment." />
      </section>
    </main>
  )
}

export default About