import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, CycleState, cyclesReducer } from '../reducers/cycles/reducer'
import {
  ActionType,
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrrentCycleIsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'
import { version } from '../../package.json'
import produce from 'immer'

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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        `@pomodoro-timer:cycles-state-${version}`,
      )

      if (storedStateAsJSON) {
        const cycleStoredState = JSON.parse(storedStateAsJSON) as CycleState

        cycleStoredState.cycles.map((cycle) => {
          if (typeof cycle.startDate === 'string') {
            cycle.startDate = new Date(cycle.startDate)
          }

          return cycle
        })

        return cycleStoredState
      }

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPast, setAmountSecondsPast] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), activeCycle.startDate)
    }

    return 0
  })

  function markCurrentCycleAsFinished() {
    dispatch(markCurrrentCycleIsFinishedAction())
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

    dispatch(addNewCycleAction(newCicle))

    setAmountSecondsPast(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(`@pomodoro-timer:cycles-state-${version}`, stateJSON)
  }, [cyclesState])

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
