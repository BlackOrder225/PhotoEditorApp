import { React } from 'react';
import './index.css';
import { Slider } from 'antd';
function Rotate(props) {
	const { image, canvas, setContext, ctx } = props;
	// const image = new Image();
	// image.crossOrigin = "Anonymous";
	let isFirstRun = true;
	let currentAngle = 0;
	async function setImageSrc() {
		image.src = await canvas.toDataURL();
	}
	const doRotate = async (e) => {
		// e.preventDefault();
		if (isFirstRun) {
			isFirstRun = false;
			await setImageSrc();
			currentAngle = parseInt(e);
		}
		console.log('ctx', ctx);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		const cx = canvas.width / 2;
		const cy = canvas.height / 2;
		const x = 0;
		const y = 0;
		const radians = (Math.PI / 180) * e,
			cos = Math.cos(radians),
			sin = Math.sin(radians),
			nx = cos * (x - cx) + sin * (y - cy) + cx,
			ny = cos * (y - cy) - sin * (x - cx) + cy;
		ctx.rotate((e * Math.PI) / 180);
		ctx.drawImage(image, 0, 0, image.width, image.height, -nx, -ny, canvas.width, canvas.height);
		// ctx.save();
		await setContext(ctx);
	};

	return (
		<div className="rotate-filter ">
			<form onSubmit={doRotate} id="rotate" className="form-group">
				<Slider defaultValue={0} id="inputRotate" onChange={doRotate} min={0} max={360} />
			</form>
		</div>
	);
}

export default Rotate;
