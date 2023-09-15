import { ImWarning } from "react-icons/im";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Wrapper className="container mb-4">
      <ErrorWrapper>
        <Number>404</Number>
        <StyledImWarning />
      </ErrorWrapper>
      <div className="text-center">
        <h1>Page Not Found!</h1>
        <p>
          to go back to the homepage <Link to={"/"}>click here</Link>.
        </p>
      </div>
    </Wrapper>
  );
};

const StyledImWarning = styled(ImWarning)`
  font-size: 160px;
  margin-bottom: 50px;
`;

const Number = styled.h1`
  font-size: 200px;
`;
const ErrorWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 35px;
  height: 60vh;
  justify-content: center;
  background-color: #e6e6e6;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
export default PageNotFound;