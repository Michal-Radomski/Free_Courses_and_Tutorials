// Types and interfaces:

interface Props {
  name: string;
  port: number;
}

interface State {
  name: string;
  port: string;
}

interface ServerPort {
  _id: string;
  name: string;
  port: number;
}
