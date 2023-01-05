import { createContext } from 'react'
import { DataStore } from './dataStore'

export const configStore = createContext(new DataStore())