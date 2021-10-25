import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
// @material-ui/icons
// core components
import { useStyles } from './style';
import { useHistory } from 'react-router-dom';


export default function CardHeader(props: any) {
    const classes: any = useStyles();
    const history = useHistory();
    const { className, children, color, plain, stats, icon, ...rest } = props;
    const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [classes[color + 'CardHeader']]: color,
        [classes.cardHeaderPlain]: plain,
        [classes.cardHeaderStats]: stats,
        [classes.cardHeaderIcon]: icon,
        [className]: className !== undefined,
    });

    const handleClick = (e: any) => {
        const key = e.currentTarget.getAttribute('data-id');
        history.push(`/${key}`);
    }

    return (
        <div className={cardHeaderClasses} {...rest} onClick={handleClick}>
            {children}
        </div>
    );
}

CardHeader.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['warning', 'success', 'danger', 'info', 'primary', 'rose']),
    plain: PropTypes.bool,
    stats: PropTypes.bool,
    icon: PropTypes.bool,
    children: PropTypes.node,
};
