import { ClassroomScene } from "./ClassroomScene";

export default {
    title: 'ClassroomScene',
    component: ClassroomScene,
}

export const Default = () => <ClassroomScene />

export const Astronomy = () => <ClassroomScene scene="astronomy" />

export const Space = () => <ClassroomScene scene="space" />

export const Ninja = () => <ClassroomScene scene="ninja" />

export const Chemistry = () => <ClassroomScene scene="chemistry" />

export const Hogwarts = () => <ClassroomScene scene="hogwarts" />

export const Nervous = () => <ClassroomScene scene="ninja" emotion="nervous" />

export const VeryNervous = () => <ClassroomScene emotion="veryNervous" />

export const Secret = () => <ClassroomScene scene="secret" />