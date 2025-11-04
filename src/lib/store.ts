import { create } from "zustand";

type Props = {
    actionName: string,
    setAnimation: any
}

export const useStore = create<Props>((set) => ({
    actionName: 'Waiting',
    setAnimation: (name: string) => set({
        actionName: name
    })
}))