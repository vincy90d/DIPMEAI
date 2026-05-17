import { create } from 'zustand'

const useStore = create((set) => ({
  cameraPosition: [0, 0, 5],
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
  mousePosition: [0, 0],
  setMousePosition: (pos) => set({ mousePosition: pos }),
}))

export default useStore
