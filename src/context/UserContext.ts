import { createContext } from 'react'
import { LoggedUser } from '../types'

interface Props {
  user: LoggedUser;
  setUser: React.Dispatch<React.SetStateAction<LoggedUser | undefined>>
}

export const UserContext = createContext({} as Props)