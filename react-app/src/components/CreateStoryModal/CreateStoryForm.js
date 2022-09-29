import './CreateStoryForm.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createStoryThunk } from '../../store/stories'

const CreateStoryForm = ({ setshowAddStoryModal }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userID = useSelector(state => state.session.user).id
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
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

        const newStory = {
            user_id: userID,
            title,
            body,
            image_url: image
        }

        dispatch(createStoryThunk(newStory))

        setBody("")
        setTitle("")
        setImage("")
        setshowAddStoryModal(false)
        return
    })


    return (
        <>

            <form className='CreateStoryForm_form' onSubmit={handleSubmit}>
                <div className='CreateStoryForm_formHeaderWrap'>
                    <h1 className='CreateStoryForm_formTitle'> Add a story</h1>
                    <div onClick={() => setshowAddStoryModal(false)} className='CreateStoryForm_close'>X</div>
                </div>
                <div className='CreateStoryForm_formSubTitle'> Provide your story title and text below! </div>
                <div className='CreateStoryForm_formInputWrap'>
                    <div className='CreateStoryForm_formInputLabel'>Title</div>
                    <input
                        className='CreateStoryForm_formInput'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                    ></input>
                    {errors?.title && <div className='CreateStoryForm_error'>{errors.title}</div>}
                </div>
                <div className='CreateStoryForm_formInputWrapTextArea'>
                    <div className='CreateStoryForm_bodyTop'>
                        <div className='CreateStoryForm_formInputLabel'>Body</div>
                        <div className='CreateStoryForm_charCount'>{body.length}/50000</div>
                    </div>
                    <textarea
                        className='CreateStoryForm_formInputTextArea'
                        type='text'
                        placeholder='Paste your story here!'
                        value={body}
                        maxLength={50000}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    {errors?.body && <div className='CreateStoryForm_error'>{errors.body}</div>}
                </div>
                <div className='CreateStoryForm_formInputWrap'>
                    <div className='CreateStoryForm_formInputLabel'>Image </div>
                    <input
                        className='CreateStoryForm_formInput'
                        type='text'
                        placeholder='Image '
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></input>
                    {errors?.image && <div className='CreateStoryForm_error'>{errors.image}</div>}
                </div>
                <div className='CreateStoryForm_formInputWrapButton'>
                    <button className='CreateStoryForm_formSubmit' type='submit'> Add Story</button>
                </div>
            </form>
        </>
    )
}

export default CreateStoryForm;
