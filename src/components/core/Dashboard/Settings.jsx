import React from 'react'
import EditDP from '../../Settings/EditDP'
import EditBio from '../../Settings/EditBio'
import EditPassword from '../../Settings/EditPassword'


const Settings = () => {
	return (
		<div className='bg-richblack-900 text-white w-full h-full'>
			<div>
				Edit Profile
			</div>
			<EditDP/>
			<EditBio/>
			<EditPassword/>
		</div>
	)
}

export default Settings