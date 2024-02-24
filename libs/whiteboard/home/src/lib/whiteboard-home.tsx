import { Button } from '@shared';
import styles from './whiteboard-home.module.css';

/* eslint-disable-next-line */
export interface WhiteboardHomeProps {}

export function WhiteboardHome(props: WhiteboardHomeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WhiteboardHome!</h1>
      <Button variant="destructive">Hello Shadcn Button</Button>
    </div>
  );
}

export default WhiteboardHome;
