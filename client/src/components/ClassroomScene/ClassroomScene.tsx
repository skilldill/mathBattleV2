import { FC, PropsWithChildren } from 'react'
import styles from './ClassroomScene.module.css'
import cn from 'classnames'

type ClassroomSceneProps = {
    scene?: string; // default | astronomy | space | ninja | chemistry | hogwarts
    emotion?: string;
}

export const ClassroomScene: FC<PropsWithChildren<ClassroomSceneProps>> = ({ children, scene, emotion }) => {
  return (
    <div className={cn(styles.classroomScene, styles[scene || 'default'], styles[emotion || ''])}>
        {children}
    </div>
  )
}