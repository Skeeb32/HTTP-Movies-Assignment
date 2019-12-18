import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    shipping: ''
};

const UpdateForm = props => {
    const [item, setItem] = useState(initialItem);
    useEffect(() => {
        const itemToEdit = props.items.find(
            e => `${e.id}` === props.match.params.id
        );
        console.log(props.items, itemToEdit);
        if (itemToEdit) {
            setItem(itemToEdit);
        }
    }, [props.items, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'price') {
            value = parseInt(value, 10);
        }

        setItem({
            ...item,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:3333/items/${item.id}`, item)
            .then(res => {
                // res.data ==> full array with updated item
                // usually APIs return just the updated item, or just the id of the update item - you need to make a new array with all the old items, and replace the updated item with the updated item
                // const newItemsArr = props.items.map
                props.updateItems(res.data);
                props.history.push(`/item-list/${item.id}`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    placeholder="name"
                    value={item.name}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="price"
                    onChange={changeHandler}
                    placeholder="Price"
                    value={item.price}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="imageUrl"
                    onChange={changeHandler}
                    placeholder="Image"
                    value={item.imageUrl}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="description"
                    onChange={changeHandler}
                    placeholder="Description"
                    value={item.description}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="shipping"
                    onChange={changeHandler}
                    placeholder="Shipping"
                    value={item.shipping}
                />
                <div className="baseline" />

                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;