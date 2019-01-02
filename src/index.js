import React from "react"
import PropTypes from "prop-types"

import {
	Container,
	Image,
	ImageContainer,
	Input,
	ResetButton
} from "./elements"

class PreviewableImage extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		onPreviewLoaded: PropTypes.func.isRequired,
		containerClassName: PropTypes.string,
		alt: PropTypes.string,
		initialImage: PropTypes.string,
		placeholderImage: PropTypes.string,
		previewHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		previewWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		withResetButton: PropTypes.bool,
		resetButtonStyle: PropTypes.object,
		resetButtonBody: PropTypes.node
	}

	static defaultProps = {
		name: "image",
		containerClassName: "PreviewableImage",
		alt: "",
		initialImage: "",
		placeholderImage: "",
		previewHeight: 200,
		previewWidth: 200,
		withResetButton: true,
		resetButtonStyle: {},
		resetButtonBody: "reset"
	}

	state = {
		src: null
	}

	renderImage = () => {
		const { src } = this.state
		const {
			alt,
			placeholderImage,
			initialImage,
			previewWidth,
			previewHeight
		} = this.props
		var imageSrc = ""
		if (src) {
			imageSrc = src
		} else if (initialImage) {
			imageSrc = initialImage
		} else if (placeholderImage) {
			imageSrc = placeholderImage
		}
		return (
			<Image
				src={imageSrc}
				alt={alt}
				height={previewHeight}
				width={previewWidth}
			/>
		)
	}

	handleChangeInputField = (event) => {
		const { onPreviewLoaded } = this.props
		const target = event.target
		const file = target.files[0]
		const reader = new FileReader()
		reader.onloadend = (event) => {
			const nextState = {
				src: reader.result
			}
			const nextCallback = () => {
				onPreviewLoaded(file, reader.result)
			}
			this.setState(nextState, nextCallback)
		}
		const url = reader.readAsDataURL(file)
	}

	renderInputField = () => {
		return (
			<Input name={name} type={"file"} onChange={this.handleChangeInputField} />
		)
	}

	handleClickResetButton = (event) => {
		this.setState({
			src: null
		})
	}

	renderResetButton = () => {
		const { withResetButton, resetButtonStyle, resetButtonBody } = this.props
		return withResetButton ? (
			<ResetButton
				type={"button"}
				onClick={this.handleClickResetButton}
				style={resetButtonStyle}>
				{resetButtonBody}
			</ResetButton>
		) : null
	}

	render() {
		const { containerClassName } = this.props
		const { src } = this.state
		const renderedInputField = src ? null : this.renderInputField()
		const renderedResetButton = src ? this.renderResetButton() : null
		const renderedImage = this.renderImage()
		return (
			<Container className={containerClassName}>
				<ImageContainer>
					{renderedResetButton}
					{renderedImage}
					{renderedInputField}
				</ImageContainer>
			</Container>
		)
	}
}

export default PreviewableImage
