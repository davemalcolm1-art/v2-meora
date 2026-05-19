import { createContext, useContext, useState, ReactNode } from "react";

type Ctx = {
  open: () => void;
  openWithProtocol: (name: string) => void;
  selectedProtocol: string;
};

const QuizContext = createContext<Ctx>({
  open: () => {},
  openWithProtocol: () => {},
  selectedProtocol: "",
});

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({
  children,
  onOpen,
}: {
  children: ReactNode;
  onOpen: () => void;
}) => {
  const [selectedProtocol, setSelectedProtocol] = useState<string>("");

  return (
    <QuizContext.Provider
      value={{
        open: () => onOpen(),
        openWithProtocol: (name: string) => {
          setSelectedProtocol(name);
          onOpen();
        },
        selectedProtocol,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
