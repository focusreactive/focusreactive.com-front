import React from "react";
import styled from "@emotion/styled";
import Author from "../Author";
import getAuthors from "@site/utils/getAuthors";

const Container = styled.div`
  max-width: 620px;
  margin: 0px auto 60px;
  border-top: rgb(235, 235, 235) solid 1px;
  padding-top: 9px;
  h4 {
    color: rgba(0, 0, 0, 0.54);
    font-weight: 300;
  }
  @media only screen and (max-width: 670px) {
    padding: 9px var(--layout-horizonal-padding) 0;
    max-width: 100%;
  }
`;

const AuthorBlock = styled.div`
  font-size: 14px;
  line-height: 1.72;
  max-width: 620px;
  margin: 8px auto 0;
`;

const Signatures = ({ authorIds, authorsMap }) => {
  const postAuthors = getAuthors(authorsMap, authorIds);

  return (
    <Container>
      <h4>WRITTEN BY</h4>
      {postAuthors.map((author) => (
        <AuthorBlock key={author.id}>
          <Author {...author} avatarSize="big" isItSignature />
        </AuthorBlock>
      ))}
    </Container>
  );
};

export default Signatures;
