export function useWindowWidth(setWindowWidth) {
  const handleResizeWindow = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResizeWindow);
  return () => {
    window.removeEventListener('resize', handleResizeWindow);
  };
}
