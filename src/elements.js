import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const Container = styled.div`
	${props => props.containerHeight && css`
		height: ${props.containerHeight}px;
	`}
	${props => props.containerWidth && css`
		width: ${props.containerWidth}px;
	`}
	position: relative;
	overflow: hidden;
`

export const ResetButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
`

export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0;
  ${props => props.isDisplayed === false && css`
  	display: none;
  `}
`

export const Image = styled.img``