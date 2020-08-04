import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    const transfIngredients = [];
    for (let ingredientName in props.ingredients) {
        transfIngredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = transfIngredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border:'1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name}({ig.amount})
             </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} </strong></p>
        </div>
    )
}
export default order