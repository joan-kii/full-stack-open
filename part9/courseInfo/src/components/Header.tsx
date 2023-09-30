import { HeaderType } from '../types';

const Header = (props: HeaderType) => {
  return (
    <h1>{props.name}</h1>
  )
};

export { Header };
