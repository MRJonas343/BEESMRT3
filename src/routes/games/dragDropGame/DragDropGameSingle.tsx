import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

//* Componentes
import NavBar from "@components/NavBar"
import ModalGameOver from "@components/ModalGameOver"
import DraggableItem from "@components/DraggableItem"
import DroppableItem from "@components/DroppableItem"
import ItemsDnDGame from "./itemsDnd.json"

//* Assets
import Trofeo from "@assets/trofeo.webp"

//* Types
import { ItemsDnDGameProps } from "@types"

const DragDropGameSingle: React.FC = () => {

  //* Conffeti effect
  const duration = 15 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  //* Sensores of DnD for Mouse, Touch and Keyboard
  const sensores = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  )

  //* Copies of the items in order not to mutate the originals ones
  const copyOfItemsDnDGame = [...ItemsDnDGame]
  const copyOfItemsDnDGame2 = [...ItemsDnDGame]

  //* Sort the items in a random way
  const sorted1 = copyOfItemsDnDGame.sort(() => randomIndex(ItemsDnDGame) - randomIndex(ItemsDnDGame))
  const sorted2 = copyOfItemsDnDGame2.sort(() => randomIndex(ItemsDnDGame) - randomIndex(ItemsDnDGame))

  //* Game States
  const [points, setPoints] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [imageSrc, setImageSrc] = useState("")
  const [mainMessage, setMainMessage] = useState("")
  const [message, setMessage] = useState("")
  const [DroppableAreas, setDroppableAreas] = useState(
    sorted1.map((DroppableArea) => {
      return <DroppableItem key={DroppableArea.id} idDroppableItem={DroppableArea.id} imgDropped={null} description={DroppableArea.word} hasAnItem={false} />
    })
  )
  const [DraggableItems, setDraggableItems] = useState(
    sorted2.map((item) => {
      return (
        <DraggableItem key={item.id} idDraggableItem={item.id} draggableImgSrc={item.image} shouldDissaperd={false} />
      )
    })
  )

  //* Drop the image in any of the droppable areas
  const imageDroped = (event: DragEndEvent) => {
    if (event.over && event.active) {
      if (event.over.id === event.active.id) {
        const indexToFind = Number(event.active.id) - 1
        const image = ItemsDnDGame[indexToFind].image
        setPoints(points + 1)
        const newDroppableAreas = (DroppableAreas.map((DroppableArea) => {
          if (DroppableArea.props.idDroppableItem === event.over?.id) {
            return <DroppableItem
              key={DroppableArea.props.idDroppableItem}
              idDroppableItem={DroppableArea.props.idDroppableItem}
              imgDropped={image}
              description={null}
              hasAnItem={true} />
          } else {
            return DroppableArea
          }
        }))
        setDroppableAreas(newDroppableAreas)
        const newDraggableItems = DraggableItems.map((item) => {
          if (item.props.idDraggableItem === event.active.id) {
            return <DraggableItem
              key={item.props.idDraggableItem}
              idDraggableItem={item.props.idDraggableItem}
              draggableImgSrc={item.props.draggableImgSrc}
              shouldDissaperd={true} />
          } else {
            return item
          }
        })
        setDraggableItems(newDraggableItems)
      }
    }
  }

  //* Play Again
  function PlayAgain() {
    setShowModal(false)
    setPoints(0)
    setDroppableAreas(
      sorted1.map((DroppableArea) => {
        return <DroppableItem key={DroppableArea.id} idDroppableItem={DroppableArea.id} imgDropped={null} description={DroppableArea.word} hasAnItem={false} />
      })
    )
    setDraggableItems(
      sorted2.map((item) => {
        return (
          <DraggableItem key={item.id} idDraggableItem={item.id} draggableImgSrc={item.image} shouldDissaperd={false} />
        )
      })
    )
  }

  //* Create a random index (if you don't remeber why do we need this function, is just to create an index for the sorted arrays)
  function randomIndex(array: ItemsDnDGameProps[]) {
    return Math.floor(Math.random() * array.length)
  }

  //* Create a random for the confetti effect
  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  //* Show the modal 
  function showModalWin() {
    setShowModal(!showModal)
  }

  //* UseEffect to show the modal when the user wins
  useEffect(() => {
    if (points === 6) {
      setImageSrc(Trofeo)
      setMainMessage("Congratulations!")
      setMessage("You have won")
      showModalWin()
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }
        const particleCount = 50 * (timeLeft / duration)
        const origin1 = { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        const origin2 = { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        confetti({ ...defaults, particleCount, origin: origin1 })
        confetti({ ...defaults, particleCount, origin: origin2 })
      }, 250)
    }
  }, [points])


  return (
    <main className="w-screen h-screen bg-Gradient1 overflow-x-hidden">
      <NavBar />
      <h1 className="font-Principal tracking-wide text-center text-2xl text-white text-3d lg:text-4xl" >Drag and Drop</h1>
      <DndContext sensors={sensores} onDragEnd={imageDroped} autoScroll={false}>
        <div className="w-[92dvw] h-auto mx-auto mt-4 flex items-center bg-white/40 rounded-lg p-4 lg:flex-col lg:h-[70dvh]">
          <section className="flex flex-col gap-4 w-dvw items-center lg:flex-row lg:justify-around lg:gap-0 lg:w-[92dvw] lg:h-[70dvh]">
            {DraggableItems}
          </section>
          <section className="flex flex-col gap-4 w-dvw items-center lg:flex-row lg:justify-around lg:gap-0 lg:w-[92dvw] lg:h-[70dvh]">
            {DroppableAreas}
          </section>
        </div>
      </DndContext>
      <ModalGameOver showModal={showModal} imageSrc={imageSrc} mainMessage={mainMessage} message={message} playAgain={PlayAgain} showModalWin={PlayAgain} />
    </main>
  )

}

export default DragDropGameSingle