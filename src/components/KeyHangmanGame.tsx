import { KeyHangmanGameProps } from "@types"

const KeyHangmanGame: React.FC<KeyHangmanGameProps> = ({ element }) => {
  return (
    <button className="bg-yellow-300 hover:bg-yellow-500 font-bold p-2 rounded">{element}</button>
  )
}
export default KeyHangmanGame