import './EditListForm.css'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { editListThunk } from '../../store/lists'
import { useDropContext } from '../../context/Dropdown';


const EditListForm = ({ setShowEditListModal, showEditListModal }) => {
    const { dark } = useDropContext()
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

            <form className={dark ? 'EditListForm_form' : 'LIGHTEditListForm_form'} onSubmit={handleSubmit}>
                <div className={dark ? 'EditListForm_formHeaderWrap' : 'LIGHTEditListForm_formHeaderWrap'}>
                    <h1 className={dark ? 'EditListForm_formTitle' : 'LIGHTEditListForm_formTitle'}> Edit your Crunchylist</h1>
                    <div onClick={() => setShowEditListModal(false)} className={dark ? 'EditListForm_close' : 'LIGHTEditListForm_close'}>X</div>
                </div>
                <div className={dark ? 'EditListForm_formSubTitle' : 'LIGHTEditListForm_formSubTitle'}> Change your list name below! </div>
                <div className={dark ? 'EditListForm_formInputWrap' : 'LIGHTEditListForm_formInputWrap'}>

                    {error && <div className={dark ? 'EditListForm_error' : 'LIGHTEditListForm_error'}>{error}</div>}
                    <input
                        className={dark ? 'EditListForm_formInput' : 'LIGHTEditListForm_formInput'}
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                        maxLength={50}
                    ></input>
                    <div className={dark ? 'EditListForm_charCount' : 'LIGHTEditListForm_charCount'}>{name.length}/50</div>
                    <div className={dark ? 'EditListForm_formInputWrapButton' : 'LIGHTEditListForm_formInputWrapButton'}>
                        <button className={dark ? 'EditListForm_formSubmit' : 'LIGHTEditListForm_formSubmit'} type='submit'> Save</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditListForm;
