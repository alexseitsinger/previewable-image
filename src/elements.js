import styled from "react-emotion"
import { css } from "emotion"


export const Container = styled.div`
	position: relative;
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
`

export const Image = styled.img`
	${props => props.width && css`
		width: ${props.width};
	`}
	${props => props.height && css`
		height: ${props.height};
	`}
`

export const ImageContainer = styled.div`
	position: relative;
	display: inline-block;
	vertical-align: top;
`