import { FC } from 'react';
import { LoaderWrapper } from './Loader.styles';
import loader from '../../../assets/loader.gif';

const Loader: FC = () => {
  return (
    <LoaderWrapper>
      <img src={loader} alt='loading...' />
    </LoaderWrapper>
  );
};

export default Loader;
