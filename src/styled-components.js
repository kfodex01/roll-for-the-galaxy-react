import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gameColors } from "./enums";

export const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlayerColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ededed;
  margin: 3px;
`;

export const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1px;
  flex-wrap: wrap;
`;

export const FlexMaxRowDiv = styled(FlexRowDiv)`
  justify-content: space-between;
`;

export const FlexDropBoxRowDiv = styled(FlexRowDiv)`
  justify-content: space-around;
  margin: 10px;
`;

export const BigText = styled.p`
  font-family: sans-serif;
  font-size: 20px;
  margin: 0;
  padding: 5px;
`;

export const DropBoxDiv = styled(FlexColumnDiv)`
  padding: 5px;
  background-color: #ededed;
  min-width: 100px;
  max-width: 110px;
  min-height: 50px;
  text-align: center;
  font-family: sans-serif;
  font-size: 20px;
  margin: 0;
`;

export const BlueWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.BLUE};
`;

export const BrownWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.BROWN};
`;

export const Development = styled(FontAwesomeIcon)`
  color: ${gameColors.BLACK};
`;

export const GrayWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.GRAY};
`;

export const GreenWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.GREEN};
`;

export const YellowWorld = styled(FontAwesomeIcon)`
  color: ${gameColors.YELLOW};
`;

export const PopupFullPageCoverDiv = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
`;

export const PopupOnlyDiv = styled.div`
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    padding: 5px;
    background: white;
`;
