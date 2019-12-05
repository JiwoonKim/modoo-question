import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import DesignerAndDevelopersImg from '../../static/images/11615@3x.png';
import EntrancePhraseImg from '../../static/images/mobile-invalid-name@3x.png';
import BigEntrancePhraseImg from '../../static/images/invalid-name@3x.png';
import EntryBox, { EntryBoxContainer } from '../EntryBox';

const EntryView = () => {
  return (
    <Fragment>
      <EntryBoxContainer />
      <EntrancePhrase />
      <DesignerAndDevelopers>
        <Column>
          <Row>Designer</Row>
          <Row>Developers</Row>
        </Column>
        <Column>
          <Name>Kyeongrae, Noh</Name>
          <Name>Jiwoon, Kim</Name>
          <Name>Kyuseock, Ma</Name>
          <Name>Yongseong, Jeon</Name>
        </Column>
      </DesignerAndDevelopers>
    </Fragment>
  )
}

export default EntryView;

const EntrancePhrase = styled.div`
  width: 184px;
  height: 141px;
  background-image: url(${EntrancePhraseImg});
  background-size: cover;
  position: relative;
  bottom: 154px;
  left: 16px;
  z-index: 1;

  @media screen and (min-width: 769px) {
    position: absolute;
    width: 276px;
    height: 311px;
    background-image: url(${BigEntrancePhraseImg});
    left: 32px;
    bottom: 32px;
  }
`

const DesignerAndDevelopers = styled.div`
  display: none;
  
  @media screen and (min-width: 769px) {
      width: 161px;
      height: 89px;
      position: absolute;
      bottom: 32px;
      right: 32px;
      display: flex;
    }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 300;
  font-style: italic;
  line-height: 2;
  color: rgba(0, 0, 0, 0.16);
`

const Name = styled.div`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
  line-height: 2;
  text-align: left;
  color: rgba(0, 0, 0, 0.16);
  position: relative;
  left: 20px;
`