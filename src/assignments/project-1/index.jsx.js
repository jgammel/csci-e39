import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../../ui/components/uploader.jsx'
import introText from '../../ui/components/introtext.jsx'

const Uploads = ({uploads, actions}) => {
	const pendingFiles = uploads.files.filter(({progress}) => progress && progress < 100)
	const completedFiles = uploads.files.filter(({progress}) => !progress)

	return <div>
		<h1>My Image Library</h1>
		<introText />
		{/* do not delete this uploader component */}
		<div className="uploader-wrapper">
		<label tabIndex="0" htmlFor="uploader" className="uploader-label">Upload image</label>
		<Uploader upload={actions.upload} />
		{/* do not delete this uploader component */}
		</div>

		<h2>In Progress</h2>
		<ul>
			{pendingFiles.map(file => {
				const {id, name, progress} = file

				return <li key={id}>
					<label>{name}</label>
					<progress value={progress} max="100">{progress}%</progress>
				</li>
			})}
		</ul>

		<h2>Image Gallery</h2>
		<ul className="gallery">
			{completedFiles.map(file => {
				const {id, name, url, error} = file
        //TODO: ask for an image description and pass in alt text.
				return <li key={id}>
					<label>{name}</label>
					{!error && <img src={url} style={{maxWidth: `200px`}} />}
					{!!error && <p className="failure">{error}</p>}
				</li>
			})}
		</ul>
	</div>
}

const statusPropType = PropTypes.shape({
	status: PropTypes.oneOf([`init`, `pending`, `success`, `failure`]).isRequired,
	message: PropTypes.string.isRequired,
})

Uploads.propTypes = {
	uploads: PropTypes.shape({
		files: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			name: PropTypes.string.isRequired,
			progress: PropTypes.number,
			url: PropTypes.string,
			error: PropTypes.string,
		})).isRequired,
		update: statusPropType.isRequired,
		delete: statusPropType.isRequired,
		share: statusPropType.isRequired,
	}).isRequired,
	actions: PropTypes.object.isRequired,
}

export default Uploads
