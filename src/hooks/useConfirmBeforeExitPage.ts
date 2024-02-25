// TODO: Fix

/* const ConfirmText =
  'All unsaved changes WILL be lost. Do you want to continue?'; */

const useConfirmBeforeExitPage = () => {
  // const router = useRouter();
  /* 
  useEffect(() => {
    const handleRouteAway = () => {
      if (confirm(ConfirmText)) return;
      throw new Error('Aborted navigation');
    };

    // router.events.on('routeChangeStart', handleRouteAway);
    return () => {
      // router.events.off('routeChangeStart', handleRouteAway);
    };
  }, []); */
};

export default useConfirmBeforeExitPage;
