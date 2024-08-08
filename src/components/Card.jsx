import React from 'react'
import styles from '../styles/Card.module.css'
const Card = ({ heading, inputLabel, state, setState ,onClickFunction}) => {
    return (
        <div className={styles.card}>
            <div className={styles.innerCard}>
                <h3>{heading}</h3>

                <div className={styles.input_div}>
                    <p>{inputLabel}</p>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>

                <button onClick={onClickFunction}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default Card
