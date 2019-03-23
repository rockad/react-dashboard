import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';

import Chat from '@material-ui/icons/Chat';

import {loadList} from '../store/actions/channels/channels';

import NavElement from '../elements/NavElement';

function MainListItems({isLoading, list, load}) {
  React.useEffect(function () {
    load();
  }, [true]);

  if (isLoading) {
    return (<LinearProgress />);
  }

  if (list.length > 0) {
    return list.map(({name, count}) => (
      <NavElement to={`/channel/${name}`} variant="list" nav key={name}>
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText primary={`${name}`.toUpperCase()} />
      </NavElement>),
    );
  }

  return null;
}

MainListItems.propTypes = {
  isLoading: PropTypes.bool,
  list: PropTypes.array,
  load: PropTypes.func.isRequired,
};

function mapStateToProps({channels}) {
  return {
    isLoading: channels.isLoading,
    list: channels.list,
  };
}

const mapDispatchToProps = {
  load: loadList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainListItems);
