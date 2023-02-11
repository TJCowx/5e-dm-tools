import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | 5e DM Tools`;
  }, [title]);
};

export default useDocumentTitle;
