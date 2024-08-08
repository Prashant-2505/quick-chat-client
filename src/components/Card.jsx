import React from 'react'
import styles from '../styles/Card.module.css'
import { motion } from 'framer-motion'
const Card = ({ heading, inputLabel, state, setState, onClickFunction }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}

            className={styles.card}>
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

                <motion.button
                    initial={{y:0}}
                    whileHover={{y: -5 }}
                    transition={{ duration: 0.1 }}
        
                    onClick={onClickFunction}>
                    Submit
                </motion.button>
            </div>
        </motion.div>
    )
}

export default Card
