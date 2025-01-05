import { renderHook, act } from "@testing-library/react";
import { useModal } from "../hooks/useModal"; 

describe("useModal hook", () => {
  it("should initialize with modal closed and no config", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.modalConfig).toBeNull();
  });

  it("should open the modal with a config", () => {
    const { result } = renderHook(() => useModal());
    const config = { title: "Test Modal" };

    act(() => {
      result.current.openModal(config);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.modalConfig).toEqual(config);
  });

  it("should close the modal and clear the config", () => {
    const { result } = renderHook(() => useModal());
    const config = { title: "Test Modal" };

    act(() => {
      result.current.openModal(config);
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.modalConfig).toBeNull();
  });
});
