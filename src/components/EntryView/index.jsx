import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import DesignerAndDevelopersImg from '../../static/images/11615@3x.png';
import EntrancePhraseImg from '../../static/images/mobile-invalid-name@3x.png';
import BigEntrancePhraseImg from '../../static/images/invalid-name@3x.png';
import EntryBox, { EntryBoxContainer } from '../EntryBox';

const EntryView = ({ pressedKey }) => {
  return (
    <Fragment>
      <EntryBoxContainer
        pressedKey={pressedKey}
      />
      <EntrancePhrase />
      <DesignerAndDevelopers />
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
  @media screen and (min-width: 769px) {
    width: 161px;
    height: 89px;
    background-image: url(${DesignerAndDevelopersImg});
    background-size: cover;
    position: absolute;
    bottom: 32px;
    right: 32px;
  }
`
