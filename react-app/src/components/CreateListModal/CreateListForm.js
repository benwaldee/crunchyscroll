import './CreateListForm.css'
import './LIGHTCreateListForm.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createListThunk } from '../../store/lists'
import { useDropContext } from '../../context/Dropdown';

const CreateListForm = ({ setShowAddListForm }) => {
    const { dark } = useDropContext()
    const history = useHistory()
    const dispatch = useDispatch()
    const userID = useSelector(state => state.session.user)?.id
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

        // console.log(newList)

        dispatch(createListThunk(newList))

        setName("")
        setError("")
        setShowAddListForm(false)
        return
    })


    return (
        <>

            <form className={dark ? 'CreateListForm_form' : 'LIGHTCreateListForm_form'} onSubmit={handleSubmit}>
                <div className={dark ? 'CreateListForm_formHeaderWrap' : 'LIGHTCreateListForm_formHeaderWrap'}>
                    <h1 className={dark ? 'CreateListForm_formTitle' : 'LIGHTCreateListForm_formTitle'}> Add a list</h1>
                    <div onClick={() => setShowAddListForm(false)} className={dark ? 'CreateListForm_close' : 'LIGHTCreateListForm_close'}>X</div>
                </div>
                <div className={dark ? 'CreateListForm_formSubTitle' : 'LIGHTCreateListForm_formSubTitle'}> Provide your list name below! </div>
                <div className={dark ? 'CreateListForm_formInputWrap' : 'LIGHTCreateListForm_formInputWrap'}>

                    {error && <div className={dark ? 'CreateListForm_error' : 'LIGHTCreateListForm_error'}>{error}</div>}
                    <input
                        className={dark ? 'CreateListForm_formInput' : 'LIGHTCreateListForm_formInput'}
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        maxLength={50}
                    ></input>
                    <div className={dark ? 'CreateListForm_charCount' : 'LIGHTCreateListForm_charCount'}>{name.length}/50</div>
                    <div className={dark ? 'CreateListForm_formInputWrapButton' : 'LIGHTCreateListForm_formInputWrapButton'}>
                        <button className={dark ? 'CreateListForm_formSubmit' : 'LIGHTCreateListForm_formSubmit'} type='submit'> Create List</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateListForm;
