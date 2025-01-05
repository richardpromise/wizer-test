import { renderHook, act } from "@testing-library/react";

import useIsSmallScreen from '../hooks/useSmalllScreen';
describe('useIsSmallScreen', () => {
  it('should return true for small screens', () => {
   
    global.innerWidth = 500;

    const { result } = renderHook(() => useIsSmallScreen());


    expect(result.current).toBe(true);
  });

  it('should return false for large screens', () => {
   
    global.innerWidth = 1200;

    const { result } = renderHook(() => useIsSmallScreen());


    expect(result.current).toBe(false);
  });

  it('should update value on resize', () => {
   
    global.innerWidth = 500;
    const { result } = renderHook(() => useIsSmallScreen());


    expect(result.current).toBe(true);

  
    act(() => {
      global.innerWidth = 1200;
     
      global.dispatchEvent(new Event('resize'));
    });

    // Check if the value updates to false
    expect(result.current).toBe(false);
  });
});
