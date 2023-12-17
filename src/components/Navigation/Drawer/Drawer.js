import React, { Component } from "react";
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";


const links = [
    { to: '/', lable: 'List', exact: true },
    { to: '/auth', lable: 'Authorization', exact: false },
    { to: '/quiz-creator', lable: 'Create Test', exact: false }
]

class Drawer extends Component {

    handleClick = () => {
        this.props.onClose()
    }

    renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.handleClick}
                    >
                        {link.lable}
                    </NavLink>
                </li>
            )
        })
    }


    render() {
        const cls = [classes.Drawer]

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        return (
            <>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}

                <nav>
                    <ul className={cls.join(' ')}>
                        {this.renderLinks()}
                    </ul>
                </nav>
            </>
        )
    }
}

export default Drawer;