import React, { useState } from 'react'
import axios from 'axios';
import './App.scss';

//Creating function to check if text is empty or space
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

//Creating function for search form
const SearchForm = ({ searchText }) => {

    //Creating states for searched text and error message
    const [text, setText] = useState('')
    const [errorText, setErrorText] = useState('')

    //When input text submited
    const handleSubmit = (e) => {

        //Preventing page refresh
        e.preventDefault()

        //Checking if search input value is not empty or space
        if (isEmptyOrSpaces(text)) {
            setErrorText("Please enter search keyword");

            //Checking if searched text is alphanumeric + space
        } else if (/[^0-9a-zA-Z ]/.test(text)) {
            setErrorText('Please enter letters and numbers only')

            //Checking if searched text is less than 40 symbols
        } else if (text.length > 40) {
            setErrorText('Please enter text up to 40 characters')

            //If input text is correct
        } else {

            //Setting error state value to empty
            setErrorText('')

            //Saving search keyword
            const databaseSearchData = {
                keyword: text
            }

            //Sending keyword to database
            axios.post('http://localhost:8000/articles/search', databaseSearchData)
                .then(response => console.log(response.data))

            //Adding searched textAPI parameter for 9 articles
            searchText(text + "&max=9")

            //Setting search input state value to empty
            setText('')
        }

    }

    return (
        <div className="search-container">
            <span className="error">{errorText}</span><br></br>
            <div className="search-form">
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="search-input" placeholder="Search news" aria-label="Search news" aria-describedby="basic-addon2" onChange={(e) => setText(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchForm
