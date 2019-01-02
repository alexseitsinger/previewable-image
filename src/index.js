import React from "react"
import PropTypes from "prop-types"

import {
	Container,
	Image,
	ImageContainer,
	Input,
	ResetButton
} from "./elements"

/**
 * A file input that automatically displays the image file its given.
 * @example
 * import React from "react"
 * import PreviewableImage from "@alexseitsinger/previewable-image"
 *
 * function ExampleComponent({ onCompleted }){
 *   return (
 *   	 <Form
 *   	   onSubmit={(event) => {
 *   	     event.preventDefault()
 *   	     event.stopPropagation()
 *   	     const form = event.target
 *   	     const imageField = form.querySelector("input[name=image]")
 *   	     onCompleted(imageField.files[0])
 *   	   }}>
 *       <PreviewableImage/>
 *       <SubmitButton>
 *         Submit
 *       </SubmitButton>
 *     </Form>
 *   )
 * }
 * @param {String} [name="image"] The name of the file input
 * @param {Function} [onLoaded=() => {}] The function to invoke when the file is loaded by the browser
 * @param {String} [containerClassName="PreviewableImage"] The classname to use for the container element.
 * @param {Number} [containerHeight=200] The height to use for the image.
 * @param {Number} [containerWidth=200] The width to use for the image.
 * @param {String} [alt=""] The alternative string to use for the image.
 * @param {String} [initialImage=""] The path to an image to display before anything is loaded.
 * @param {String} [fallbackImage=""] The path to an image to display as a fallback.
 * @param {Boolean} [withResetButton=true] Whether or not to use a reset button when the image preview is displayed.
 * @param {Object} [resetButtonStyle={}] The style to apply to the reset button.
 * @param {Object|String} [resetButtonBody="reset"] The node to render inside the reset button.
 */
class PreviewableImage extends React.Component {
	static propTypes = {
		name: PropTypes.string,
		onLoaded: PropTypes.func,
		containerClassName: PropTypes.string,
		containerWidth: PropTypes.number,
		containerHeight: PropTypes.number,
		alt: PropTypes.string,
		initialImage: PropTypes.string,
		fallbackImage: PropTypes.string,
		withResetButton: PropTypes.bool,
		resetButtonStyle: PropTypes.object,
		resetButtonBody: PropTypes.node
	}

	static defaultProps = {
		name: "image",
		containerClassName: "PreviewableImage",
		onLoaded: () => {},
		alt: "",
		initialImage: "",
		fallbackImage: "",
		containerWidth: 200,
		containerHeight: 200,
		withResetButton: true,
		resetButtonStyle: {},
		resetButtonBody: "reset"
	}

	state = {
		src: null
	}

	renderImage = () => {
		const { src } = this.state
		const { alt, fallbackImage, initialImage } = this.props
		var imageSrc = ""
		if (src) {
			imageSrc = src
		} else if (initialImage) {
			imageSrc = initialImage
		} else if (fallbackImage) {
			imageSrc = fallbackImage
		}
		return <Image src={imageSrc} alt={alt} />
	}

	handleChangeInputField = (event) => {
		const { onLoaded } = this.props
		const target = event.target
		const file = target.files[0]
		const reader = new FileReader()
		reader.onloadend = (event) => {
			const nextState = {
				src: reader.result
			}
			const nextCallback = () => {
				onLoaded(file, reader.result)
			}
			this.setState(nextState, nextCallback)
		}
		const url = reader.readAsDataURL(file)
	}

	renderInputField = () => {
		const { name } = this.props
		const { src } = this.state
		const isDisplayed = src ? false : true
		return (
			<Input
				isDisplayed={isDisplayed}
				name={name}
				type={"file"}
				onChange={this.handleChangeInputField}
			/>
		)
	}

	handleClickResetButton = (event) => {
		this.setState({
			src: null
		})
	}

	renderResetButton = () => {
		const { src } = this.state
		const { withResetButton, resetButtonStyle, resetButtonBody } = this.props
		return src ? (
			withResetButton ? (
				<ResetButton
					type={"button"}
					onClick={this.handleClickResetButton}
					style={resetButtonStyle}>
					{resetButtonBody}
				</ResetButton>
			) : null
		) : null
	}

	render() {
		const { containerClassName, containerWidth, containerHeight } = this.props
		const renderedInputField = this.renderInputField()
		const renderedResetButton = this.renderResetButton()
		const renderedImage = this.renderImage()
		return (
			<Container
				className={containerClassName}
				containerWidth={containerWidth}
				containerHeight={containerHeight}>
				{renderedResetButton}
				{renderedImage}
				{renderedInputField}
			</Container>
		)
	}
}

export default PreviewableImage
