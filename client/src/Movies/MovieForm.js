import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const MovieForm = props => {
    const [item, setItem] = useState(initialItem);

    useEffect(() => {
        const id = props.match.params.id;
        if (id) {
            axios
                .get(`http://localhost:5000/api/mmovies/${id}`)
                .then(res => {
                    setItem(res.data)
                })
                .catch(err => console.log(err.res)); 
        }
    }, [props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;

        setItem({
            ...item,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:5000/api/${item.id}`, item)
            .then(res => {
                // res.data ==> full array with updated item
                // usually APIs return just the updated item, or just the id of the update item - you need to make a new array with all the old items, and replace the updated item with the updated item
                // const newItemsArr = props.items.map
                console.log(res.data);
                props.setUpdate(!props.update);
                setItem(initialItem);
                props.history.push('/');
            })
            .catch(err => console.log(err.res));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={item.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={item.director}
                />

                <input
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="metascore"
                    value={item.metascore}
                />

                <input
                    type="test"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={item.stars}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update Movie</button>
            </form>
        </div>
    );
};

export default MovieForm;