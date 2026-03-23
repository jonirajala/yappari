import { createContext, useContext } from 'react';

interface LessonContextValue {
  unitNumber: number;
}

const LessonContext = createContext<LessonContextValue>({ unitNumber: 1 });

export function LessonProvider({
  unitNumber,
  children,
}: {
  unitNumber: number;
  children: React.ReactNode;
}) {
  return (
    <LessonContext.Provider value={{ unitNumber }}>
      {children}
    </LessonContext.Provider>
  );
}

export function useUnitNumber(): number {
  return useContext(LessonContext).unitNumber;
}
