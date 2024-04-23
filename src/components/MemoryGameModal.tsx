//* Types
import { MemoryGameModalProps } from "@types"

const MemoryGameModal: React.FC<MemoryGameModalProps> = ({ showModal, Question, answer1, answer2, answer3, answer4, imageSrc, handleSubmit }) => {

  let modalContainer

  if (showModal) {
    modalContainer = `fixed top-0 left-0 w-screen h-screen bg-gray-400/60 flex justify-center items-center`
  } else {
    modalContainer = `fixed top-0 left-0 w-screen h-screen bg-gray-400/60 flex justify-center items-center hidden`
  }

  return (
    <div className={modalContainer}>
      <div className="bg-white w-[350px] rounded-xl p-7 h-auto absolute z-30 top-1/2 left-1/2 fixPosition lg:w-1/3">
        <h1 className="text-xl weigh font-normal font-Principal pb-5">Choose the correct answer</h1>
        <hr />
        <p className="pt-3 text-base font-Secundaria">{Question}</p>
        <img className="flex w-32 mx-auto pt-5 pb-4s" src={imageSrc} alt={`Imagen de ${Question}`} />
        <form className="pt-3" onSubmit={handleSubmit}>
          <input className="mr-2" name="Answer" type="radio" value={answer1} />
          <label className="text-base font-Secundaria">{answer1}</label>
          <br />
          <input className="mr-2" name="Answer" type="radio" value={answer2} />
          <label className="text-base font-Secundaria">{answer2}</label>
          <br />
          <input className="mr-2" name="Answer" type="radio" value={answer3} />
          <label className="text-base font-Secundaria">{answer3}</label>
          <br />
          <input className="mr-2" name="Answer" type="radio" value={answer4} />
          <label className="text-base font-Secundaria">{answer4}</label>
          <br className="pt-3" />
          <hr className="pb-5 mt-3" />
          <button className="bg-blue-700 text-white py-3 px-5 rounded-lg font-Principal text-xl" type="submit">Submit</button>

        </form>
      </div>
    </div>
  )
}

export default MemoryGameModal