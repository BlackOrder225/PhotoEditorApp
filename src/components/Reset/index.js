import React from 'react';
import './index.css';
function Reset(props) {
	const { canvas, ctx, setContext, image } = props;

	const resetCanvas = (e) => {
		if (e.target.id === 'reset') {
			// setContext(newCtx);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
			setContext(ctx);
		}
	};
	return (
		<div className="reset-container">
			<div className="center">
				<button className="btn btn-primary" id="reset" onClick={resetCanvas}>
					Reset
				</button>
			</div>
		</div>
	);
}

export default Reset;
