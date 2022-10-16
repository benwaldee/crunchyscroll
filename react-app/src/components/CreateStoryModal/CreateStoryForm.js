import './CreateStoryForm.css'
import './LIGHTCreateStoryForm.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createStoryThunk } from '../../store/stories'
import { useDropContext } from '../../context/Dropdown';

const CreateStoryForm = ({ setshowAddStoryModal }) => {

    const { dark } = useDropContext()
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
            // setBody('')
            newErr.body = 'Body must be at least 100 characters'
        }


        if (!image.endsWith('.png') && !image.endsWith('.webp') && !image.endsWith('.jpg') && !image.endsWith('.jpeg') && !image.endsWith('.svg')) {
            setImage('')
            newErr.image = 'Image must end with jpg/png/webp/jpeg/svg'

        }

        if (!image.startsWith('http://') && !image.startsWith('https://')) {
            setImage('')
            newErr.image = 'URL must start with http:// or https://'
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

            <form className={dark ? 'CreateStoryForm_form' : 'LIGHTCreateStoryForm_form'} onSubmit={handleSubmit}>
                <div className={dark ? 'CreateStoryForm_formHeaderWrap' : 'LIGHTCreateStoryForm_formHeaderWrap'}>
                    <h1 className={dark ? 'CreateStoryForm_formTitle' : 'LIGHTCreateStoryForm_formTitle'}> Add a story</h1>
                    <div onClick={() => setshowAddStoryModal(false)} className={dark ? 'CreateStoryForm_close' : 'LIGHTCreateStoryForm_close'}>X</div>
                </div>
                <div className={dark ? 'CreateStoryForm_formSubTitle' : 'LIGHTCreateStoryForm_formSubTitle'}> Provide your story title and text below! </div>
                <div className={dark ? 'CreateStoryForm_formInputWrap' : 'LIGHTCreateStoryForm_formInputWrap'}>
                    <div className={dark ? 'CreateStoryForm_formInputLabel' : 'LIGHTCreateStoryForm_formInputLabel'}>Title</div>
                    <input
                        className={dark ? 'CreateStoryForm_formInput' : 'LIGHTCreateStoryForm_formInput'}
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                    ></input>
                    {errors?.title && <div className={dark ? 'CreateStoryForm_error' : 'LIGHTCreateStoryForm_error'}>{errors.title}</div>}
                </div>
                <div className={dark ? 'CreateStoryForm_formInputWrapTextArea' : 'LIGHTCreateStoryForm_formInputWrapTextArea'}>
                    <div className={dark ? 'CreateStoryForm_bodyTop' : 'LIGHTCreateStoryForm_bodyTop'}>
                        <div className={dark ? 'CreateStoryForm_formInputLabel' : 'LIGHTCreateStoryForm_formInputLabel'}>Body</div>
                        <div className={dark ? 'CreateStoryForm_charCount' : 'LIGHTCreateStoryForm_charCount'}>{body.length}/50000</div>
                    </div>
                    <textarea
                        className={dark ? 'CreateStoryForm_formInputTextArea' : 'LIGHTCreateStoryForm_formInputTextArea'}
                        type='text'
                        placeholder='Paste your story here!'
                        value={body}
                        maxLength={50000}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    {errors?.body && <div className={dark ? 'CreateStoryForm_error' : 'LIGHTCreateStoryForm_error'}>{errors.body}</div>}
                </div>
                <div className={dark ? 'CreateStoryForm_formInputWrap' : 'LIGHTCreateStoryForm_formInputWrap'}>
                    <div className={dark ? 'CreateStoryForm_formInputLabel' : 'LIGHTCreateStoryForm_formInputLabel'}>Image </div>
                    <input
                        className={dark ? 'CreateStoryForm_formInput' : 'LIGHTCreateStoryForm_formInput'}
                        type='text'
                        placeholder='Image '
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></input>
                    {errors?.image && <div className={dark ? 'CreateStoryForm_error' : 'LIGHTCreateStoryForm_error'}>{errors.image}</div>}
                </div>
                <div className={dark ? 'CreateStoryForm_formInputWrapButton' : 'LIGHTCreateStoryForm_formInputWrapButton'}>
                    <button className={dark ? 'CreateStoryForm_formSubmit' : 'LIGHTCreateStoryForm_formSubmit'} type='submit'> Add Story</button>
                </div>
            </form>
        </>
    )
}

export default CreateStoryForm;
