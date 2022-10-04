import './CreateListForm.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createListThunk } from '../../store/lists'

const CreateListForm = ({ setShowAddListForm }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userID = useSelector(state => state.session.user).id
    const [name, setName] = useState('')

    const [error, setError] = useState('')

    const handleSubmit = (e => {
        e.preventDefault()

        if (name.length < 1) {
            setName('')
            setError('Please provide a name.')
            return
        }


        const newList = {
            user_id: userID,
            name,
            watchlist: false,
        }

        console.log(newList)

        dispatch(createListThunk(newList))

        setName("")
        setError("")
        setShowAddListForm(false)
        return
    })


    return (
        <>

            <form className='CreateListForm_form' onSubmit={handleSubmit}>
                <div className='CreateListForm_formHeaderWrap'>
                    <h1 className='CreateListForm_formTitle'> Add a list</h1>
                    <div onClick={() => setShowAddListForm(false)} className='CreateListForm_close'>X</div>
                </div>
                <div className='CreateListForm_formSubTitle'> Provide your list name below! </div>
                <div className='CreateListForm_formInputWrap'>

                    {error && <div className='CreateListForm_error'>{error}</div>}
                    <input
                        className='CreateListForm_formInput'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        maxLength={50}
                    ></input>
                    <div className='CreateListForm_charCount'>{name.length}/50</div>
                    <div className='CreateListForm_formInputWrapButton'>
                        <button className='CreateListForm_formSubmit' type='submit'> Create List</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateListForm;
