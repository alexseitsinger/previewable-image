# Previewable Image

## Description

An input file field that automatically renders a preview of the image file loaded.

## Installation

```
npm install @alexseitsinger/previewable-image
```

or

```
yarn add @alexseitsinger/previewable-image
```

## Props

-   onPreviewLoaded - (Function, Required) - The method to invoke when the image file is successfully loaded from the input. Returns the file object and the base64 encoded image data.
-   containerClassName - (String, Optional) - The classname to use for the container.
-   alt - (String, Optional) - The alternative name to use on the image.
-   initialImage - (String, Optional) - The image to display initially, before any other image is loaded from the input.
-   placeholderImage - (String, Optional) - The image to display when there isn't another image loaded.
-   previewHeight - (Number/String, Optional) - The dimension to use for the loaded image.
-   previewWidth - (Number/String, Optional) - The dimension to use for the loaded image.
-   withResetButton - (Boolean, Optioanl) - Whether or not to display a reset button with the image preview.
-   resetButtonStyle - (Object, Optional) - Extra styles to apply to the reset button.
-   resetButtonBody - (Node, Optional) - The body of the reset button.

## Usage

```javascript
import React from "react"
import PropTypes from "prop-types"
import PreviewableImage from "@alexseitsinger/previewable-image"
import placeholder200x200 from "../../images/200x200.png"

class ExampleForm extends React.Component {
	static propTypes = {
		onFormCompleted: PropTypes.func.isRequired
	}
	state = {
		file: null
	}
	render() {
		const { onFormCompleted } = this.props
		const { file } = this.state
		return (
			<form
				onSubmit={(event) => {
					event.stopPropagation()
					event.preventDefault()
					onFormCompleted(file)
				}}>
				<PreviewableImage
					onPreviewLoaded={(file, dataURI) => {
						this.setState({ file })
					}}
					alt={"image name"}
					placeholderImage={placeholder200x200}
					previewHeight={200}
					previewWidth={200}
					withResetButton={true}
					resetButtonStyle={{
						backgroundColor: "red"
					}}
					resetButtonBody={<div>Reset</div>}
				/>
			</form>
		)
	}
}

export default ExampleForm
```
