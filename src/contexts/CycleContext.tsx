import { ReactNode, createContext, useReducer, useState } from 'react'
import { ActionType, Cycle, cyclesReducer } from '../reducers/cycles'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextProvidesProps {
  children: ReactNode
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPast: number
  getSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProvidesProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })
  const { cycles, activeCycleId } = cyclesState
  const [amountSecondsPast, setAmountSecondsPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionType.MARK_CURRENT_CYCLE_IS_FINISHED,
      payload: {
        data: activeCycleId,
      },
    })
  }

  function getSecondsPassed(seconds: number) {
    setAmountSecondsPast(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const cycleId = String(new Date().getTime())

    const newCicle: Cycle = {
      id: cycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: ActionType.ADD_NEW_CYCLE,
      payload: {
        data: newCicle,
      },
    })

    setAmountSecondsPast(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: ActionType.INTERRUPT_CURRENT_CYCLE,
      payload: {
        data: activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPast,
        getSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
