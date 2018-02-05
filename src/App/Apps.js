
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { downloadApp, runApp, runDefaultApp } from './actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  }
});

class Apps extends Component {

  downloadApp = (name, host) => () => {
    this.props.downloadApp(name, `http://${host}/${name}.js`);
  };

  render() {
    const { apps } = this.props;
    return (
      <View style={styles.container}>
        {
          apps.length > 0 
            ? apps.map(s => (
              <View key={s.name}>
                <Text h4>{s.title}</Text>
                <List>
                  {
                    s.apps.map(app => (
                      <ListItem 
                        key={app.name} 
                        title={app.title} 
                        subtitle={app.description}
                        onPress={this.downloadApp(app.name, s.host)}
                      />
                    ))
                  }
                </List>
              </View>
            ))
            : <ActivityIndicator size="large" />
        }
      </View>
    );
  }

}

export default connect(
  ({ apps }, props) => ({ apps, ...props }),
  (dispatch) => bindActionCreators({ downloadApp, runApp, runDefaultApp }, dispatch)
)(Apps);
