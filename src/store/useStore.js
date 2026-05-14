import { create } from 'zustand'

const useStore = create((set) => ({
  cameraPosition: [0, 0, 5],
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
}))

export default useStore
