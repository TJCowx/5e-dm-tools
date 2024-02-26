import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface LayoutContextValue {
  shouldPadContainer: boolean;
  setShouldPadContainer: (val: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue>({
  shouldPadContainer: false,
  setShouldPadContainer: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export default function LayoutProvider({ children }: PropsWithChildren) {
  const [shouldPad, setShouldPad] = useState(false);

  const contextVal = useMemo(
    () => ({
      shouldPadContainer: shouldPad,
      setShouldPadContainer: setShouldPad,
    }),
    [shouldPad],
  );

  return (
    <LayoutContext.Provider value={contextVal}>
      {children}
    </LayoutContext.Provider>
  );
}
