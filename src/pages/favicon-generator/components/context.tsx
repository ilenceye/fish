import { createContext, useContext, useReducer, useState } from 'react';

export type Shape = 'square' | 'rounded' | 'circle';

type ContextType = {
  text: string;
  shape: Shape;
  color: string;
  bg: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setShape: React.Dispatch<React.SetStateAction<Shape>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setBg: React.Dispatch<React.SetStateAction<string>>;
  //
  selectedFonts: string[];
  setSelectedFonts: React.Dispatch<{
    type: 'add' | 'delete';
    payload: string;
  }>;
};

const Context = createContext<ContextType | null>(null);

const useGlobalContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useGlobalContext should be used within <ContextProvider>');
  }

  return context;
};

const selectedFontsReducer = (
  state: string[],
  action: { type: 'add' | 'delete'; payload: string },
) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];
    case 'delete':
      return state.filter((font) => font !== action.payload);
    default:
      throw Error('Unknown action: ' + action.type);
  }
};

type ProviderProps = {
  children: React.ReactNode;
};

const ContextProvider = ({ children }: ProviderProps) => {
  const [text, setText] = useState('F');
  const [shape, setShape] = useState<Shape>('rounded');
  const [color, setColor] = useState('#ffffff');
  const [bg, setBg] = useState('#000000');

  const [selectedFonts, setSelectedFonts] = useReducer(
    selectedFontsReducer,
    [],
  );

  return (
    <Context.Provider
      value={{
        text,
        shape,
        color,
        bg,
        setText,
        setShape,
        setColor,
        setBg,
        //
        selectedFonts,
        setSelectedFonts,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, useGlobalContext };
