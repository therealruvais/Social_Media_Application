import { createContext, useState } from "react"

export const TextContext = createContext()

const TextProvider = ({children}) => {
  const [showFullText, setShowFullText] = useState(false)

    const toggleText = () => {
        setShowFullText(!showFullText);
    }

  return (
      <TextContext.Provider value={{showFullText,toggleText}}>
          {children}
    </TextContext.Provider>
  )
}

export default TextProvider