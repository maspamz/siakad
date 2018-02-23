import React from 'react';
import { View, Image, Dimensions } from 'react-native';

import PropTypes from 'prop-types';
import FlatList from './FlatListComp';

const { height } = Dimensions.get('window');
const heightTab = height / 5;
const heightLoading = height - (25 + heightTab + 50 + 72);

export default class TabContent extends React.Component {
  static propTypes = {
    marker: PropTypes.string.isRequired,
    listSchedule: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    user: PropTypes.any.isRequired,
  }

  state = {
    schedule: [],
  }

  componentWillMount() {
    const { listSchedule, marker, user } = this.props;

    const schedule = listSchedule.filter((item) => {
      if (item.hari == marker && item.semester == user.semester) return item;
    });
    this.setState({ schedule });
  }

  render() {
    const { schedule } = this.state;

    return (
      <View>
        {this.props.fetching ?
          <View style={{ justifyContent: 'center', alignItems: 'center', height: heightLoading }}>
            <Image source={require('../../images/loading.gif')} style={{ height: 30, width: 30 }} />
          </View> :
          <FlatList list={schedule} />
        }
      </View >
    );
  }
}
