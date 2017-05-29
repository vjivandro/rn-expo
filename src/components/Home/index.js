import React, { Component } from 'react';
import { 
    View, 
    Text,
    ListView,
    StyleSheet
} from 'react-native';
import { Constants } from 'expo';
import TambahTodo from './components/TambahTodo';
import DaftarTodo from './components/DaftarTodo';
import uuid from 'uuid';

class Home extends Component {
    constructor(props){
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.dataNe = [
                {
                    id: uuid.v4(),
                    text: 'Data 1',
                    isEditing: false
                },
                {
                    id: uuid.v4(),
                    text: 'Data 2',
                    isEditing: false
                }
            ];

        this.state = {
            inputanValue: 'Masukkan Text',
            dataSource: ds.cloneWithRows(this.dataNe),
        };

        this.ubahInputanValue = this.ubahInputanValue.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.hapusTodo = this.hapusTodo.bind(this);
        this.toEdit = this.toEdit.bind(this);
        this.ubahTodo = this.ubahTodo.bind(this);
    }

    ubahInputanValue(text){
        this.setState({ inputanValue: text });
    }

    addTodo(){
        // alert('yuhuuu');
        this.dataNe.push({
            id: uuid.v4(),
            text: this.state.inputanValue,
            isEditing: false
        });

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({ dataSource: ds.cloneWithRows(this.dataNe) });
    }

    hapusTodo(id){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.dataNe = this.dataNe.filter((todo, index, items) => {
            return todo.id !== id;
        });
        this.setState({ dataSource: ds.cloneWithRows(this.dataNe) });
        //alert(id);

        this.setTodo();
    }

    setTodo(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({ dataSource: ds.cloneWithRows(this.dataNe) });
    }

    toEdit(id){
      this.dataNe = this.dataNe.map(todo => {
          if(todo.id!== id) return todo;
          todo.isEditing = true;
          return todo;
      });

      this.setTodo();
  }

  //method ubahTodo
  ubahTodo(id, text){
    //alert(text);
    this.dataNe = this.dataNe.map(todo => {
        if(todo.id !== id) return todo;
        todo.isEditing = false;
        todo.text = text;
        return todo;
    });
    
    this.setTodo();
  }

    render(){
        return(
            <View style = {styles.container}>
                <Text style = {styles.dashboard}> 
                    DashBoard 
                </Text>
                <TambahTodo 
                    onSubmitEditing={this.addTodo}
                    ubahInputanValue = { this.ubahInputanValue }
                    inputanValue = {this.state.inputanValue}
                />
                <DaftarTodo 
                    ubahTodo = {this.ubahTodo}
                    toEdit = {this.toEdit}
                    hapusTodo = {this.hapusTodo}
                    dataSource = {this.state.dataSource}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    dashboard: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    }
});

export default Home;