import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  SectionList,
  Image,
  ListView,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class ListWithOther extends Component {
    // 构造
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      index: 1,
      dataAry: [],
      dataAryOne: [],
      dataSource: ds.cloneWithRows(["row 1", "row 2"]),
    };
  }

  componentDidMount=() => {
    const dataAry = [];
    const dataAryOne = [];
    const dataAryTwo = [];
    // 初始状态
    for (let i = 0; i < 100; i++) {
      const obj = {};
      obj.key = i;
      dataAry.push(obj);
    }
    // 初始状态
    for (let i = 0; i < 50; i++) {
      const obj = {};
      obj.key = i;
      dataAryOne.push(obj);
    }
    // 初始状态
    for (let i = 0; i < 100; i++) {
      const obj = {};
      obj.key = i;
      dataAryTwo.push(obj);
    }
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      index: 1,
      dataAry: dataAry,
      dataAryOne: dataAryOne,
      dataSource: ds.cloneWithRows(dataAryTwo),
    });
  }

  onClickOne=() => {
    this.setState({
      index: 1,
    });
  }

  onClickTwo=() => {
    this.setState({
      index: 2,
    });
  }

  onClickThree=() => {
    this.setState({
      index: 3,
    });
  }

  renderRow=(item) => {
    return (
      <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 5, borderWidth: 1, marginRight: 5, borderColor: "#DEDEDE", backgroundColor: "white" }}>
        <View style={{ flexDirection: "column", justifyContent: "space-around", marginLeft: 5 }}>
          <Text style={{ fontSize: 16 }}>歌名: 彩虹彼岸</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 14, color: "#BDBDBD" }}>歌手:虚拟歌姬</Text>
            <Text style={{ fontSize: 14, color: "#BDBDBD", marginLeft: 10 }}>专辑:react native</Text>
          </View>
        </View>
      </View>
    );
  }

  renderRowOne=(item) => {
    return (
      <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 5, borderWidth: 1, marginRight: 5, borderColor: "#DEDEDE", backgroundColor: "white" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 14, color: "#BDBDBD" }}>歌手:虚拟歌姬</Text>
          <Text style={{ fontSize: 14, color: "#BDBDBD", marginLeft: 10 }}>专辑:react native</Text>
        </View>
      </View>
    );
  }

  renderRowTwo=(rowData) => {
    return (
      <View>
        <Text>你的名字</Text>
      </View>
    );
  }

  bottomViewRender=() => {
    if (this.state.index === 1) {
      return (
        <FlatList
          data={this.state.dataAry}
          renderItem={item => this.renderRow(item)}
        />
      );
    } else if (this.state.index === 2) {
      return (
        <FlatList
          data={this.state.dataAryOne}
          renderItem={item => this.renderRowOne(item)}
        />
      );
    } else {
       // 这里横向只能使用ListView或者SctionList.FLatList设置横向属性报错
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRowTwo}
          // contentContainerStyle={styles.listViewStyle}
        />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "cyan", height: 69, justifyContent: "center", alignItems: "center" }}>
          <Text>导航条</Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          stickyHeaderIndices={[1]}
        >
          <Image source={require("./../../image/kebi.jpg")} style={{ width: width, height: 200 }} />
          <View style={{ backgroundColor: "yellow" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
              <Text onPress={() => { this.onClickOne() }} style={{ color: this.state.index === 1 ? "red" : "cyan" }}>11111</Text>
              <Text onPress={() => { this.onClickTwo() }} style={{ color: this.state.index === 2 ? "red" : "cyan" }}>22222</Text>
              <Text onPress={() => { this.onClickThree() }} style={{ color: this.state.index === 3 ? "red" : "cyan" }}>33333</Text>
            </View>
          </View>
          {this.bottomViewRender()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  listViewStyle: {
    // 改变主轴方向
    flexDirection: "row",
    // 多行显示
    flexWrap: "wrap",
  },
});
