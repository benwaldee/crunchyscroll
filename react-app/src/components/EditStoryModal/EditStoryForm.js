import './EditStoryForm.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editStoryThunk } from '../../store/stories'

const EditStoryForm = ({ setShowEditStoryModal, story }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userID = useSelector(state => state.session.user).id
    const [title, setTitle] = useState(story.title)
    const [body, setBody] = useState(story.body)
    const [image, setImage] = useState(story.image_url)
    const [errors, setErrors] = useState({
        body: "",
        title: "",
        image: ""
    })

    const handleSubmit = (e => {
        e.preventDefault()

        let newErr = {}

        if (body.length < 100 && body.length > 0) {
            setBody('')
            newErr.body = 'Body must be at least 100 characters'
        }


        if (!image.endsWith('.png') && !image.endsWith('.webp') && !image.endsWith('.jpg') && !image.endsWith('.jpeg') && !image.endsWith('.svg')) {
            setImage('')
            newErr.image = 'Please enter a valid image '

        }

        // lengths
        if (title.length < 1) newErr.title = "Please enter a title."
        if (body.length < 1) newErr.body = "Please enter a body."
        if (image.length < 1) newErr.image = "Please provide an image."

        if (title.length > 50) {
            setTitle('')
            newErr.title = "Title must be less than 50 characters"
        }
        if (image.length > 1000) {
            setImage('')
            newErr.image = "Image URL must be less than 1000 characters"
        }

        setErrors(newErr)

        if (Object.values(newErr).length > 0) {
            newErr = {}
            return
        }

        const editStory = {
            id: story.id,
            user_id: userID,
            title,
            body,
            image_url: image
        }

        dispatch(editStoryThunk(editStory))
        // console.log(editStory)

        setBody(story.body)
        setTitle(story.title)
        setImage(story.image_url)
        setShowEditStoryModal(false)
        return
    })


    return (
        <>

            <form className='EditStoryForm_form' onSubmit={handleSubmit}>
                <div className='EditStoryForm_formHeaderWrap'>
                    <h1 className='EditStoryForm_formTitle'> Edit your story</h1>
                    <div onClick={() => setShowEditStoryModal(false)} className='EditStoryForm_close'>X</div>
                </div>
                <div className='EditStoryForm_formSubTitle'> Change your story below! </div>
                <div className='EditStoryForm_formInputWrap'>
                    <div className='EditStoryForm_formInputLabel'>Title</div>
                    <input
                        className='EditStoryForm_formInput'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                    ></input>
                    {errors?.title && <div className='EditStoryForm_error'>{errors.title}</div>}
                </div>
                <div className='EditStoryForm_formInputWrapTextArea'>
                    <div className='EditStoryForm_bodyTop'>
                        <div className='EditStoryForm_formInputLabel'>Body</div>
                        <div className='EditStoryForm_charCount'>{body.length}/50000</div>
                    </div>
                    <textarea
                        className='EditStoryForm_formInputTextArea'
                        type='text'
                        placeholder='Paste your story here!'
                        value={body}
                        maxLength={50000}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    {errors?.body && <div className='EditStoryForm_error'>{errors.body}</div>}
                </div>
                <div className='EditStoryForm_formInputWrap'>
                    <div className='EditStoryForm_formInputLabel'>Image </div>
                    <input
                        className='EditStoryForm_formInput'
                        type='text'
                        placeholder='Image '
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></input>
                    {errors?.image && <div className='EditStoryForm_error'>{errors.image}</div>}
                </div>
                <div className='EditStoryForm_formInputWrapButton'>
                    <button className='EditStoryForm_formSubmit' type='submit'> Save</button>
                </div>
            </form>
        </>
    )
}

export default EditStoryForm;
