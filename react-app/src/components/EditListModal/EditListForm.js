import './EditListForm.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editListThunk } from '../../store/lists'


const EditListForm = ({ setShowEditListModal, showEditListModal }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userID = useSelector(state => state.session.user).id
    const [name, setName] = useState(showEditListModal.name)

    const [error, setError] = useState('')

    const handleSubmit = (e => {
        e.preventDefault()

        if (name.length < 1) {
            setName('')
            setError('Please provide a name.')
            return
        }


        const editList = {
            user_id: userID,
            name,
            watchlist: false,
        }

        console.log(editList)

        dispatch(editListThunk(editList, showEditListModal.id))

        setName("")
        setError("")
        setShowEditListModal(false)
        return
    })


    return (
        <>

            <form className='EditListForm_form' onSubmit={handleSubmit}>
                <div className='EditListForm_formHeaderWrap'>
                    <h1 className='EditListForm_formTitle'> Edit your Crunchylist</h1>
                    <div onClick={() => setShowEditListModal(false)} className='EditListForm_close'>X</div>
                </div>
                <div className='EditListForm_formSubTitle'> Change your list name below! </div>
                <div className='EditListForm_formInputWrap'>

                    {error && <div className='EditListForm_error'>{error}</div>}
                    <input
                        className='EditListForm_formInput'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        maxLength={50}
                    ></input>
                    <div className='EditListForm_charCount'>{name.length}/50</div>
                    <div className='EditListForm_formInputWrapButton'>
                        <button className='EditListForm_formSubmit' type='submit'> Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditListForm;
