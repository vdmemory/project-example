import { StyledLipsLoader } from './LipsLoader.styled';
import Spinner from '../../spinner/Spinner';

export const LipsLoader = () => {
    return (
        <StyledLipsLoader data-testid="preloader">
            <Spinner />
        </StyledLipsLoader>
    );
};

export default LipsLoader;
