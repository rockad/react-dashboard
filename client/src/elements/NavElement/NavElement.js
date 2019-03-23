import React from 'react';
import {Link as RouterLink, NavLink as RouterNavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';

function isAbsoluteUrl(url) {
    return /^https?:\/\//.test(url);
}

const NavElement = (
    {
        children,
        className,
        to,
        activeClassName,
        nav,
        variant,
        linkVariant,
        ...rest
    },
) => {
    const props = rest;

    if (nav) {
        props.activeClassName = activeClassName || 'active';
    }

    const componentProps = {
        className,
        to,
        ...props,
        component: nav ? RouterNavLink : RouterLink,
    };

    if (variant === 'link' || isAbsoluteUrl(to)) {
        return (
            <Link
                {...componentProps}
                variant={linkVariant}
            >
                {children}
            </Link>
        );
    }

    if (variant === 'list') {
        return (
            <ListItem
                button
                {...componentProps}
            >
                {children}
            </ListItem>
        );
    }

    const buttonProps = {
        ...componentProps,
        variant,
        disableFocusRipple: variant === 'text',
        disableRipple: variant === 'text',
    };

    return (
        <Button
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

NavElement.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    nav: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['text', 'outlined', 'contained', 'fab', 'extendedFab', 'link', 'list']),
    linkVariant: PropTypes.string,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
};

NavElement.defaultProps = {
    nav: false,
    variant: 'text',
};

export default NavElement;
